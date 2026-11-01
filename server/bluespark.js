import fs from 'fs';
import path from 'path';
import express from 'express';

const PATCH_MARKER = 'bluespark-kn-patch.css';

function injectPatch(html) {
  if (html.includes(PATCH_MARKER)) return html;
  const patchHead = '<link rel="stylesheet" href="/bluespark/bluespark-kn-patch.css?v=2">';
  const patchBody = '<script src="/bluespark/bluespark-kn-patch.js?v=2" defer></script>';
  return html
    .replace('</head>', `${patchHead}</head>`)
    .replace('</body>', `${patchBody}</body>`);
}

export function createBluesparkHandler(rootDir) {
  const staticMiddleware = express.static(rootDir);

  return function bluesparkHandler(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return staticMiddleware(req, res, next);
    }

    const rel = req.path.replace(/\/$/, '') || '/';
    const ext = path.extname(rel);

    if (ext && ext !== '.html') {
      return staticMiddleware(req, res, next);
    }

    let filePath;
    if (rel === '/') {
      filePath = path.join(rootDir, 'index.html');
    } else if (ext === '.html') {
      filePath = path.join(rootDir, rel);
    } else {
      filePath = path.join(rootDir, rel, 'index.html');
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return staticMiddleware(req, res, next);
    }

    if (req.method === 'HEAD') {
      res.type('html');
      return res.status(200).end();
    }

    const html = injectPatch(fs.readFileSync(filePath, 'utf8'));
    res.type('html').send(html);
  };
}
