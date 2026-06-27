import db from './db.js';

export function runSchemaMigrations() {
  const newsCols = db.prepare('PRAGMA table_info(news)').all().map((c) => c.name);
  if (!newsCols.includes('cover_image')) {
    db.exec('ALTER TABLE news ADD COLUMN cover_image TEXT DEFAULT ""');
  }
  if (!newsCols.includes('gallery')) {
    db.exec('ALTER TABLE news ADD COLUMN gallery TEXT DEFAULT "[]"');
  }
  if (!newsCols.includes('featured')) {
    db.exec('ALTER TABLE news ADD COLUMN featured INTEGER DEFAULT 0');
    console.log('[schema] Added news.featured column');
  }

  const memberCols = db.prepare('PRAGMA table_info(members)').all().map((c) => c.name);
  if (!memberCols.includes('photo_url')) {
    db.exec('ALTER TABLE members ADD COLUMN photo_url TEXT DEFAULT ""');
    console.log('[schema] Added members.photo_url column');
  }

  const cleared = db.prepare(`
    UPDATE projects SET image_url = ''
    WHERE image_url LIKE '%images.unsplash.com%'
       OR image_url LIKE '%via.placeholder.com%'
  `).run();
  if (cleared.changes > 0) {
    console.log(`[schema] Cleared ${cleared.changes} placeholder project image_url values`);
  }
}
