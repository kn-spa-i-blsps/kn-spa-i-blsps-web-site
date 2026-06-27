import db from './db.js';
import { memberPhoto, projectCover, newsCover, isPlaceholderImage } from './cloudinary.js';

function parseJson(str, fallback = []) {
  try {
    return JSON.parse(str || '[]');
  } catch {
    return fallback;
  }
}

function bilingual(pl, en) {
  return { pl: pl || '', en: en || '' };
}

export function getAllContent() {
  const members = db.prepare('SELECT * FROM members ORDER BY sort_order, name').all().map(formatMember);
  const projects = db.prepare('SELECT * FROM projects ORDER BY ordering, title').all().map(formatProject);
  const news = db.prepare('SELECT * FROM news WHERE published = 1 ORDER BY date DESC').all().map(formatNews);
  const partners = db.prepare('SELECT * FROM partners ORDER BY sort_order, name').all().map(formatPartner);
  const heroSlides = db.prepare('SELECT * FROM hero_slides ORDER BY sort_order').all();

  return { members, projects, news, partners, heroSlides };
}

export function formatMember(row) {
  return {
    id: row.id,
    name: row.name,
    role: bilingual(row.role_pl, row.role_en),
    bio: bilingual(row.bio_pl, row.bio_en),
    customTags: parseJson(row.custom_tags).map((t) =>
      typeof t === 'string' ? { pl: t, en: t } : t
    ),
    socials: parseJson(row.socials),
    photo: row.photo_url || memberPhoto(row.id),
    photoUrl: row.photo_url || '',
  };
}

export function formatProject(row) {
  const customImage = row.image_url && !isPlaceholderImage(row.image_url) ? row.image_url : '';
  return {
    id: row.id,
    title: row.title,
    fullTitle: row.full_title,
    ordering: row.ordering,
    shortDesc: bilingual(row.short_desc_pl, row.short_desc_en),
    fullDesc: bilingual(row.full_desc_pl, row.full_desc_en),
    teamIds: parseJson(row.team_ids),
    spec: parseJson(row.spec),
    image: customImage || projectCover(row.id),
    imageUrl: customImage,
    cover: projectCover(row.id),
    logo: row.id,
  };
}

export function formatNews(row) {
  const gallery = parseJson(row.gallery);
  return {
    id: row.id,
    date: row.date,
    title: bilingual(row.title_pl, row.title_en),
    shortDesc: bilingual(row.short_desc_pl, row.short_desc_en),
    fullDesc: bilingual(row.full_desc_pl, row.full_desc_en),
    contentFormat: row.content_format || 'html',
    links: parseJson(row.links).filter((l) => l && l.url),
    cover: row.cover_image || newsCover(row.id),
    coverImage: row.cover_image || '',
    gallery,
    featured: !!row.featured,
  };
}

export function formatPartner(row) {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    logo: row.logo,
    category: row.category,
  };
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
