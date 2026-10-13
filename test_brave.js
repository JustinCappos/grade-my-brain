/**
 * Checks the scenario data, the session builder and player progress, then
 * plays two sessions in headless Brave:
 *   - the ID/consent screen (the greyed-out Continue still works),
 *   - the first session goes through every regular question once, with no
 *     feedback until each review (every 10 questions),
 *   - reviews give practice questions with instant feedback and append
 *     retests of missed topics, so the session grows with the misses,
 *   - the next session retests only the topics still answered wrong,
 *   - a reload resumes the session, and Switch ID returns to the ID screen.
 * Also checks that the audit only lists real vulnerabilities and strengths.
 *
 * Run with: npm test
 */

import assert from 'assert/strict';
import puppeteer from 'puppeteer-core';
import { domainToASCII } from 'url';
import { createStaticServer } from './serve.js';
import {
    MASTER_SCENARIOS, STANDALONE_SCENARIOS, PAIRED_TESTS, BIAS_CATEGORIES,
    MIN_PAIR_GAP, REVIEW_BLOCK, SHORT_SESSION_MAX, ScenarioBank
} from './js/scenarioBank.js';
import { BiasAnalyzer } from './js/biasAnalyzer.js';
import { Progress, normalizeId, displayId, newGuestId, isGuestId } from './js/progress.js';

const PORT = 8088;
const BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const CHECKPOINT_EVERY = REVIEW_BLOCK;

const MAIN_POOL = MASTER_SCENARIOS.filter(s => !s.practiceOnly && !s.retestOnly && !s.filler && !s.retired);
const isFiller = id => Boolean(ScenarioBank.getScenario(id).filler);
const scenariosByTitle = new Map(MASTER_SCENARIOS.map(s => [s.title, s]));

function memoryStorage() {
    const data = {};
    return {
        getItem: k => (k in data ? data[k] : null),
        setItem: (k, v) => { data[k] = String(v); },
        removeItem: k => { delete data[k]; }
    };
}

// ---------- Data and logic checks (no browser) ----------

