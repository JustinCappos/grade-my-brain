/**
 * Checks the scenario data and session builder, then plays a full session in
 * headless Brave and checks that no scenario repeats, paired scenarios are
 * spaced apart and scored on their second appearance, and the audit summary
 * is shown at the end. Also checks that the audit only lists real
 * vulnerabilities and strengths.
 *
 * Run with: npm test
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import assert from 'assert/strict';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import {
    MASTER_SCENARIOS, STANDALONE_SCENARIOS, PAIRED_TESTS, BIAS_CATEGORIES,
    SESSION_ROUNDS, MIN_PAIR_GAP, ScenarioBank
} from './js/scenarioBank.js';
import { BiasAnalyzer } from './js/biasAnalyzer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 8088;
const BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const contentType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end(`File not found: ${req.url}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const scenariosByTitle = new Map(MASTER_SCENARIOS.map(s => [s.title, s]));

async function clickAndWait(page, elementOrSelector) {
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        typeof elementOrSelector === 'string' ? page.click(elementOrSelector) : elementOrSelector.click()
    ]);
}

async function playSession(page) {
    const pageErrors = [];
    page.on('pageerror', e => pageErrors.push(e.message));

    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    const seenIds = [];
    const pairFirstRound = {};
    let expectedScore = 100;

    for (let round = 1; round <= SESSION_ROUNDS; round++) {
        const roundText = await page.$eval('#current-round', el => el.textContent);
        assert.equal(roundText, `${round} / ${SESSION_ROUNDS}`);

        const title = await page.$eval('#scenario-title', el => el.textContent);
        const scenario = scenariosByTitle.get(title);
        assert.ok(scenario, `Unknown scenario title: ${title}`);
        seenIds.push(scenario.id);

        // Always pick the first option, which answers every pair consistently
        const cards = await page.$$('.clean-choice-card');
        assert.equal(cards.length, scenario.options.length, `Wrong number of options for ${title}`);
        await clickAndWait(page, cards[0]);

        const delta = await page.$eval('#breakdown-score-delta', el => el.textContent);
        const pair = scenario.pair;

        if (pair && !(pair in pairFirstRound)) {
            pairFirstRound[pair] = round;
            assert.equal(delta, 'Scored later', `First of a pair should not be scored: ${title}`);
        } else if (pair) {
            const gap = round - pairFirstRound[pair];
            assert.ok(gap >= MIN_PAIR_GAP, `Pair "${pair}" only ${gap} rounds apart`);
            assert.equal(delta, '+20 PTS', `Consistent pair answers should score: ${title}`);
            const summary = await page.$eval('#framing-summary', el => el.children.length);
            assert.equal(summary, 2, 'Pair summary should show both answers');
            expectedScore += 20;
        } else {
            const expectedDelta = scenario.options[0].isBest ? 20 : -15;
            assert.equal(delta, `${expectedDelta > 0 ? '+' : ''}${expectedDelta} PTS`, `Wrong score change for ${title}`);
            expectedScore = Math.max(0, expectedScore + expectedDelta);
        }

        const score = Number(await page.$eval('#current-score', el => el.textContent));
        assert.equal(score, expectedScore, `Score mismatch after round ${round}`);

        await clickAndWait(page, '#next-scenario-btn');
    }

    assert.equal(new Set(seenIds).size, SESSION_ROUNDS, 'A scenario was repeated');
    const seenPairs = seenIds.map(id => MASTER_SCENARIOS.find(s => s.id === id).pair).filter(Boolean);
    for (const pair of new Set(seenPairs)) {
        assert.equal(seenPairs.filter(p => p === pair).length, 2, `Pair ${pair} was split up`);
    }

    const auditShown = await page.$eval('#summary-modal', el => el.classList.contains('active'));
    assert.ok(auditShown, 'Audit summary should be shown after the last round');
    assert.deepEqual(pageErrors, [], 'Page threw errors');

    return expectedScore;
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
        assert.equal(s.options.filter(o => o.isBest).length, 1, `${s.id} needs exactly one best option`);
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
}

// Sessions never repeat a scenario, keep pairs together, and space them apart
function checkSessionBuilder() {
    for (let i = 0; i < 500; i++) {
        const queue = ScenarioBank.getRandomizedSessionQueue();
        assert.equal(queue.length, SESSION_ROUNDS);
        assert.equal(new Set(queue.map(s => s.id)).size, SESSION_ROUNDS, 'Session repeated a scenario');
        const positions = {};
        queue.forEach((s, idx) => { if (s.pair) (positions[s.pair] ||= []).push(idx); });
        for (const [pairId, pos] of Object.entries(positions)) {
            assert.equal(pos.length, 2, `Pair ${pairId} was split up`);
            assert.ok(pos[1] - pos[0] >= MIN_PAIR_GAP, `Pair ${pairId} too close together`);
        }
    }
}

server.listen(PORT, async () => {
    let browser;
    try {
        checkScenarioData();
        checkSessionBuilder();
        checkAuditLists();
        browser = await puppeteer.launch({ executablePath: BRAVE_PATH, headless: 'new' });
        const page = await browser.newPage();
        const finalScore = await playSession(page);
        console.log(`PASS: ${MASTER_SCENARIOS.length} scenarios checked, played ${SESSION_ROUNDS} rounds, final score ${finalScore}`);
    } catch (e) {
        console.error('FAIL:', e.message);
        process.exitCode = 1;
    } finally {
        if (browser) await browser.close();
        server.close();
    }
});
