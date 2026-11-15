import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { ensureAdminUser, syncAdminFromEnv } from './auth.js';
import { runMigration } from './migrate.js';
import { runSchemaMigrations } from './schema.js';
import apiRouter from './routes.js';
import db from './db.js';
import { createBluesparkHandler } from './bluespark.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const PORT = process.env.PORT || 3000;

const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/uploads', express.static(path.join(DATA_DIR, 'uploads')));
app.use('/admin', express.static(path.join(ROOT, 'admin')));
app.use('/bluespark', createBluesparkHandler(path.join(ROOT, 'bluespark')));
app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/src', express.static(path.join(ROOT, 'src')));

// Resolve detail pages before returning their HTML shell.
const detailPages = [
  { route: '/news/:id', file: 'article.html', query: 'id', sql: 'SELECT 1 FROM news WHERE id = ? AND published = 1' },
  { route: '/project/:id', file: 'project.html', query: 'id', sql: 'SELECT 1 FROM projects WHERE id = ?' },
  { route: '/member/:id', file: 'member.html', query: 'user', sql: 'SELECT 1 FROM members WHERE id = ?' },
];
for (const detail of detailPages) {
  const exists = db.prepare(detail.sql);
  const handler = (req, res) => {
    const value = req.params.id ?? req.query[detail.query];
    const id = typeof value === 'string' ? (detail.query === 'user' ? value.trim() : value) : '';
    if (!id || !exists.get(id)) {
      res.set('Cache-Control', 'no-store');
      return res.status(404).sendFile(path.join(ROOT, '404.html'));
    }
    return res.sendFile(path.join(ROOT, detail.file));
  };
  app.get(detail.route, handler);
  app.get('/' + detail.file, handler);
}

const pages = {
  '/': 'index.html',
  '/projects': 'projects.html',
  '/team': 'team.html',
  '/contact': 'contact.html',
};
Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (_req, res) => res.sendFile(path.join(ROOT, file)));
});

['index.html', 'projects.html', 'team.html', 'contact.html'].forEach((file) => {
  app.get(`/${file}`, (_req, res) => res.sendFile(path.join(ROOT, file)));
});

// Static assets at root (favicon etc.)
for (const dir of ['photo', 'pdf']) {
  app.use('/' + dir, express.static(path.join(ROOT, dir)));
}

app.get('/health', (_req, res) => res.json({ ok: true }));

ensureAdminUser();
syncAdminFromEnv();
runMigration();
runSchemaMigrations();

app.listen(PORT, '127.0.0.1', () => {
  console.log(`[server] KN SPA i BLSPS running on http://localhost:${PORT}`);
  console.log(`[server] Admin panel: http://localhost:${PORT}/admin`);
});
