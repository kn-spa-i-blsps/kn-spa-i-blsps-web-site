import crypto from 'crypto';
import multer from 'multer';

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

function signParams(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(sorted + API_SECRET).digest('hex');
}

export async function uploadToCloudinary(buffer, { folder, publicId }) {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary nie skonfigurowane — ustaw CLOUDINARY_API_KEY i CLOUDINARY_API_SECRET');
  }

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

export function defaultNewsFolder(articleId) {
  return `kn-spa-i-blsps/news/${articleId}`;
}
