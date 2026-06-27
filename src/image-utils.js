(function (global) {
  const CLOUD = 'dsrdp5vrr';
  const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;

  /** Kolejność próbowania — HEIC zaraz po JPG/JPEG (częste na iPhone). */
  const IMAGE_EXTENSIONS = [
    'jpg', 'jpeg', 'heic', 'heif', 'png', 'webp', 'avif', 'gif', 'bmp', 'tiff', 'tif', 'svg',
  ];

  function cldExt(relPath, ext, transforms = 'f_auto,q_auto') {
    return `${CLOUD_BASE}/${transforms}/kn-spa-i-blsps/${relPath}.${ext}`;
  }

  function cld(relPath, transforms = 'f_auto,q_auto', extIndex = 0) {
    return cldExt(relPath, IMAGE_EXTENSIONS[extIndex], transforms);
  }

  /** Cloudinary f_auto konwertuje HEIC do formatu obsługiwanego przez przeglądarkę. */
  function optimize(url, width) {
    if (!url) return url;
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      if (url.includes('f_auto')) {
        if (width && !new RegExp(`w_${width}\\b`).test(url)) {
          return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
        }
        return url;
      }
      const tw = width ? `f_auto,q_auto,w_${width},c_limit` : 'f_auto,q_auto';
      return url.replace('/upload/', `/upload/${tw}/`);
    }
    return url;
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

  global.Img = {
    EXT: IMAGE_EXTENSIONS,
    CLOUD_BASE,
    cld,
    cldExt,
    optimize,
    checkExists,
    probeSequential,
    onConventionError,
  };

  global.handleConventionImageError = (img, relPath, transforms, fallback) =>
    onConventionError(img, relPath, transforms, fallback);
})(window);
