/**
 * Minimal static file server for local play and testing.
 * The game uses ES modules, which browsers won't load from file:// URLs.
 *
 * Run with: npm start   (then open http://localhost:8080)
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

export function createStaticServer(root = ROOT) {
    return http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(root, urlPath === '/' ? 'index.html' : urlPath);
        if (!filePath.startsWith(root)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end(`File not found: ${urlPath}`);
            } else {
                res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream' });
                res.end(content);
            }
        });
    });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const port = Number(process.env.PORT) || 8080;
    createStaticServer().listen(port, () => {
        console.log(`Grade My Brain running at http://localhost:${port}`);
        console.log(`Question review page: http://localhost:${port}/questions.html`);
    });
}
