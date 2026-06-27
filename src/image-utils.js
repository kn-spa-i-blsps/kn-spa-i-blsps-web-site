(function (global) {
  const CLOUD = 'dsrdp5vrr';
  const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;
  const FOLDER = 'kn-spa-i-blsps/';

  const IMAGE_EXTENSIONS = [
    'jpg', 'jpeg', 'heic', 'heif', 'png', 'webp', 'avif', 'gif', 'bmp', 'tiff', 'tif', 'svg',
  ];

  function cldExt(relPath, ext, transforms = 'f_auto,q_auto') {
    return `${CLOUD_BASE}/${transforms}/kn-spa-i-blsps/${relPath}.${ext}`;
  }

  function cld(relPath, transforms = 'f_auto,q_auto', extIndex = 0) {
    return cldExt(relPath, IMAGE_EXTENSIONS[extIndex], transforms);
  }

  /** Wyciąga ścieżkę publiczną z URL Cloudinary (bez transformacji). */
  function publicPath(url) {
    if (!url || !url.includes(FOLDER)) return null;
    return url.slice(url.indexOf(FOLDER));
  }

  /** Bezpiecznie podmienia transformacje — nie duplikuje f_auto,w_800 itd. */
  function optimize(url, width) {
    if (!url) return url;
    if (!url.includes('cloudinary.com') || !url.includes('/upload/')) return url;

    const pub = publicPath(url);
    if (!pub) return url;

    const uploadBase = url.slice(0, url.indexOf('/upload/') + '/upload/'.length);
    const transforms = width ? `f_auto,q_auto,w_${width},c_limit` : 'f_auto,q_auto';
    return `${uploadBase}${transforms}/${pub}`;
  }

  function isConventionUrl(url, relPath) {
    if (!url || !url.includes(FOLDER)) return false;
    const pub = publicPath(url);
    if (!pub) return false;
    const base = pub.replace(/\.[a-z0-9]+$/i, '');
    return base === `${FOLDER}${relPath}` || base.endsWith(`/${relPath}`);
  }

  function checkExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function probeSequential(buildUrl, max = 15) {
    const found = [];
    for (let i = 1; i <= max; i++) {
      let hit = false;
      for (const ext of IMAGE_EXTENSIONS) {
        const url = buildUrl(i, ext);
        if (await checkExists(url)) {
          found.push(url);
          hit = true;
          break;
        }
      }
      if (!hit) break;
    }
    return found;
  }

  function onConventionError(img, relPath, transforms, fallback) {
    const tried = parseInt(img.dataset.extIdx || '0', 10);
    const next = tried + 1;
    if (next < IMAGE_EXTENSIONS.length) {
      img.dataset.extIdx = String(next);
      img.src = cldExt(relPath, IMAGE_EXTENSIONS[next], transforms);
    } else {
      img.onerror = null;
      if (fallback) img.src = fallback;
      else if (img.dataset.hideOnFail === '1') img.parentElement?.classList.add('hidden');
    }
  }

  function onImageError(img, relPath, transforms, fallback) {
    if (img.dataset.customUrl === '1') {
      img.onerror = null;
      if (fallback) img.src = fallback;
      return;
    }
    onConventionError(img, relPath, transforms, fallback);
  }

  function isPlaceholderUrl(url) {
    if (!url || !String(url).trim()) return true;
    const u = String(url).toLowerCase();
    return u.includes('images.unsplash.com')
      || u.includes('via.placeholder.com')
      || u.includes('placeholder.com');
  }

  function projectCover(id, width = 900) {
    return cld(`projects/${id}/main`, `f_auto,q_auto,w_${width},c_limit`);
  }

  function resolveProjectImage(proj, id, width) {
    if (!proj?.image || isPlaceholderUrl(proj.image)) return projectCover(id, width);
    return srcForApiImage(proj.image, width) || projectCover(id, width);
  }

  global.Img = {
    EXT: IMAGE_EXTENSIONS,
    CLOUD_BASE,
    FOLDER,
    cld,
    cldExt,
    optimize,
    publicPath,
    isConventionUrl,
    checkExists,
    probeSequential,
    onConventionError,
    onImageError,
    isPlaceholderUrl,
    projectCover,
    resolveProjectImage,
    srcForApiImage,
  };

  global.handleConventionImageError = (img, relPath, transforms, fallback) =>
    onImageError(img, relPath, transforms, fallback);
})(window);
