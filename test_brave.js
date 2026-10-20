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
    MIN_PAIR_GAP, REVIEW_BLOCK, SHORT_SESSION_MAX, OFFICE_SESSION_MAX, ScenarioBank
} from './js/scenarioBank.js';
import { BiasAnalyzer } from './js/biasAnalyzer.js';
import { Progress } from './js/progress.js';

const PORT = 8088;
const BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const CHECKPOINT_EVERY = REVIEW_BLOCK;

const MAIN_POOL = MASTER_SCENARIOS.filter(s => !s.practiceOnly && !s.retestOnly && !s.officeOnly && !s.filler && !s.retired);
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
        assert.ok(queue.every(e => !e.pad), 'A first session needs no padding');
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
        assert.ok(queue.every(e => !e.pad), 'A short session needs no padding');
        assert.deepEqual(queue.filter(e => !isFiller(e.id)).map(e => e.id).sort(),
            ScenarioBank.mainQuestions('short').map(s => s.id).sort(), 'Short session should hold the short-version questions');
        checkQueue(queue, 'short session');
    }
    assert.equal(ScenarioBank.sessionLengthEstimate('short'), ScenarioBank.buildSession({ version: 'short' }).queue.length);

    // A few questions unseen: those come first, then one retest per missed topic, with one straightforward question mixed in
    const unseen = new Set(['anchoring-1', 'ads-truncated-axis']);
    const seenIds = new Set(MAIN_POOL.map(s => s.id).filter(id => !unseen.has(id)));
    const retestTypes = ['BASE_RATE', 'SUNK_COST', 'HALO'];
    const { queue } = ScenarioBank.buildSession({ seenIds, retestTypes, missedIds: new Set(['baserate-1']) });
    assert.equal(queue.filter(e => e.pad).length, 1, 'Three retests should get one straightforward question');
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

    // The Bonus Token review explains the player's own prices
    const diagnose = PAIRED_TESTS.bonusToken.diagnose;
    assert.match(diagnose(30, 15), /gap of 15 points/);
    assert.match(diagnose(20, 20), /within 5 points/);
    assert.equal(PAIRED_TESTS.bonusToken.isConsistent(30, 15), false);

    // The office version: only office questions, and the standard versions never use office-only ones
    const officeMain = ScenarioBank.mainQuestions('office');
    assert.ok(officeMain.every(s => s.office), 'Office sessions use office questions only');
    assert.ok(ScenarioBank.sessionLengthEstimate('office') <= 20, 'The office version should be about 20 questions or fewer');
    assert.ok(!ScenarioBank.mainQuestions('full').some(s => s.officeOnly), 'Office-only questions stay out of the standard versions');
    for (const type of new Set(officeMain.map(s => s.biasType))) {
        const retests = STANDALONE_SCENARIOS.filter(s => s.retestOnly && s.office && s.biasType === type);
        assert.ok(retests.length >= 2, `${type} needs at least two office makeup questions`);
        const practice = ScenarioBank.pickPracticeScenario(type, { version: 'office' });
        assert.ok(practice && practice.office, `${type} needs an office practice question`);
        assert.ok(ScenarioBank.pickRetestScenario(type, { version: 'office' }).office, `${type} office retests should be office questions`);
    }
    const officeSession = ScenarioBank.buildSession({ version: 'office' }).queue;
    assert.ok(officeSession.every(e => ScenarioBank.getScenario(e.id).office), 'Office padding should use office questions');

    // In the work inbox, the outside senders (including the Cyrillic lookalike) are the external ones
    const workInbox = ScenarioBank.getScenario('se-phishing-inbox');
    const external = workInbox.inbox.map((m, i) => domainToASCII(m.address.split('@')[1]) !== workInbox.internalDomain ? i + 1 : null).filter(Boolean);
    assert.deepEqual(external, [1, 3, 5], 'Emails 1, 3 and 5 should come from outside larkwood.com');

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
    assert.equal(tail.length, 4, 'Three retests should keep only one straightforward question');
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
    assert.ok(!Progress.exists(storage), 'A new browser has no saved game');
    const p = new Progress(storage);
    p.recordResult({ scenarioId: 'a', biasType: 'ANCHORING', correct: false, kind: 'main' });
    p.recordResult({ scenarioId: 'b', biasType: 'BASE_RATE', correct: false, kind: 'main' });
    p.recordResult({ scenarioId: 'c', biasType: 'ANCHORING', correct: true, kind: 'retest' });
    p.recordResult({ scenarioId: 'd', biasType: 'HALO', correct: false, kind: 'practice' });
    p.recordResult({ scenarioId: 'e', biasType: 'FRAMING', correct: false, kind: 'main' });
    p.markSeen('a');
    p.save();

    const reloaded = new Progress(storage);
    assert.deepEqual(reloaded.retestTypes(), ['FRAMING', 'BASE_RATE']);
    assert.deepEqual([...reloaded.missedIds()].sort(), ['a', 'b', 'e']);
    assert.ok(reloaded.seenIds.has('a'));
    assert.ok(Progress.exists(storage), 'Saving should create the saved game');
    const finished = { queue: [{ id: 'a' }], shownScore: 120, reviewed: [{ scenarioId: 'a', correct: true }] };
    reloaded.archiveSession(finished);
    reloaded.archiveSession(finished);
    assert.equal(reloaded.pastSessions.length, 1, 'A session should only be archived once');
    reloaded.reset();
    const afterReset = new Progress(storage);
    assert.equal(afterReset.data.results.length, 0);
    assert.equal(afterReset.pastSessions.length, 1, 'Resetting the question pool should keep past session results');
    Progress.clear(storage);
    assert.ok(!Progress.exists(storage), 'Starting over should clear the saved game');
    assert.equal(new Progress(storage).pastSessions.length, 0);
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

