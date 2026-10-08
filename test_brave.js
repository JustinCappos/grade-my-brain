import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8088;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

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

server.listen(PORT, async () => {
    try {
        console.log('Launching Headless Brave Browser for multi-round test...');
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

        for (let round = 1; round <= 3; round++) {
            console.log(`--- ROUND ${round} ---`);
            const cards = await page.$$('.clean-choice-card');
            console.log(`Found ${cards.length} cards for round ${round}`);
            if (cards.length > 0) {
                console.log(`Clicking card 0 in round ${round}...`);
                await cards[0].click();
                await new Promise(r => setTimeout(r, 400));

                const breakdownDisplay = await page.$eval('#breakdown-phase', el => el.style.display);
                const bestAnswerText = await page.$eval('#breakdown-best-answer', el => el.textContent);
                console.log(`Round ${round} Breakdown Display:`, breakdownDisplay, '| Best Answer:', bestAnswerText);

                console.log(`Clicking 'Next Scenario →' button...`);
                await page.click('#next-scenario-btn');
                await new Promise(r => setTimeout(r, 400));
            }
        }

        console.log('Successfully completed 3 rounds in headless Brave!');
        await browser.close();
    } catch (e) {
        console.error('Test error:', e);
    } finally {
        server.close();
    }
});
