import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'site.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role_pl TEXT DEFAULT '',
    role_en TEXT DEFAULT '',
    bio_pl TEXT DEFAULT '',
    bio_en TEXT DEFAULT '',
    custom_tags TEXT DEFAULT '[]',
    socials TEXT DEFAULT '[]',
    photo_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 999,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    full_title TEXT DEFAULT '',
    ordering INTEGER DEFAULT 999,
    short_desc_pl TEXT DEFAULT '',
    short_desc_en TEXT DEFAULT '',
    full_desc_pl TEXT DEFAULT '',
    full_desc_en TEXT DEFAULT '',
    team_ids TEXT DEFAULT '[]',
    spec TEXT DEFAULT '[]',
    image_url TEXT DEFAULT '',
    external_url TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    title_pl TEXT NOT NULL,
    title_en TEXT DEFAULT '',
    short_desc_pl TEXT DEFAULT '',
    short_desc_en TEXT DEFAULT '',
    full_desc_pl TEXT DEFAULT '',
    full_desc_en TEXT DEFAULT '',
    content_format TEXT DEFAULT 'html',
    cover_image TEXT DEFAULT '',
    gallery TEXT DEFAULT '[]',
    links TEXT DEFAULT '[]',
    published INTEGER DEFAULT 1,
    featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT DEFAULT '',
    logo TEXT DEFAULT '',
    category TEXT DEFAULT 'partner',
    sort_order INTEGER DEFAULT 999
  );

  CREATE TABLE IF NOT EXISTS hero_slides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER NOT NULL,
    label TEXT DEFAULT '',
    title TEXT DEFAULT '',
    image_path TEXT DEFAULT ''
  );
`);

export function getSetting(key) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row?.value ?? null;
}

export function setSetting(key, value) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, value);
}

export function isMigrated() {
  return getSetting('migrated') === 'true';
}

export function markMigrated() {
  setSetting('migrated', 'true');
}

export default db;
