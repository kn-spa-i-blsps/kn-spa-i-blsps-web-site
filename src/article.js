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
  return typeof Img !== 'undefined' ? Img.srcForApiImage(url, width) || Img.optimize(url, width) : url;
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
  const hasCustomCover = Boolean(item.coverImage || (item.cover && !Img.isConventionUrl(item.cover, `news/${id}/main`)));
  const mainImgUrl = hasCustomCover
    ? optimizeImg(item.coverImage || item.cover, 1600)
    : fallbackCover;

  const mainImgEl = document.getElementById('article-main-img');
  if (mainImgEl) {
    mainImgEl.src = mainImgUrl;
    mainImgEl.dataset.customUrl = hasCustomCover ? '1' : '0';
    mainImgEl.onerror = function onCoverErr() {
      handleConventionImageError(this, `news/${id}/main`, 'f_auto,q_auto,w_1600', fallbackCover);
    };
    mainImgEl.onload = () => mainImgEl.classList.remove('opacity-0');
  }

  renderArticleLinks(item);
  await loadAndRenderGridGallery(item, id, mainImgUrl, fallbackCover);
}

async function loadAndRenderGridGallery(item, id, mainImgUrl, fallbackCover) {
  const gridContainer = document.getElementById('article-gallery-grid');
  const section = document.getElementById('article-gallery-section');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  allArticleImages = [];

  const dbGallery = (item.gallery || []).filter(Boolean).map((u) => optimizeImg(u, 1600));
  const coverUrl = optimizeImg(mainImgUrl, 1600) || fallbackCover;

  let images = [coverUrl];

  if (dbGallery.length > 0) {
    images.push(...dbGallery);
  } else {
    const probed = await Img.probeNumbered('news', id, { max: 15, width: 1600 });
    images.push(...probed);
  }

  images = [...new Set(images.filter(Boolean))];

  if (images.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }

  if (section) section.style.display = '';

  images.forEach((url, index) => {
    allArticleImages.push(url);
    const label = index === 0 ? 'MAIN_TRACK' : `DATA_NODE_${String(index).padStart(2, '0')}`;
    renderGridItem(url, id, index, label);
  });
}

function renderGridItem(url, articleId, lightboxIndex, label) {
  const gridContainer = document.getElementById('article-gallery-grid');
  const thumb = optimizeImg(url, 800);
  const full = optimizeImg(url, 1600);
  const slot = lightboxIndex === 0 ? 'main' : lightboxIndex;
  gridContainer.insertAdjacentHTML('beforeend', `
    <div class="sp-gallery-item" onclick="openLightbox(${lightboxIndex})">
      <img src="${thumb}" alt="" loading="lazy"
        data-full="${full}"
        data-slot="${slot}"
        onload="this.classList.remove('opacity-0')"
        onerror="handleConventionImageError(this, 'news/${articleId}/${slot}', 'f_auto,q_auto,w_800,c_limit', '')">
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
