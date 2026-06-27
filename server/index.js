import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { ensureAdminUser } from './auth.js';
import { runMigration } from './migrate.js';
import apiRouter from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// API
app.use('/api', apiRouter);

// Admin panel
app.use('/admin', express.static(path.join(ROOT, 'admin')));

// Bluespark (pre-built Astro)
app.use('/bluespark', express.static(path.join(ROOT, 'bluespark')));

// Dynamic site routes (before static)
app.get('/news/:id', (_req, res) => {
  res.sendFile(path.join(ROOT, 'site', 'article.html'));
});

app.get('/project/:id', (_req, res) => {
  res.sendFile(path.join(ROOT, 'site', 'project.html'));
});

app.get('/member/:id', (_req, res) => {
  res.sendFile(path.join(ROOT, 'site', 'member.html'));
});

const sitePages = {
  '/': 'index.html',
  '/projects': 'projects.html',
  '/team': 'team.html',
  '/contact': 'contact.html',
};
Object.entries(sitePages).forEach(([route, file]) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(ROOT, 'site', file));
  });
});

// Legacy static files (fallback for old URLs during transition)
const legacyFiles = ['projects.html', 'project.html', 'article.html', 'team.html', 'member.html', 'contact.html'];
legacyFiles.forEach((file) => {
  app.get(`/${file}`, (_req, res) => {
    res.sendFile(path.join(ROOT, file));
  });
});
app.use('/src', express.static(path.join(ROOT, 'src')));

// New fast site static assets
app.use(express.static(path.join(ROOT, 'site')));

// Health check for Render
app.get('/health', (_req, res) => res.json({ ok: true }));

// Bootstrap
ensureAdminUser();
runMigration();

app.listen(PORT, () => {
  console.log(`[server] KN SPA i BLSPS running on http://localhost:${PORT}`);
  console.log(`[server] Admin panel: http://localhost:${PORT}/admin`);
});
