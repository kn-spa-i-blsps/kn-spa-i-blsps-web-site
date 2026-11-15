import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import db, { getSetting } from './db.js';
import {
  authMiddleware,
  verifyLogin,
  createToken,
  setAuthCookie,
  clearAuthCookie,
  changePassword,
  emergencyResetPassword,
} from './auth.js';
import { getAllContent, formatMember, formatProject, formatNews, formatPartner, slugify } from './content.js';
import { upload, persistImage, isCloudinaryConfigured } from './upload.js';

const router = Router();

// ─── Public API ───────────────────────────────────────────────

router.get('/content', async (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(await getAllContent());
});

router.get('/members', (_req, res) => {
  const rows = db.prepare('SELECT * FROM members ORDER BY sort_order, name').all();
  res.json(rows.map(formatMember));
});

router.get('/members/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatMember(row));
});

router.get('/projects', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY ordering, title').all();
  res.json(rows.map(formatProject));
});

router.get('/projects/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatProject(row));
});

router.get('/news', (_req, res) => {
  const rows = db.prepare('SELECT * FROM news WHERE published = 1 ORDER BY date DESC').all();
  res.json(rows.map(formatNews));
});

router.get('/news/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatNews(row));
});

router.get('/partners', (_req, res) => {
  const rows = db.prepare('SELECT * FROM partners ORDER BY sort_order, name').all();
  res.json(rows.map(formatPartner));
});

// ─── Auth ─────────────────────────────────────────────────────

router.get('/auth/status', (_req, res) => {
  res.json({
    ok: true,
    username: getSetting('admin_username') || 'admin',
    hasPassword: Boolean(getSetting('admin_password_hash')),
  });
});

router.post('/auth/emergency-reset', (req, res) => {
  const { key, password } = req.body || {};
  const result = emergencyResetPassword(key, password);
  if (!result.ok) return res.status(result.status || 400).json({ error: result.error });
  res.json({ ok: true });
});

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  const storedUser = getSetting('admin_username') || 'admin';
  if (!verifyLogin(username, password)) {
    return res.status(401).json({ error: 'Nieprawidłowy login lub hasło', hint: `Login: ${storedUser}` });
  }
  const token = createToken(storedUser);
  setAuthCookie(res, token);
  res.json({ ok: true, token, username: storedUser });
});

router.post('/auth/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get('/auth/me', authMiddleware, (req, res) => {
  res.json({ username: req.user.sub, role: req.user.role });
});

router.post('/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'Nowe hasło musi mieć min. 8 znaków' });
  }
  const result = changePassword(currentPassword, newPassword);
  if (!result.ok) return res.status(400).json({ error: result.error });
  res.json({ ok: true });
});

// ─── Admin CRUD ───────────────────────────────────────────────