// Every scenario is well formed and every pair's scoring rule works
function checkScenarioData() {
    const ids = MASTER_SCENARIOS.map(s => s.id);
    assert.equal(new Set(ids).size, ids.length, 'Duplicate scenario ids');
    const titles = MASTER_SCENARIOS.map(s => s.title);
    assert.equal(new Set(titles).size, titles.length, 'Duplicate scenario titles');

    for (const s of MASTER_SCENARIOS) {
        assert.ok(BIAS_CATEGORIES[s.biasType], `Unknown bias type on ${s.id}`);
        assert.ok(s.scenarioText && s.options.length >= 2, `Incomplete scenario ${s.id}`);
    }
    for (const s of STANDALONE_SCENARIOS) {
        assert.ok(s.options.some(o => o.isBest), `${s.id} needs at least one best option`);
        assert.ok(s.options.some(o => !o.isBest), `${s.id} needs at least one wrong option`);
        assert.ok(s.bestAnswer && s.reasoning && s.biasName && s.bookRef, `${s.id} is missing explanation fields`);
    }
    for (const [pairId, pair] of Object.entries(PAIRED_TESTS)) {
        assert.equal(pair.versions.length, 2, `Pair ${pairId} needs two versions`);
        const [a, b] = pair.versions;
        assert.ok(pair.isConsistent(a.options[0].value, b.options[0].value),
            `Pair ${pairId}: matching first answers should be consistent`);
        assert.ok(!pair.isConsistent(a.options.at(-1).value, b.options[0].value),
            `Pair ${pairId}: opposite answers should be inconsistent`);
    }
    for (const [type, c] of Object.entries(BIAS_CATEGORIES)) {
        assert.ok(c.tip, `${type} needs a "how to think differently" tip`);
        assert.ok(ScenarioBank.pickPracticeScenario(type), `${type} has no standalone question to practice on`);
        for (const ex of c.examples || []) {
            assert.ok(/^https:\/\//.test(ex.url) && ex.label, `${type} has a malformed example`);
            assert.ok(['deceptive', 'good', 'example'].includes(ex.kind), `${type} example has unknown kind`);
        }
    }
}

function checkQueue(queue, label) {
    const ids = queue.map(e => e.id);
    assert.equal(new Set(ids).size, ids.length, `${label}: a scenario repeated`);
    const positions = {};
    ids.forEach((id, idx) => {
        const s = ScenarioBank.getScenario(id);
        if (s.pair) (positions[s.pair] ||= []).push(idx);
    });
    for (const [pairId, [first, second]] of Object.entries(positions)) {
        assert.ok(second !== undefined, `${label}: pair ${pairId} was split up`);
        // Both halves sit in one full review block: slots 1 and 9, or 2 and 10
        const block = Math.floor(first / REVIEW_BLOCK);
        assert.ok(first % REVIEW_BLOCK < 2, `${label}: pair ${pairId} should open in a block's first two questions`);
        assert.equal(second - first, MIN_PAIR_GAP, `${label}: pair ${pairId} should close in the block's last two questions`);
        assert.ok((block + 1) * REVIEW_BLOCK <= ids.length, `${label}: pair ${pairId} is in a short block`);
    }
}

// A first session covers every regular question plus scattered straightforward
// ones; later sessions retest missed topics; every session fills whole review blocks
function checkSessionBuilder() {
    const mainIds = MAIN_POOL.map(s => s.id).sort();
    for (let i = 0; i < 200; i++) {
        const { queue, plannedLength } = ScenarioBank.buildSession();
        assert.equal(queue.length % REVIEW_BLOCK, 0, 'A session should be a whole number of review blocks');
        assert.deepEqual(queue.filter(e => !isFiller(e.id)).map(e => e.id).sort(), mainIds,
            'A first session should ask every regular question once');
        assert.ok(queue.every(e => !e.retest), 'A first session should start with no retests');
        const scattered = queue.slice(0, plannedLength).filter(e => isFiller(e.id)).length;
        assert.ok(scattered >= Math.ceil(MAIN_POOL.length / 10), 'Straightforward questions should be scattered through the session');
        checkQueue(queue, 'first session');
    }

    // The short version covers exactly the short-version questions
    for (let i = 0; i < 50; i++) {
        const { queue } = ScenarioBank.buildSession({ version: 'short' });
        assert.equal(queue.length % REVIEW_BLOCK, 0, 'A short session should be whole review blocks');
        assert.deepEqual(queue.filter(e => !isFiller(e.id)).map(e => e.id).sort(),
            ScenarioBank.mainQuestions('short').map(s => s.id).sort(), 'Short session should hold the short-version questions');
        checkQueue(queue, 'short session');
    }
    assert.equal(ScenarioBank.sessionLengthEstimate('short'), ScenarioBank.buildSession({ version: 'short' }).queue.length);

    // A few questions unseen: those come first, then one retest per missed topic, padded to a full block
    const unseen = new Set(['anchoring-1', 'ads-truncated-axis']);
    const seenIds = new Set(MAIN_POOL.map(s => s.id).filter(id => !unseen.has(id)));
    const retestTypes = ['BASE_RATE', 'SUNK_COST', 'HALO'];
    const { queue } = ScenarioBank.buildSession({ seenIds, retestTypes, missedIds: new Set(['baserate-1']) });
    assert.equal(queue.length % REVIEW_BLOCK, 0, 'A retest session should be padded to a full block');
    assert.deepEqual(queue.filter(e => !e.retest && !isFiller(e.id)).map(e => e.id).sort(), [...unseen].sort());
    const retests = queue.filter(e => e.retest).map(e => ScenarioBank.getScenario(e.id));
    assert.deepEqual(retests.map(s => s.biasType).sort(), [...retestTypes].sort(), 'One retest per missed topic');
    assert.ok(retests.every(s => !s.pair), 'Retests are standalone questions');
    assert.ok(!retests.some(s => s.id === 'baserate-1'), 'Retests should avoid the exact question missed');
    checkQueue(queue, 'retest session');

    // A homoglyph sender's revealed address must be the real punycode form of the one shown
    for (const mail of MASTER_SCENARIOS.flatMap(s => s.inbox || []).filter(m => m.realAddress)) {
        const [user, domain] = mail.address.split('@');
        assert.equal(mail.realAddress, `${user}@${domainToASCII(domain)}`, `Wrong real address for ${mail.address}`);
        assert.notEqual(domainToASCII(domain), domain, `${mail.address} should contain a lookalike character`);
    }

    // A missed phishing topic is retested with the backup inbox, which is never planned or used for practice
    const backup = ScenarioBank.pickRetestScenario('PHISHING', { askedIds: new Set(['se-phishing-inbox']), missedIds: new Set(['se-phishing-inbox']) });
    assert.equal(backup.id, 'se-phishing-inbox-home', 'A phishing retest should use the backup inbox first');
    assert.ok(!ScenarioBank.mainQuestions('full').some(s => s.retestOnly), 'Retest-only questions are never planned');
    for (let i = 0; i < 20; i++) {
        const p = ScenarioBank.pickPracticeScenario('PHISHING', {});
        assert.ok(!p || p.id !== 'se-phishing-inbox-home', 'The unseen backup inbox should not be used for practice');
    }

    // Everything seen and nothing missed: nothing left to play
    assert.equal(ScenarioBank.buildSession({ seenIds: new Set(MAIN_POOL.map(s => s.id)) }).queue.length, 0);

    // Padding is removed before more is added when the tail grows
    const fillerIds = STANDALONE_SCENARIOS.filter(s => s.filler).map(s => s.id);
    const tail = [
        ...['anchoring-1', 'anchoring-2', 'anchoring-3'].map(id => ({ id, retest: true, pad: false })),
        ...fillerIds.slice(0, 10).map(id => ({ id, retest: false, pad: true }))
    ];
    ScenarioBank.padTail(tail, { tailStart: 0 });
    assert.equal(tail.length, 10, 'Extra padding should be removed to reach a block boundary');
    assert.equal(tail.filter(e => e.retest).length, 3, 'Retests should never be removed');

    // Retests and practice never reuse a question already in the session
    const anchoring = STANDALONE_SCENARIOS.filter(s => s.biasType === 'ANCHORING').map(s => s.id);
    const taken = new Set(anchoring.slice(1));
    assert.equal(ScenarioBank.pickRetestScenario('ANCHORING', { excludeIds: taken }).id, anchoring[0]);
    assert.equal(ScenarioBank.pickRetestScenario('ANCHORING', { excludeIds: new Set(anchoring) }), null);
    const practice = ScenarioBank.pickPracticeScenario('ANCHORING', { excludeIds: taken });
    assert.ok(practice && !taken.has(practice.id));
}

// Retest topics follow each topic's most recent scored answer; practice doesn't count
function checkProgress() {
    const storage = memoryStorage();
    assert.equal(normalizeId('   '), '', 'A blank ID should stay blank');
    assert.equal(normalizeId('~guest-abc'), 'guest-abc', 'Typed IDs can never look like guest IDs');
    const guestA = newGuestId();
    assert.ok(isGuestId(guestA) && guestA !== newGuestId(), 'Each guest gets its own ID');
    assert.equal(displayId(guestA), 'Guest');
    assert.equal(displayId('nyu-4821'), 'NYU-4821');
    const p = new Progress('  Tester-1 ', storage);
    assert.equal(p.id, 'tester-1');
    p.recordResult({ scenarioId: 'a', biasType: 'ANCHORING', correct: false, kind: 'main' });
    p.recordResult({ scenarioId: 'b', biasType: 'BASE_RATE', correct: false, kind: 'main' });
    p.recordResult({ scenarioId: 'c', biasType: 'ANCHORING', correct: true, kind: 'retest' });
    p.recordResult({ scenarioId: 'd', biasType: 'HALO', correct: false, kind: 'practice' });
    p.recordResult({ scenarioId: 'e', biasType: 'FRAMING', correct: false, kind: 'main' });
    p.markSeen('a');
    p.save();

    const reloaded = new Progress('TESTER-1', storage);
    assert.deepEqual(reloaded.retestTypes(), ['FRAMING', 'BASE_RATE']);
    assert.deepEqual([...reloaded.missedIds()].sort(), ['a', 'b', 'e']);
    assert.ok(reloaded.seenIds.has('a'));
    assert.ok(Progress.exists('tester-1', storage));
    const finished = { queue: [{ id: 'a' }], shownScore: 120, reviewed: [{ scenarioId: 'a', correct: true }] };
    reloaded.archiveSession(finished);
    reloaded.archiveSession(finished);
    assert.equal(reloaded.pastSessions.length, 1, 'A session should only be archived once');
    reloaded.reset();
    const afterReset = new Progress('tester-1', storage);
    assert.equal(afterReset.data.results.length, 0);
    assert.equal(afterReset.pastSessions.length, 1, 'Starting over should keep past session results');
}

// The audit only lists real vulnerabilities and strengths
function checkAuditLists() {
    const logsWithBiasValue = value => MASTER_SCENARIOS
        .filter(s => !s.pair || s.id === PAIRED_TESTS[s.pair].versions[0].id)
        .map(s => ({ scenarioId: s.id, biasType: s.biasType, biasValue: value }));

    const perfect = BiasAnalyzer.analyzeSession(logsWithBiasValue(0));
    assert.equal(perfect.topVulnerabilities.length, 0, 'Perfect run should list no vulnerabilities');
    assert.equal(perfect.topStrengths.length, 2, 'Perfect run should list strengths');

    const worst = BiasAnalyzer.analyzeSession(logsWithBiasValue(1));
    assert.equal(worst.topStrengths.length, 0, 'Worst run should list no strengths');
    assert.equal(worst.topVulnerabilities.length, 2, 'Worst run should list vulnerabilities');

    const empty = BiasAnalyzer.analyzeSession([]);
    assert.equal(empty.topVulnerabilities.length + empty.topStrengths.length, 0,
        'Untested categories should not be listed');
}

// ---------- Browser checks ----------

const settle = () => new Promise(r => setTimeout(r, 400));
const text = (page, selector) => page.$eval(selector, el => el.textContent.trim());
const isHidden = (page, selector) => page.$eval(selector, el => el.hidden);

async function enterId(page, id, { checkConsent, fullVersion = false }) {
    assert.equal(await isHidden(page, '#intro-view'), false, 'ID screen should show first');
    await page.type('#id-code-input', id);
    const looksDisabled = () => page.$eval('#intro-continue-btn', el => el.classList.contains('looks-disabled'));
    assert.equal(await page.$eval('#privacy-consent', el => el.checked), false, 'The consent box should start unchecked');
    assert.ok(await looksDisabled(), 'Continue should look disabled until consent is checked');
    if (checkConsent) {
        await page.click('#privacy-consent');
        assert.ok(!(await looksDisabled()), 'Checking consent should make Continue look enabled');
    } else {
        // Without consent, Continue does nothing until the policy has been opened
        await page.click('#intro-continue-btn');
        await settle();
        assert.equal(await isHidden(page, '#intro-view'), false, 'Continue should not work before the policy is opened');
        await page.$eval('#privacy-link', el => {
            el.addEventListener('click', e => e.preventDefault(), { once: true });
            el.click();
        });
    }
    if (fullVersion) await page.click('#full-version-toggle');
    await page.click('#intro-continue-btn');
    await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
}

// Answers practice questions (first option) and checks they give feedback right away
async function doPractice(page) {
    let answered = 0;
    for (;;) {
        const card = await page.$('.practice-options [data-option-index]');
        if (!card) break;
        await card.click();
        answered++;
        await page.waitForFunction(n => document.querySelectorAll('.practice-feedback').length >= n, {}, answered);
    }
    return answered;
}

// Plays one full session picking the first option every time. Returns the
// queue the game used and the final score.
async function playSession(page, label) {
    const sessionState = () => page.evaluate(() => window.brainApp.session);
    const startingQueue = (await sessionState()).queue;
    const played = [];
    const missedTypes = new Set();
    const pairFirstRound = {};
    let expectedScore = 100;
    let shownScore = 100;
    let practiceAnswered = 0;
    let lastReviewed = 0;
    let tokensSettled = 0;
    let bonusClaimed = false;
    let lastMainPercent = 0;

    for (let round = 1; ; round++) {
        // Header shows the round of 10 and a dot per question answered in it
        const roundNumber = Math.floor((round - 1) / CHECKPOINT_EVERY) + 1;
        assert.equal(await text(page, '#current-round'), String(roundNumber), `${label}: round number`);
        const doneDots = await page.$$eval('#round-dots .round-dot.done', els => els.length);
        assert.equal(doneDots, (round - 1) % CHECKPOINT_EVERY, `${label}: round dots`);
        // Progress through the main questions never moves backwards, even as retests are added
        const mainPercent = Number(await page.$eval('#progress-track', el => el.getAttribute('aria-valuenow')));
        assert.ok(mainPercent >= lastMainPercent, `${label}: main progress went backwards`);
        lastMainPercent = mainPercent;
        assert.equal(Number(await text(page, '#current-score')), shownScore,
            `${label}: score must stay hidden until the review`);

        // The hidden bonus pop-up appears once per player; the test player falls for it
        if (!(await isHidden(page, '#bonus-popup'))) {
            assert.equal(round, 7, `${label}: the bonus pop-up should appear at question 7`);
            await page.click('#bonus-claim-btn');
            await page.waitForFunction(() => document.getElementById('bonus-popup').hidden);
            bonusClaimed = true;
        }

        const scenario = scenariosByTitle.get(await text(page, '#scenario-title'));
        assert.ok(scenario, `${label}: unknown scenario on round ${round}`);
        played.push(scenario.id);

        let correct;
        if (scenario.pair) {
            if (!(scenario.pair in pairFirstRound)) {
                pairFirstRound[scenario.pair] = round;
            } else {
                assert.equal(round - pairFirstRound[scenario.pair], MIN_PAIR_GAP, `${label}: pair spacing`);
                correct = true; // first options always answer a pair consistently
            }
        } else if (scenario.inbox) {
            correct = false; // the test keeps every email, phishing included
        } else {
            correct = scenario.options[0].isBest === true;
        }
        if (correct !== undefined) {
            expectedScore = Math.max(0, expectedScore + (correct ? 20 : 0));
            if (!correct) missedTypes.add(scenario.biasType);
        }

        if (scenario.inbox) {
            // Mark every email "Keep", then submit
            const keeps = await page.$$('#options-container .inbox-choice[data-inbox-choice="keep"]');
            assert.equal(keeps.length, scenario.inbox.length, `${label}: inbox should list every email`);
            for (const keep of keeps) await keep.click();
            await page.click('#inbox-submit');
        } else {
            // Choices are option cards, or the buttons of a mock screen; pick the first option
            const cards = await page.$$('#options-container [data-option-index]');
            assert.equal(cards.length, scenario.options.length, `${label}: wrong option count for ${scenario.id}`);
            await page.click('#options-container [data-option-index="0"]');
        }

        const total = (await sessionState()).queue.length;
        const atReview = round % CHECKPOINT_EVERY === 0 || round === total;
        if (!atReview) {
            await page.waitForFunction(p => window.brainApp.session.position === p && !document.getElementById('scenario-stage').hidden, {}, round);
            continue;
        }

        await page.waitForFunction(() => !document.getElementById('checkpoint-view').hidden);
        const eyebrow = await text(page, '.checkpoint-eyebrow');
        assert.ok(eyebrow.includes(`Round ${Math.ceil(round / CHECKPOINT_EVERY)} review`), `${label}: review title should name the round`);
        assert.equal(round - lastReviewed, Math.min(CHECKPOINT_EVERY, round - lastReviewed), `${label}: a review should cover at most one round`);
        lastReviewed = round;
        const summary = await text(page, '.checkpoint-summary');
        assert.ok(!summary.includes('scored later'), `${label}: a pair was left unscored at the review`);

        // Bonus Token trades follow the random-price rules and settle at the review
        const tokens = await page.evaluate(() => window.brainApp.session.checkpoint.tokens || []);
        for (const t of tokens) {
            const shouldTrade = t.kind === 'sell' ? t.drawn >= t.price : t.drawn <= t.price;
            assert.equal(t.traded, shouldTrade, `${label}: token trade rule`);
            assert.equal(t.held, t.kind === 'sell' ? !t.traded : t.traded, `${label}: token ownership`);
            assert.ok(t.held ? [0, 40].includes(t.payout) : t.payout === 0, `${label}: token payout`);
            assert.equal(t.net, t.cash + t.payout, `${label}: token points`);
        }
        tokensSettled += tokens.length;
        const tokenNet = tokens.reduce((sum, t) => sum + t.net, 0);
        if (tokenNet !== 0) expectedScore = Math.max(0, expectedScore + tokenNet);
        shownScore = expectedScore;
        assert.equal(Number(await text(page, '#current-score')), shownScore, `${label}: score after review`);

        practiceAnswered += await doPractice(page);
        const queueLength = (await sessionState()).queue.length;
        await page.click('#checkpoint-continue-btn');
        if (round < queueLength) {
            await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
        } else {
            break;
        }
    }

    await page.waitForFunction(() => document.getElementById('summary-modal').classList.contains('active'));
    await settle(); // the radar chart draws just after the audit opens
    assert.equal(Number(await text(page, '#final-score')), expectedScore, `${label}: final score`);
    assert.equal(await isHidden(page, '#play-again-btn'), false, `${label}: next-session button should show`);

    // The final screen points players back to the privacy policy
    assert.equal(await isHidden(page, '#hidden-tests'), false, `${label}: hidden-tests debrief should show`);
    const passedPolicy = await page.evaluate(() => window.brainApp.progress.data.consent.checked === false);
    if (!passedPolicy) assert.ok(await page.$('#hidden-tests a[href="privacy.html"]'), `${label}: debrief should link to the policy`);

    // The audit lists every missed topic, each opening to its missed questions
    const auditTopics = await page.$$eval('.missed-topic', els => els.map(el => el.dataset.bias));
    assert.deepEqual([...auditTopics].sort(), [...missedTypes].sort(), `${label}: audit should list every missed topic`);
    const firstVuln = await page.$('.audit-item-link');
    if (firstVuln) {
        await firstVuln.click();
        const opened = await page.$eval('.missed-topic[open]', el => el.querySelectorAll('.review-card').length);
        assert.ok(opened > 0, `${label}: clicking a vulnerability should open its missed questions`);
    }

    // The planned part never changes; the tail holds retests of missed topics and padding
    const finalState = await sessionState();
    const finalQueue = finalState.queue;
    const plannedLength = finalState.plannedLength;
    assert.equal(finalQueue.length % REVIEW_BLOCK, 0, `${label}: session should end on a full review block`);
    assert.deepEqual(finalQueue.slice(0, plannedLength), startingQueue.slice(0, plannedLength), `${label}: planned questions changed`);
    const tailEntries = finalQueue.slice(plannedLength);
    assert.ok(tailEntries.every(e => e.retest || (e.pad && isFiller(e.id))), `${label}: the tail should hold only retests and padding`);
    const startingRetestTypes = new Set(startingQueue.filter(e => e.retest).map(e => ScenarioBank.getScenario(e.id).biasType));
    const retestEntries = finalQueue.filter(e => e.retest);
    assert.ok(retestEntries.every(e => missedTypes.has(ScenarioBank.getScenario(e.id).biasType) || startingRetestTypes.has(ScenarioBank.getScenario(e.id).biasType)),
        `${label}: a retest covers a topic that wasn't missed`);
    assert.ok(retestEntries.every(e => !ScenarioBank.getScenario(e.id).pair), `${label}: retests should be standalone`);
    const added = retestEntries.length - startingQueue.filter(e => e.retest).length;
    // Planned questions never repeat; a retest may re-ask an earlier question but never another retest
    checkQueue(finalQueue.slice(0, plannedLength), label);
    const retestIds = finalQueue.filter(e => e.retest).map(e => e.id);
    assert.equal(new Set(retestIds).size, retestIds.length, `${label}: the same retest was queued twice`);
    assert.deepEqual(played, finalQueue.map(e => e.id), `${label}: played order should match the queue`);
    const tokenQuestions = played.filter(id => ScenarioBank.getScenario(id).token).length;
    assert.equal(tokensSettled, tokenQuestions, `${label}: every Bonus Token question should settle at a review`);
    return { queue: finalQueue, added, finalScore: expectedScore, practiceAnswered, bonusClaimed };
}

async function runBrowserChecks(browser) {
    const page = await browser.newPage();
    // No smooth scrolling or fades, so clicks never land mid-animation
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const pageErrors = [];
    page.on('pageerror', e => pageErrors.push(e.message));
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    // The game loads nothing from any other server (the privacy policy promises this)
    const outsideHosts = async () => page.evaluate(() => {
        const hosts = performance.getEntriesByType('resource').map(e => new URL(e.name).host);
        return [...new Set(hosts)].filter(h => h !== location.host);
    });
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await outsideHosts(), [], 'The game should not contact other servers');

    await enterId(page, 'E2E-Player', { checkConsent: false });
    const consent = await page.evaluate(() => JSON.parse(localStorage.getItem('gmb_progress_e2e-player')).consent);
    assert.equal(consent.checked, false, 'Leaving consent unchecked should be recorded');

    // Session 1 is the short version by default
    const first = await playSession(page, 'session 1 (short)');
    const debrief = await text(page, '#hidden-tests');
    assert.ok(debrief.includes('continued without agreeing'), 'Debrief should reflect that the player continued without agreeing');
    assert.ok(await page.$('#hidden-tests img[src="images/gerald-sad.svg"]'), 'Passing the policy test should show sad Gerald');
    assert.ok(first.bonusClaimed, 'The bonus pop-up should appear in the first session');
    assert.ok(/Gotcha! 2 of 3 sneaky tests caught you/.test(debrief), 'Debrief should count the bonus pop-up and leaderboard box as failed tests');
    const leaderboard = await page.evaluate(() => JSON.parse(localStorage.getItem('gmb_progress_e2e-player')).hiddenTests.leaderboard);
    assert.deepEqual(leaderboard, { at: 20, kept: true }, 'The pre-ticked leaderboard box should appear at the round 2 review and be recorded');
    assert.ok(debrief.includes('The leaderboard box'), 'Debrief should reveal the leaderboard box');
    assert.ok(await page.$('#hidden-tests .hidden-test-fail'), 'The bonus pop-up result should be marked as failed');
    const shortIds = ScenarioBank.mainQuestions('short').map(s => s.id).sort();
    const firstPlanned = first.queue.filter(e => !e.retest && !isFiller(e.id)).map(e => e.id);
    assert.deepEqual([...firstPlanned].sort(), shortIds, 'The short version should ask every short-version question once');
    assert.ok(first.queue.some(e => isFiller(e.id)), 'Session 1 should include straightforward questions');
    assert.ok(first.queue.length <= SHORT_SESSION_MAX, `The short version ran to ${first.queue.length} questions, over the ${SHORT_SESSION_MAX} limit`);
    assert.match(await text(page, '#play-again-btn'), /Continue to the Full Version/, 'The short version should offer the full version');

    // Continuing goes through every regular question not yet seen
    await page.click('#play-again-btn');
    await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
    const secondStart = await page.evaluate(() => window.brainApp.session.queue);
    const secondPlanned = secondStart.filter(e => !e.retest && !isFiller(e.id)).map(e => e.id).sort();
    assert.deepEqual(secondPlanned, MAIN_POOL.map(s => s.id).filter(id => !shortIds.includes(id)).sort(),
        'The full version should cover every question the short version skipped');
    assert.equal(secondStart.length % REVIEW_BLOCK, 0, 'Session 2 should be padded to a full block');

    // A reload resumes the same question
    const firstTitle = await text(page, '#scenario-title');
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await isHidden(page, '#scenario-stage'), false, 'Reload should resume the session');
    assert.equal(await text(page, '#scenario-title'), firstTitle, 'Reload changed the question');

    const second = await playSession(page, 'session 2 (full)');

    // The audit can switch back to the first session's results
    const sessionOptions = await page.$$eval('#audit-session-select option', els => els.map(el => el.value));
    assert.deepEqual(sessionOptions, ['past-1', 'past-0'], 'Audit should offer both finished sessions, newest first');
    await page.select('#audit-session-select', 'past-0');
    await settle();
    assert.equal(Number(await text(page, '#final-score')), first.finalScore, 'Audit should show session 1 again');

    // After everything has been seen, the next session retests weak topics only
    await page.select('#audit-session-select', 'past-1');
    await settle(); // the audit redraws for the selected session
    await page.click('#play-again-btn');
    await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
    const thirdStart = await page.evaluate(() => window.brainApp.session.queue);
    const stillWrong = await page.evaluate(() => window.brainApp.progress.retestTypes());
    assert.ok(thirdStart.length > 0 && thirdStart.every(e => e.retest || (e.pad && isFiller(e.id))),
        'Session 3 should be retests plus padding');
    assert.ok(thirdStart.filter(e => e.retest).length <= stillWrong.length, 'Session 3 should retest each weak topic once');
    assert.equal(thirdStart.length % REVIEW_BLOCK, 0, 'Session 3 should be padded to a full block');

    // Switch ID returns to the ID screen; a new ID starts fresh
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#switch-id-btn');
    assert.equal(await isHidden(page, '#intro-view'), false, 'Switch ID should show the ID screen');
    // A blank ID plays as a guest with its own fresh progress; the checkbox picks the full version
    await enterId(page, '', { checkConsent: true, fullVersion: true });
    const guestKeys = () => page.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('gmb_progress_~guest-')));
    const firstGuest = await guestKeys();
    assert.equal(firstGuest.length, 1, 'A blank ID should play as a new guest');
    assert.equal(await text(page, '#current-round'), '1', 'A new player starts at round 1');
    const fullStart = await page.evaluate(() => window.brainApp.session.queue);
    assert.deepEqual(fullStart.filter(e => !isFiller(e.id)).map(e => e.id).sort(), MAIN_POOL.map(s => s.id).sort(),
        'Choosing the full version should cover every regular question');
    assert.equal(fullStart.length % REVIEW_BLOCK, 0, 'The full version should be whole review blocks');

    // Switching to another blank ID starts over instead of resuming the last guest
    await page.click('#options-container [data-option-index="0"]');
    await page.waitForFunction(() => window.brainApp.session.position === 1);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#switch-id-btn');
    await enterId(page, '', { checkConsent: true });
    assert.equal(await page.evaluate(() => window.brainApp.session.position), 0, 'A new guest should start at the first question');
    const secondGuest = await guestKeys();
    assert.equal(secondGuest.length, 1, 'The earlier guest progress should be cleared');
    assert.notEqual(secondGuest[0], firstGuest[0], 'Each blank ID should be a different guest');
    // Reloading the tab resumes the current guest
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await isHidden(page, '#scenario-stage'), false, 'Reloading should resume the current guest');

    // The privacy policy loads, mentions that the greyed-out button still works, and has no picture of Gerald
    await page.goto(`http://localhost:${PORT}/privacy.html`, { waitUntil: 'networkidle0' });
    const policy = await page.$eval('main', el => el.textContent);
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await outsideHosts(), [], 'The privacy policy should not contact other servers');
    assert.ok(/collects no data/.test(policy) && /no legal effect/.test(policy), 'Policy should include the accurate data summary');
    assert.ok(/greyed out/.test(policy) && /still works/.test(policy), 'Policy should mention the greyed-out button');
    assert.equal(await page.$('main img'), null, 'The privacy policy should have no images');

    // The question review page renders every question
    await page.goto(`http://localhost:${PORT}/questions.html`, { waitUntil: 'networkidle0' });
    const reviewCards = await page.$$eval('.card', els => els.length);
    // Every ad image loads
    const adImages = await page.$$eval('img.ad-image', els => Promise.all(els.map(img => {
        img.loading = 'eager';
        return img.decode().then(() => img.naturalWidth > 0, () => false);
    })));
    assert.ok(adImages.length === MASTER_SCENARIOS.filter(s => s.image).length && adImages.every(Boolean), 'Every ad image should load');
    assert.equal(reviewCards, STANDALONE_SCENARIOS.filter(s => !s.retired).length + Object.keys(PAIRED_TESTS).length, 'Review page card count');

    assert.deepEqual(pageErrors, [], 'Page threw errors');
    return { first, second };
}

const server = createStaticServer().listen(PORT, async () => {
    let browser;
    try {
        checkScenarioData();
        checkSessionBuilder();
        checkProgress();
        checkAuditLists();

        browser = await puppeteer.launch({ executablePath: BRAVE_PATH, headless: 'new', args: ['--mute-audio'] });
        const { first, second } = await runBrowserChecks(browser);
        console.log(`PASS: ${MASTER_SCENARIOS.length} scenarios checked; session 1 had ${first.queue.length} questions ` +
            `(${first.added} retests added), session 2 had ${second.queue.length}; ` +
            `${first.practiceAnswered + second.practiceAnswered} practice questions answered`);
    } catch (e) {
        console.error('FAIL:', e.message);
        process.exitCode = 1;
    } finally {
        if (browser) await browser.close();
        server.close();
    }
});
