import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { isMigrated, markMigrated } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadLegacyData() {
  const dataPath = path.join(__dirname, '..', 'src', 'data.js');
  const code = fs.readFileSync(dataPath, 'utf8');
  const wrapped = `${code}
;var __hs = typeof heroSlides !== 'undefined' ? heroSlides : [];
return { members, projects, news, partners, heroSlides: __hs };`;
  const fn = new Function(wrapped);
  return fn();
}

function toJson(val) {
  return JSON.stringify(val ?? []);
}

export function runMigration(force = false) {
  if (isMigrated() && !force) {
    console.log('[migrate] Already migrated, skipping.');
    return;
  }

  const { members, projects, news, partners, heroSlides } = loadLegacyData();

  const insertMember = db.prepare(`
    INSERT OR REPLACE INTO members (id, name, role_pl, role_en, bio_pl, bio_en, custom_tags, socials, sort_order, updated_at)
    VALUES (@id, @name, @role_pl, @role_en, @bio_pl, @bio_en, @custom_tags, @socials, @sort_order, datetime('now'))
  `);

  const insertProject = db.prepare(`
    INSERT OR REPLACE INTO projects (id, title, full_title, ordering, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, team_ids, spec, image_url, updated_at)
    VALUES (@id, @title, @full_title, @ordering, @short_desc_pl, @short_desc_en, @full_desc_pl, @full_desc_en, @team_ids, @spec, @image_url, datetime('now'))
  `);

  const insertNews = db.prepare(`
    INSERT OR REPLACE INTO news (id, date, title_pl, title_en, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, links, published, updated_at)
    VALUES (@id, @date, @title_pl, @title_en, @short_desc_pl, @short_desc_en, @full_desc_pl, @full_desc_en, @links, 1, datetime('now'))
  `);

  const insertPartner = db.prepare(`
    INSERT INTO partners (name, url, logo, category, sort_order)
    VALUES (@name, @url, @logo, @category, @sort_order)
  `);

  const insertHero = db.prepare(`
    INSERT INTO hero_slides (sort_order, label, title, image_path)
    VALUES (@sort_order, @label, @title, @image_path)
  `);

  const tx = db.transaction(() => {
    db.prepare('DELETE FROM members').run();
    db.prepare('DELETE FROM projects').run();
    db.prepare('DELETE FROM news').run();
    db.prepare('DELETE FROM partners').run();
    db.prepare('DELETE FROM hero_slides').run();

    members.forEach((m, i) => {
      insertMember.run({
        id: m.id,
        name: m.name,
        role_pl: m.role?.pl || '',
        role_en: m.role?.en || '',
        bio_pl: m.bio?.pl || '',
        bio_en: m.bio?.en || '',
        custom_tags: toJson(m.customTags),
        socials: toJson(m.socials),
        sort_order: i,
      });
    });

    projects.forEach((p) => {
      insertProject.run({
        id: p.id,
        title: p.title,
        full_title: p.fullTitle || '',
        ordering: p.ordering ?? 999,
        short_desc_pl: p.shortDesc?.pl || '',
        short_desc_en: p.shortDesc?.en || '',
        full_desc_pl: p.fullDesc?.pl || '',
        full_desc_en: p.fullDesc?.en || '',
        team_ids: toJson(p.teamIds),
        spec: toJson(p.spec),
        image_url: p.image || '',
      });
    });

    news.forEach((n) => {
      insertNews.run({
        id: n.id,
        date: n.date,
        title_pl: n.title?.pl || '',
        title_en: n.title?.en || '',
        short_desc_pl: n.shortDesc?.pl || '',
        short_desc_en: n.shortDesc?.en || '',
        full_desc_pl: n.fullDesc?.pl || '',
        full_desc_en: n.fullDesc?.en || '',
        links: toJson(n.links),
      });
    });

    partners.forEach((p, i) => {
      insertPartner.run({
        name: p.name,
        url: p.url || '',
        logo: p.logo || '',
        category: p.category || 'partner',
        sort_order: i,
      });
    });

    (heroSlides || []).forEach((slide, i) => {
      insertHero.run({
        sort_order: i + 1,
        label: slide.label || '',
        title: slide.title || '',
        image_path: slide.img || '',
      });
    });
  });

  tx();
  markMigrated();
  console.log(`[migrate] Imported ${members.length} members, ${projects.length} projects, ${news.length} news, ${partners.length} partners`);
}

if (process.argv[1]?.endsWith('migrate.js')) {
  const force = process.argv.includes('--force');
  runMigration(force);
}
