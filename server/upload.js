import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const UPLOADS_ROOT = path.join(DATA_DIR, 'uploads', 'kn-spa-i-blsps');

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dsrdp5vrr';
const API_KEY = process.env.CLOUDINARY_API_KEY || '';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype?.startsWith('image/')) cb(null, true);
    else cb(new Error('Tylko pliki graficzne'));
  },
});

export function isCloudinaryConfigured() {
  return Boolean(API_KEY && API_SECRET);
}

export function getUploadsRoot() {
  return UPLOADS_ROOT;
}

function extFromMime(mimetype) {
  if (mimetype === 'image/png') return 'png';
  if (mimetype === 'image/webp') return 'webp';
  if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') return 'jpg';
  return 'jpg';
}

function signParams(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(sorted + API_SECRET).digest('hex');
}

async function uploadToCloudinary(buffer, { folder, publicId }) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder, timestamp };
  if (publicId) params.public_id = publicId;

  const signature = signParams(params);
  const form = new FormData();
  form.append('file', new Blob([buffer]), 'upload.jpg');
  form.append('api_key', API_KEY);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('folder', folder);
  if (publicId) form.append('public_id', publicId);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url;
}

function saveLocalUpload(buffer, relativePath) {
  const fullPath = path.join(UPLOADS_ROOT, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, buffer);
  return `/uploads/kn-spa-i-blsps/${relativePath.replace(/\\/g, '/')}`;
}

function buildRelativePath(category, entityId, role, index, ext) {
  if (category === 'news') {
    if (role === 'cover') return `news/${entityId}/main.${ext}`;
    const n = index || 1;
    return `news/${entityId}/${n}.${ext}`;
  }
  if (category === 'member') return `members/${entityId}.${ext}`;
  if (category === 'project') return `projects/${entityId}/main.${ext}`;
  throw new Error('Nieznana kategoria uploadu');
}

function cloudinaryTarget(category, entityId, role, index) {
  if (category === 'news') {
    const folder = `kn-spa-i-blsps/news/${entityId}`;
    if (role === 'cover') return { folder: `kn-spa-i-blsps/news`, publicId: `${entityId}/main` };
    return { folder: `kn-spa-i-blsps/news`, publicId: `${entityId}/${index || 1}` };
  }
  if (category === 'member') {
    return { folder: 'kn-spa-i-blsps/members', publicId: entityId };
  }
  if (category === 'project') {
    return { folder: 'kn-spa-i-blsps/projects', publicId: `${entityId}/main` };
  }
  throw new Error('Nieznana kategoria uploadu');
}

/** Zapisuje obraz na Cloudinary (jeśli skonfigurowane) lub lokalnie na dysku serwera. */
export async function persistImage(buffer, mimetype, { category, entityId, role = 'cover', index }) {
  if (!entityId) throw new Error('entityId jest wymagane');

  const ext = extFromMime(mimetype);
  const relativePath = buildRelativePath(category, entityId, role, index, ext);

  if (isCloudinaryConfigured()) {
    const { folder, publicId } = cloudinaryTarget(category, entityId, role, index);
    return uploadToCloudinary(buffer, { folder, publicId });
  }

  return saveLocalUpload(buffer, relativePath);
}

export function defaultNewsFolder(articleId) {
  return `kn-spa-i-blsps/news/${articleId}`;
}