function parseBodyJson(val, fallback) {
  if (Array.isArray(val) || typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

// Members
router.get('/admin/members', authMiddleware, (_req, res) => {
  res.json(db.prepare('SELECT * FROM members ORDER BY sort_order, name').all());
});

router.post('/admin/members', authMiddleware, (req, res) => {
  const b = req.body;
  const id = b.id || slugify(b.name);
  if (!b.name) return res.status(400).json({ error: 'Imię jest wymagane' });

  db.prepare(`
    INSERT INTO members (id, name, role_pl, role_en, bio_pl, bio_en, custom_tags, socials, photo_url, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(
    id, b.name, b.role_pl || '', b.role_en || '', b.bio_pl || '', b.bio_en || '',
    JSON.stringify(parseBodyJson(b.custom_tags, [])),
    JSON.stringify(parseBodyJson(b.socials, [])),
    b.photo_url || '',
    b.sort_order ?? 999
  );
  res.status(201).json({ id });
});

router.put('/admin/members/:id', authMiddleware, (req, res) => {
  const b = req.body;
  const result = db.prepare(`
    UPDATE members SET name=?, role_pl=?, role_en=?, bio_pl=?, bio_en=?, custom_tags=?, socials=?, photo_url=?, sort_order=?, updated_at=datetime('now')
    WHERE id=?
  `).run(
    b.name, b.role_pl || '', b.role_en || '', b.bio_pl || '', b.bio_en || '',
    JSON.stringify(parseBodyJson(b.custom_tags, [])),
    JSON.stringify(parseBodyJson(b.socials, [])),
    b.photo_url || '',
    b.sort_order ?? 999,
    req.params.id
  );
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.delete('/admin/members/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Projects
router.get('/admin/projects', authMiddleware, (_req, res) => {
  res.json(db.prepare('SELECT * FROM projects ORDER BY ordering, title').all());
});

router.post('/admin/projects', authMiddleware, (req, res) => {
  const b = req.body;
  const id = b.id || slugify(b.title);
  if (!b.title) return res.status(400).json({ error: 'Tytuł jest wymagany' });

  db.prepare(`
    INSERT INTO projects (id, title, full_title, ordering, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, team_ids, spec, image_url, external_url, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(
    id, b.title, b.full_title || '', b.ordering ?? 999,
    b.short_desc_pl || '', b.short_desc_en || '', b.full_desc_pl || '', b.full_desc_en || '',
    JSON.stringify(parseBodyJson(b.team_ids, [])),
    JSON.stringify(parseBodyJson(b.spec, [])),
    b.image_url || '', b.external_url || ''
  );
  res.status(201).json({ id });
});

router.put('/admin/projects/:id', authMiddleware, (req, res) => {
  const b = req.body;
  const result = db.prepare(`
    UPDATE projects SET title=?, full_title=?, ordering=?, short_desc_pl=?, short_desc_en=?, full_desc_pl=?, full_desc_en=?, team_ids=?, spec=?, image_url=?, external_url=?, updated_at=datetime('now')
    WHERE id=?
  `).run(
    b.title, b.full_title || '', b.ordering ?? 999,
    b.short_desc_pl || '', b.short_desc_en || '', b.full_desc_pl || '', b.full_desc_en || '',
    JSON.stringify(parseBodyJson(b.team_ids, [])),
    JSON.stringify(parseBodyJson(b.spec, [])),
    b.image_url || '', b.external_url || '',
    req.params.id
  );
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.delete('/admin/projects/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.get('/admin/config', authMiddleware, (_req, res) => {
  res.json({
    fileUpload: true,
    cloudinaryUpload: isCloudinaryConfigured(),
    uploadMode: isCloudinaryConfigured() ? 'cloudinary' : 'local',
  });
});

router.post('/admin/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Brak pliku' });

    const entityId = req.body.entityId || req.body.articleId || req.body.article_id;
    if (!entityId) return res.status(400).json({ error: 'entityId (ID wpisu) jest wymagane' });

    const category = req.body.category || 'news';
    const role = req.body.role || req.body.type || 'cover';
    const index = req.body.index ? parseInt(req.body.index, 10) : undefined;

    const url = await persistImage(req.file.buffer, req.file.mimetype, {
      category,
      entityId,
      role,
      index,
      originalname: req.file.originalname,
    });
    res.json({ url, mode: isCloudinaryConfigured() ? 'cloudinary' : 'local' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// News
router.get('/admin/news', authMiddleware, (_req, res) => {
  res.json(db.prepare('SELECT * FROM news ORDER BY date DESC').all());
});

router.post('/admin/news', authMiddleware, (req, res) => {
  const b = req.body;
  const id = b.id || slugify(b.title_pl || b.title_en || 'article');
  if (!b.date || !b.title_pl) return res.status(400).json({ error: 'Data i tytuł PL są wymagane' });

  db.prepare(`
    INSERT INTO news (id, date, title_pl, title_en, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, content_format, cover_image, gallery, links, published, featured, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(
    id, b.date, b.title_pl, b.title_en || '',
    b.short_desc_pl || '', b.short_desc_en || '',
    b.full_desc_pl || '', b.full_desc_en || '',
    b.content_format || 'html',
    b.cover_image || '',
    JSON.stringify(parseBodyJson(b.gallery, [])),
    JSON.stringify(parseBodyJson(b.links, [])),
    b.published !== undefined ? (b.published ? 1 : 0) : 1,
    b.featured ? 1 : 0
  );
  res.status(201).json({ id });
});

router.put('/admin/news/:id', authMiddleware, (req, res) => {
  const b = req.body;
  const result = db.prepare(`
    UPDATE news SET date=?, title_pl=?, title_en=?, short_desc_pl=?, short_desc_en=?, full_desc_pl=?, full_desc_en=?, content_format=?, cover_image=?, gallery=?, links=?, published=?, featured=?, updated_at=datetime('now')
    WHERE id=?
  `).run(
    b.date, b.title_pl, b.title_en || '',
    b.short_desc_pl || '', b.short_desc_en || '',
    b.full_desc_pl || '', b.full_desc_en || '',
    b.content_format || 'html',
    b.cover_image || '',
    JSON.stringify(parseBodyJson(b.gallery, [])),
    JSON.stringify(parseBodyJson(b.links, [])),
    b.published !== undefined ? (b.published ? 1 : 0) : 1,
    b.featured ? 1 : 0,
    req.params.id
  );
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.delete('/admin/news/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Partners
router.get('/admin/partners', authMiddleware, (_req, res) => {
  res.json(db.prepare('SELECT * FROM partners ORDER BY sort_order, name').all());
});

router.post('/admin/partners', authMiddleware, (req, res) => {
  const b = req.body;
  if (!b.name) return res.status(400).json({ error: 'Nazwa jest wymagana' });
  const result = db.prepare(`
    INSERT INTO partners (name, url, logo, category, sort_order) VALUES (?, ?, ?, ?, ?)
  `).run(b.name, b.url || '', b.logo || '', b.category || 'partner', b.sort_order ?? 999);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/admin/partners/:id', authMiddleware, (req, res) => {
  const b = req.body;
  const result = db.prepare(`
    UPDATE partners SET name=?, url=?, logo=?, category=?, sort_order=? WHERE id=?
  `).run(b.name, b.url || '', b.logo || '', b.category || 'partner', b.sort_order ?? 999, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.delete('/admin/partners/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM partners WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Contact inbox. Messages are private; only submission is public.
const contactAttempts = new Map();
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const contactChallenges = new Map();
router.get('/contact/challenge', (req, res) => {
  res.set('Cache-Control', 'no-store');
  const now = Date.now();
  for (const [token, item] of contactChallenges) if (now - item.created > 7200000) contactChallenges.delete(token);
  if (contactChallenges.size >= 5000) return res.status(429).json({ error: 'Try later' });
  const existing = [...contactChallenges].find(([,item]) => item.ip === req.ip);
  if (existing) return res.json({ token: existing[0] });
  const token = randomBytes(32).toString('hex');
  contactChallenges.set(token, { created: now, ip: req.ip });
  res.json({ token });
});
router.post('/contact', (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (req.get('origin')) {
    try { if (new URL(req.get('origin')).host !== req.get('host')) return res.status(403).json({ error: 'Forbidden origin' }); }
    catch { return res.status(403).json({ error: 'Forbidden origin' }); }
  }
  if (!req.is('application/json')) return res.status(415).json({ error: 'JSON required' });
  const body = req.body || {};
  if (typeof body.website === 'string' && body.website.trim()) return res.status(202).json({ ok: true });
  const challenge = contactChallenges.get(body.challenge);
  if (!challenge || challenge.ip !== req.ip || Date.now() - challenge.created < 2000 || Date.now() - challenge.created > 7200000) return res.status(400).json({ error: 'Invalid form challenge' });
  const limits = { name: 120, email: 254, subject: 160, message: 10000 };
  const values = {};
  for (const [key, max] of Object.entries(limits)) {
    if (typeof body[key] !== 'string' || !body[key].trim() || body[key].trim().length > max) return res.status(400).json({ error: 'Invalid contact fields' });
    values[key] = body[key].trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || /[\r\n]/.test(values.email)) return res.status(400).json({ error: 'Invalid email' });
  const now = Date.now();
  for (const [ip, attempt] of contactAttempts) if (now - attempt.start >= CONTACT_WINDOW_MS) contactAttempts.delete(ip);
  const key = req.ip || 'unknown';
  const attempt = contactAttempts.get(key) || { start: now, count: 0 };
  if (attempt.count >= 5 || (!contactAttempts.has(key) && contactAttempts.size >= 5000)) {
    res.set('Retry-After', String(Math.max(1, Math.ceil((CONTACT_WINDOW_MS - (now - attempt.start)) / 1000))));
    return res.status(429).json({ error: 'Too many messages' });
  }
  const recent = db.prepare("SELECT COUNT(*) AS count FROM contact_messages WHERE lower(email)=lower(?) AND created_at >= ?").get(values.email, new Date(now - CONTACT_WINDOW_MS).toISOString()).count;
  const duplicate = db.prepare('SELECT id FROM contact_messages WHERE lower(email)=lower(?) AND message=? AND created_at >= ?').get(values.email, values.message, new Date(now - 86400000).toISOString());
  if (recent >= 3 || duplicate) { res.set('Retry-After', '900'); return res.status(429).json({ error: 'Too many messages' }); }
  contactChallenges.delete(body.challenge);
  db.prepare('INSERT INTO contact_messages (name,email,subject,message,language) VALUES (?,?,?,?,?)')
    .run(values.name, values.email, values.subject, values.message, body.language === 'en' ? 'en' : 'pl');
  attempt.count++; contactAttempts.set(key, attempt);
  return res.status(201).json({ ok: true });
});
router.get('/admin/messages', authMiddleware, (req, res) => {
  res.set('Cache-Control', 'no-store');
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 25));
  const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
  const items = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?').all(limit, offset);
  const total = db.prepare('SELECT COUNT(*) AS count FROM contact_messages').get().count;
  const unread = db.prepare('SELECT COUNT(*) AS count FROM contact_messages WHERE is_read=0').get().count;
  res.json({ items, total, unread });
});
router.patch('/admin/messages/:id', authMiddleware, (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!/^\d+$/.test(req.params.id) || typeof req.body?.is_read !== 'boolean') return res.status(400).json({ error: 'Invalid message status' });
  const result = db.prepare('UPDATE contact_messages SET is_read=? WHERE id=?').run(req.body.is_read ? 1 : 0, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.delete('/admin/messages/:id', authMiddleware, (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!/^\d+$/.test(req.params.id)) return res.status(400).json({ error: 'Invalid message ID' });
  const result = db.prepare('DELETE FROM contact_messages WHERE id=?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
