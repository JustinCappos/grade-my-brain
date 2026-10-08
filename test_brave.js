/**
 * End-to-end test: plays a full session in headless Brave and checks that
 * every scenario appears exactly once, framing pairs are spaced apart and
 * scored on their second appearance, and the audit summary is shown at the end.
 * Also checks that the audit only lists real vulnerabilities and strengths.
 *
 * Run with: npm test
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import assert from 'assert/strict';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import { MASTER_SCENARIOS } from './js/scenarioBank.js';
import { BiasAnalyzer } from './js/biasAnalyzer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 8088;
const BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const MIN_FRAMING_GAP = 8;

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
    const framingFirstRound = {};
    let expectedScore = 100;

    for (let round = 1; round <= MASTER_SCENARIOS.length; round++) {
        const roundText = await page.$eval('#current-round', el => el.textContent);
        assert.equal(roundText, `${round} / ${MASTER_SCENARIOS.length}`);

        const title = await page.$eval('#scenario-title', el => el.textContent);
        const scenario = scenariosByTitle.get(title);
        assert.ok(scenario, `Unknown scenario title: ${title}`);
        seenIds.push(scenario.id);

        // Always pick the first option, so framing pairs are always answered consistently
        const cards = await page.$$('.clean-choice-card');
        assert.equal(cards.length, scenario.options.length, `Wrong number of options for ${title}`);
        await clickAndWait(page, cards[0]);

        const delta = await page.$eval('#breakdown-score-delta', el => el.textContent);
        const pair = scenario.framingPair;

        if (pair && !(pair in framingFirstRound)) {
            framingFirstRound[pair] = round;
            assert.equal(delta, 'Scored later', `First of framing pair should not be scored: ${title}`);
        } else if (pair) {
            const gap = round - framingFirstRound[pair];
            assert.ok(gap >= MIN_FRAMING_GAP, `Framing pair "${pair}" only ${gap} rounds apart`);
            assert.equal(delta, '+20 PTS', `Consistent framing answers should score: ${title}`);
            const summary = await page.$eval('#framing-summary', el => el.children.length);
            assert.equal(summary, 2, 'Framing summary should show both answers');
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

    assert.equal(new Set(seenIds).size, MASTER_SCENARIOS.length, 'A scenario was repeated or skipped');

    const auditShown = await page.$eval('#summary-modal', el => el.classList.contains('active'));
    assert.ok(auditShown, 'Audit summary should be shown after the last round');
    assert.deepEqual(pageErrors, [], 'Page threw errors');

    return expectedScore;
}

// The audit only lists real vulnerabilities and strengths
function checkAuditLists() {
    const logsWithBiasValue = value => MASTER_SCENARIOS
        .filter(s => !s.framingPair || s.id.endsWith('survival') || s.id.endsWith('pass'))
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

server.listen(PORT, async () => {
    let browser;
    try {
        checkAuditLists();
        browser = await puppeteer.launch({ executablePath: BRAVE_PATH, headless: 'new' });
        const page = await browser.newPage();
        const finalScore = await playSession(page);
        console.log(`PASS: played ${MASTER_SCENARIOS.length} rounds, final score ${finalScore}`);
    } catch (e) {
        console.error('FAIL:', e.message);
        process.exitCode = 1;
    } finally {
        if (browser) await browser.close();
        server.close();
    }
});