async function startGame(page, { checkConsent, mode }) {
    assert.equal(await isHidden(page, '#intro-view'), false, 'The start screen should show first');
    assert.equal(await page.$('#id-code-input'), null, 'The start screen should not ask for an ID code');
    if (mode) await page.click(`input[name="mode"][value="${mode}"]`);
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
    await page.click('#intro-continue-btn');
    await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
}

// Clicks Start over and confirms it
async function startOver(page) {
    page.once('dialog', d => d.accept());
    await page.click('#restart-btn');
    await page.waitForFunction(() => !document.getElementById('intro-view').hidden);
}

// Answers the current question: the first option, or "Keep" for every email in an inbox
async function answerCurrent(page) {
    if (await page.$('#options-container #inbox-submit')) {
        for (const keep of await page.$$('#options-container .inbox-choice[data-inbox-choice="keep"]')) await keep.click();
        await page.click('#options-container #inbox-submit');
    } else {
        await page.click('#options-container [data-option-index="0"]');
    }
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

        const totalBeforeAnswer = (await sessionState()).queue.length;
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
            const tagged = await page.$$eval('#options-container .inbox-row', rows => rows.map(r => Boolean(r.querySelector('.inbox-external'))));
            const expectedTags = scenario.inbox.map(m => Boolean(scenario.internalDomain)
                && domainToASCII(m.address.split('@')[1]) !== scenario.internalDomain);
            assert.deepEqual(tagged, expectedTags, `${label}: only mail from outside the company should be tagged External`);
            for (const keep of keeps) await keep.click();
            await page.click('#options-container #inbox-submit');
        } else {
            // Choices are option cards, or the buttons of a mock screen; pick the first option
            const cards = await page.$$('#options-container [data-option-index]');
            assert.equal(cards.length, scenario.options.length, `${label}: wrong option count for ${scenario.id}`);
            await page.click('#options-container [data-option-index="0"]');
        }

        // The length before this answer: a review may add retests afterwards
        const atReview = round % CHECKPOINT_EVERY === 0 || round === totalBeforeAnswer;
        if (!atReview) {
            await page.waitForFunction(p => window.brainApp.session.position === p && !document.getElementById('scenario-stage').hidden, {}, round)
                .catch(async err => {
                    const st = await sessionState();
                    throw new Error(`${label}: stuck after round ${round} (position ${st.position}, phase ${st.phase}, ${st.queue.length} queued, scenario ${scenario.id}): ${err.message}`);
                });
            continue;
        }

        await page.waitForFunction(() => !document.getElementById('checkpoint-view').hidden);
        // The test answers instantly, so every review shows the pace and the speed-run nudge
        assert.match(await text(page, '#checkpoint-view .pace-note'), /You averaged .* per question this round/, `${label}: review should show the pace`);
        assert.ok(await page.$('#checkpoint-view .pace-warning'), `${label}: very fast answers should get the speed-run nudge`);
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
            // The hidden review is cleared, so none of its buttons (like a practice inbox's) linger
            assert.equal(await page.$eval('#checkpoint-view', el => el.children.length), 0, `${label}: the review should be cleared once the next question shows`);
        } else {
            break;
        }
    }

    await page.waitForFunction(() => document.getElementById('summary-modal').classList.contains('active'));
    await settle(); // the radar chart draws just after the audit opens
    assert.equal(Number(await text(page, '#final-score')), expectedScore, `${label}: final score`);
    assert.match(await text(page, '#final-pace'), /Time on questions: \d+:\d\d/, `${label}: the report should show the time on questions`);
    assert.ok(await page.$('#final-pace .pace-warning'), `${label}: the report should flag a speed run`);
    const nextVisible = !(await isHidden(page, '#play-again-btn')) || !(await isHidden(page, '#full-version-cta'));
    assert.ok(nextVisible, `${label}: next-session button should show`);

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
    const tailRetests = finalQueue.slice(finalState.plannedLength).filter(e => e.retest).length;
    const tailPads = finalQueue.slice(finalState.plannedLength).filter(e => e.pad).length;
    assert.ok(tailPads <= Math.max(1, Math.ceil(tailRetests / 2)), `${label}: ${tailPads} straightforward questions for ${tailRetests} retests is too many`);
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

    await startGame(page, { checkConsent: false });
    const consent = await page.evaluate(() => JSON.parse(localStorage.getItem('gmb_progress')).consent);
    assert.equal(consent.checked, false, 'Leaving consent unchecked should be recorded');

    // Session 1 is the short version by default
    const first = await playSession(page, 'session 1 (short)');
    const debrief = await text(page, '#hidden-tests');
    assert.ok(debrief.includes('continued without agreeing'), 'Debrief should reflect that the player continued without agreeing');
    assert.ok(await page.$('#hidden-tests img[src="images/gerald-sad.svg"]'), 'Passing the policy test should show sad Gerald');
    assert.ok(first.bonusClaimed, 'The bonus pop-up should appear in the first session');
    assert.ok(/Gotcha! 2 of 3 sneaky tests caught you/.test(debrief), 'Debrief should count the bonus pop-up and leaderboard box as failed tests');
    const leaderboard = await page.evaluate(() => JSON.parse(localStorage.getItem('gmb_progress')).hiddenTests.leaderboard);
    assert.deepEqual(leaderboard, { at: 20, kept: true }, 'The pre-ticked leaderboard box should appear at the round 2 review and be recorded');
    assert.ok(debrief.includes('The leaderboard box'), 'Debrief should reveal the leaderboard box');
    assert.ok(await page.$('#hidden-tests .hidden-test-fail'), 'The bonus pop-up result should be marked as failed');
    const shortIds = ScenarioBank.mainQuestions('short').map(s => s.id).sort();
    const firstPlanned = first.queue.filter(e => !e.retest && !isFiller(e.id)).map(e => e.id);
    assert.deepEqual([...firstPlanned].sort(), shortIds, 'The short version should ask every short-version question once');
    assert.ok(first.queue.some(e => isFiller(e.id)), 'Session 1 should include straightforward questions');
    // Retests use questions the player hasn't seen, never a repeat
    const firstRetests = first.queue.filter(e => e.retest).map(e => e.id);
    assert.ok(firstRetests.length > 0, 'Session 1 should add retests');
    // (a missed straightforward question is retested with another straightforward one)
    assert.deepEqual(firstRetests.filter(id => !ScenarioBank.getScenario(id).retestOnly && !isFiller(id)), [], 'Session 1 retests should all be retest-only questions');
    assert.equal(new Set(first.queue.map(e => e.id)).size, first.queue.length, 'No question should appear twice in a session');
    assert.ok(first.queue.length <= SHORT_SESSION_MAX, `The short version ran to ${first.queue.length} questions, over the ${SHORT_SESSION_MAX} limit`);
    assert.equal(await isHidden(page, '#full-version-cta'), false, 'The final screen should invite the player to the full version');
    assert.equal(await isHidden(page, '#play-again-btn'), true, 'The invitation replaces the bottom button');
    assert.match(await text(page, '#full-version-cta-btn'), /Start the full version/);
    // Stopping shows a goodbye screen that still offers the full version
    await page.click('#exit-btn');
    await page.waitForFunction(() => !document.getElementById('checkpoint-view').hidden && document.getElementById('goodbye-full-btn'));
    assert.equal(await page.$eval('#summary-modal', el => el.classList.contains('active')), false, "I'm done should close the report");

    // Continuing (from the invitation) goes through every regular question not yet seen
    await page.click('#goodbye-full-btn');
    await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
    const secondStart = await page.evaluate(() => window.brainApp.session.queue);
    const secondPlanned = secondStart.filter(e => !e.retest && !isFiller(e.id)).map(e => e.id).sort();
    assert.deepEqual(secondPlanned, MAIN_POOL.map(s => s.id).filter(id => !shortIds.includes(id)).sort(),
        'The full version should cover every question the short version skipped');
    assert.equal(secondStart.filter(e => e.pad).length, Math.ceil(secondStart.filter(e => e.retest).length / 4),
        'Session 2 should mix in one straightforward question per four retests');

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
    assert.equal(thirdStart.filter(e => e.pad).length, Math.ceil(thirdStart.filter(e => e.retest).length / 4),
        'A retest-only session should mix in one straightforward question per four retests');

    // Start over clears the saved game and returns to the start screen; the new game starts fresh
    await page.evaluate(() => window.scrollTo(0, 0));
    await startOver(page);
    assert.equal(await isHidden(page, '#intro-view'), false, 'Start over should show the start screen');
    assert.equal(await page.evaluate(() => localStorage.getItem('gmb_progress')), null, 'Start over should clear the saved game');
    assert.equal(await page.$('#full-version-toggle'), null, 'The start screen should not offer the full version');
    await startGame(page, { checkConsent: true });
    assert.equal(await text(page, '#current-round'), '1', 'A new player starts at round 1');
    const freshStart = await page.evaluate(() => window.brainApp.session);
    assert.equal(freshStart.version, 'short', 'A new player should start with the short version');
    assert.deepEqual(freshStart.queue.filter(e => !isFiller(e.id)).map(e => e.id).sort(), ScenarioBank.mainQuestions('short').map(s => s.id).sort(),
        'The short version should cover every short question');
    assert.equal(freshStart.queue.length, ScenarioBank.sessionLengthEstimate('short'), 'The short version should be its estimated length');

    // Coming back later (a fresh tab) resumes the same game at the same question
    await answerCurrent(page);
    await page.waitForFunction(() => window.brainApp.session.position === 1);
    const laterTab = await browser.newPage();
    await laterTab.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
    assert.equal(await isHidden(laterTab, '#scenario-stage'), false, 'A returning player should resume without the start screen');
    assert.equal(await laterTab.evaluate(() => window.brainApp.session.position), 1, 'A returning player should resume at the same question');
    await laterTab.close();
    // Cancelling Start over keeps the game
    page.once('dialog', d => d.dismiss());
    await page.click('#restart-btn');
    assert.equal(await isHidden(page, '#scenario-stage'), false, 'Cancelling Start over should keep the game');

    // The office version: a shorter session of plain-language office questions, with
    // makeup rounds drawn only from office questions
    await page.evaluate(() => window.scrollTo(0, 0));
    await startOver(page);
    // Switching away on the start screen (e.g. to read the policy) never counts
    const switchAway = (times) => page.evaluate(n => {
        for (let i = 0; i < n; i++) {
            window.dispatchEvent(new Event('blur'));
            window.dispatchEvent(new Event('focus'));
        }
    }, times);
    await switchAway(3);
    await startGame(page, { checkConsent: true, mode: 'office' });
    assert.equal(await page.evaluate(() => window.brainApp.session.leftCount || 0), 0, 'Switches before the first question should not count');
    // Switching away a lot while answering turns the reminder under each question into a warning
    await switchAway(8);
    assert.equal(await page.$('#answer-on-your-own.answer-on-your-own-warn'), null, 'Eight switches should not warn yet');
    await switchAway(1);
    assert.ok(await page.$('#answer-on-your-own.answer-on-your-own-warn'), 'A ninth switch should warn under the question');
    assert.match(await text(page, '#answer-on-your-own'), /switched away from this window 9 times/);
    const officeStart = await page.evaluate(() => window.brainApp.session);
    assert.equal(officeStart.version, 'office', 'Choosing the office version should start an office session');
    assert.deepEqual(officeStart.queue.filter(e => !isFiller(e.id)).map(e => e.id).sort(), ScenarioBank.mainQuestions('office').map(s => s.id).sort(),
        'The office session should ask every office question');
    const office = await playSession(page, 'office session');
    assert.ok(await page.$('#final-pace .leave-warning'), 'The report should mention the switching away');
    const officeIds = office.queue.map(e => e.id);
    assert.deepEqual(officeIds.filter(id => !ScenarioBank.getScenario(id).office), [], 'The office session should only use office questions');
    assert.ok(office.queue.length <= OFFICE_SESSION_MAX, `The office session ran to ${office.queue.length} questions`);
    assert.equal(await isHidden(page, '#full-version-cta'), true, 'The office version should not offer the full version');
    if (await page.evaluate(() => window.brainApp.progress.retestTypes().length) > 0) {
        assert.match(await text(page, '#play-again-btn'), /makeup round/, 'The office version should offer a makeup round');
        await page.click('#play-again-btn');
        await page.waitForFunction(() => !document.getElementById('scenario-stage').hidden);
        const makeup = await page.evaluate(() => window.brainApp.session);
        assert.equal(makeup.version, 'office', 'The makeup round should stay in the office version');
        assert.deepEqual(makeup.queue.map(e => e.id).filter(id => !ScenarioBank.getScenario(id).office), [],
            'The makeup round should only use office questions');
        assert.ok(makeup.queue.filter(e => e.retest).length > 0, 'The makeup round should retest the missed topics');
    }

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
    return { first, second, office };
}

const server = createStaticServer().listen(PORT, async () => {
    let browser;
    try {
        checkScenarioData();
        checkSessionBuilder();
        checkProgress();
        checkAuditLists();

        browser = await puppeteer.launch({ executablePath: BRAVE_PATH, headless: 'new', args: ['--mute-audio'] });
        const { first, second, office } = await runBrowserChecks(browser);
        console.log(`PASS: ${MASTER_SCENARIOS.length} scenarios checked; session 1 had ${first.queue.length} questions ` +
            `(${first.added} retests added), session 2 had ${second.queue.length}, the office session had ${office.queue.length}; ` +
            `${first.practiceAnswered + second.practiceAnswered} practice questions answered`);
    } catch (e) {
        console.error('FAIL:', e.message); if (process.env.DEBUG) console.error(e.stack);
        process.exitCode = 1;
    } finally {
        if (browser) await browser.close();
        server.close();
    }
});
