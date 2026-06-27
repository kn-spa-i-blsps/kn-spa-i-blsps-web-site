export const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dsrdp5vrr';
export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;

export function cld(path, transforms = 'f_auto,q_auto') {
  return `${CLOUDINARY_BASE}/${transforms}/kn-spa-i-blsps/${path}`;
}

export function memberPhoto(id, w = 800) {
  return cld(`members/${id}.jpg`, `f_auto,q_auto,w_${w},c_limit`);
}

export function projectCover(id, w = 800) {
  return cld(`projects/${id}/main.jpg`, `f_auto,q_auto,w_${w},c_limit`);
}

export function projectLogo(id) {
  return cld(`projects/${id}/logo.jpg`, 'f_auto,q_auto,w_200');
}

export function newsCover(id, w = 800) {
  return cld(`news/${id}/main.jpg`, `f_auto,q_auto,w_${w},c_limit`);
}

export function heroImage(index, w = 1200) {
  return cld(`main/${index}.jpg`, `f_auto,q_auto,w_${w}`);
}

export function logo() {
  return cld('logo3.png', 'f_auto,q_auto');
}

export function galleryUrl(type, id, index, w = 600) {
  const folder = type === 'news' ? 'news' : 'projects';
  return cld(`${folder}/${id}/${index}.jpg`, `f_auto,q_auto,w_${w}`);
}

/** Placeholdery z data.js (Unsplash itd.) — nie powinny nadpisywać Cloudinary. */
export function isPlaceholderImage(url) {
  if (!url || !String(url).trim()) return true;
  const u = String(url).toLowerCase();
  return u.includes('images.unsplash.com')
    || u.includes('via.placeholder.com')
    || u.includes('placeholder.com');
}
