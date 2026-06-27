let allArticleImages = [];
let currentLightboxIndex = 0;

function formatArticleContent(item) {
  const raw = t(item.fullDesc);
  if (item.contentFormat === 'markdown' && typeof marked !== 'undefined') {
    return marked.parse(raw);
  }
  if (item.contentFormat === 'plain') {
    return raw.split(/\n\n+/).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  }
  return raw;
}

function optimizeImg(url, width) {
  return typeof Img !== 'undefined' ? Img.optimize(url, width) : url;
}

async function initArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get('id');
  if (!id && location.pathname.includes('/news/')) {
    id = location.pathname.split('/').filter(Boolean).pop();
  }
  const item = news.find((n) => n.id === id);

  if (!item) { window.location.href = '/'; return; }

  document.title = `${t(item.title)} | SPA & BLSPS`;
  document.getElementById('article-date').innerText = `TIMESTAMP: ${item.date}`;
  document.getElementById('article-title').innerText = t(item.title);
  document.getElementById('article-content').innerHTML = formatArticleContent(item);
  document.getElementById('article-content').classList.add('article-prose');

  const fallbackCover = Img.cld(`news/${id}/main`, 'f_auto,q_auto,w_1600');
  const mainImgUrl = optimizeImg(item.cover || item.coverImage || fallbackCover, 1600);

  const mainImgEl = document.getElementById('article-main-img');
  if (mainImgEl) {
    mainImgEl.src = mainImgUrl;
    mainImgEl.onerror = function onCoverErr() {
      handleConventionImageError(this, `news/${id}/main`, 'f_auto,q_auto,w_1600', fallbackCover);
    };
    mainImgEl.onload = () => mainImgEl.classList.remove('opacity-0');
  }

  renderArticleLinks(item);
  await loadAndRenderGridGallery(item, id, mainImgUrl);
}

async function loadAndRenderGridGallery(item, id, mainImgUrl) {
  const gridContainer = document.getElementById('article-gallery-grid');
  const section = document.getElementById('article-gallery-section');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  allArticleImages = [];

  const dbGallery = (item.gallery || []).filter(Boolean);
  let images = [];

  if (dbGallery.length > 0) {
    images = dbGallery.map((u) => optimizeImg(u, 1600));
  } else {
    images = [mainImgUrl];
    for (let i = 1; i <= 15; i++) {
      let found = false;
      for (const ext of Img.EXT) {
        const url = Img.cldExt(`news/${id}/${i}`, ext, 'f_auto,q_auto,w_600');
        if (await Img.checkExists(url)) {
          images.push(url.replace('w_600', 'w_1600'));
          found = true;
          break;
        }
      }
      if (!found) break;
    }
  }

  if (images.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }

  images.forEach((url, index) => {
    allArticleImages.push(url);
    renderGridItem(optimizeImg(url, 600), index, index === 0 ? 'MAIN_TRACK' : `DATA_NODE_0${index}`);
  });
}

function renderGridItem(url, lightboxIndex, label) {
  const gridContainer = document.getElementById('article-gallery-grid');
  gridContainer.insertAdjacentHTML('beforeend', `
    <div class="sp-gallery-item" onclick="openLightbox(${lightboxIndex})">
      <img src="${url}" alt="" class="opacity-0" onload="this.classList.remove('opacity-0')" loading="lazy">
      <div class="sp-gallery-overlay">
        <div class="text-[#038DAE] font-mono text-[9px] tracking-widest uppercase mb-1">VIEW_FULLRES</div>
        <div class="text-white font-bold text-xs uppercase italic tracking-tight">${label} // >></div>
      </div>
    </div>
  `);
}

function openLightbox(index) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  currentLightboxIndex = index;
  lb.classList.remove('hidden');
  lb.classList.add('flex');
  updateLightboxImage();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  }
  document.body.style.overflow = '';
}

function changeLightboxSlide(step) {
  currentLightboxIndex = (currentLightboxIndex + step + allArticleImages.length) % allArticleImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  if (!img) return;
  img.src = allArticleImages[currentLightboxIndex];
  if (counter) counter.innerText = `VISUAL_ARCHIVE_NODE: ${currentLightboxIndex + 1} / ${allArticleImages.length}`;
}

function renderArticleLinks(item) {
  const linksContainer = document.getElementById('article-links');
  if (!linksContainer) return;
  const validLinks = (item.links || []).filter((l) => l && l.url);
  if (validLinks.length > 0) {
    linksContainer.innerHTML = validLinks.map((link) => `
      <a href="${link.url}" target="_blank" rel="noopener" class="sp-resource-link group/link">
        <span class="label">${t(link.label) || link.url}</span>
        <span class="action group-hover/link:text-[#038DAE] transition-colors">ACCESS_RESOURCE // >></span>
      </a>
    `).join('');
  } else {
    linksContainer.innerHTML = `<div class="py-4 px-2 border border-dashed border-slate-200 text-center text-[11px] font-bold text-slate-400 tracking-widest uppercase italic">NO_RESOURCES</div>`;
  }
}


window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightboxSlide = changeLightboxSlide;
window.bootArticle = initArticle;
