import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { ensureAdminUser } from './auth.js';
import { runMigration } from './migrate.js';
import { runSchemaMigrations } from './schema.js';
import apiRouter from './routes.js';
import { createBluesparkHandler } from './bluespark.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/uploads', express.static(path.join(DATA_DIR, 'uploads')));
app.use('/admin', express.static(path.join(ROOT, 'admin')));
app.use('/bluespark', createBluesparkHandler(path.join(ROOT, 'bluespark')));
app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/src', express.static(path.join(ROOT, 'src')));

// Clean URLs
app.get('/news/:id', (_req, res) => res.sendFile(path.join(ROOT, 'article.html')));
app.get('/project/:id', (_req, res) => res.sendFile(path.join(ROOT, 'project.html')));
app.get('/member/:id', (_req, res) => res.sendFile(path.join(ROOT, 'member.html')));

const pages = {
  '/': 'index.html',
  '/projects': 'projects.html',
  '/team': 'team.html',
  '/contact': 'contact.html',
};
Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (_req, res) => res.sendFile(path.join(ROOT, file)));
});

['index.html', 'projects.html', 'project.html', 'article.html', 'team.html', 'member.html', 'contact.html'].forEach((file) => {
  app.get(`/${file}`, (_req, res) => res.sendFile(path.join(ROOT, file)));
});

// Static assets at root (favicon etc.)
app.use(express.static(ROOT, { index: false }));

app.get('/health', (_req, res) => res.json({ ok: true }));

ensureAdminUser();
runSchemaMigrations();
runMigration();

app.listen(PORT, () => {
  console.log(`[server] KN SPA i BLSPS running on http://localhost:${PORT}`);
  console.log(`[server] Admin panel: http://localhost:${PORT}/admin`);
});
