import {
  fetchContent, t, renderNav, renderFooter, initTheme, initNav,
  CLOUDINARY, probeImages, handleNewsImgError,
} from './core.js';

const id = location.pathname.split('/').pop();
document.getElementById('nav').innerHTML = renderNav('news');
document.getElementById('footer').innerHTML = renderFooter();
initTheme();
initNav();
window.handleNewsImgError = handleNewsImgError;

const { news } = await fetchContent();
const article = news.find((n) => n.id === id);
if (!article) { location.href = '/'; }

document.title = `${t(article.title)} | KN SPA i BLSPS`;

const mainImg = CLOUDINARY.news(id, 1600);
const gallery = await probeImages((i) =>
  `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_600/kn-spa-i-blsps/news/${id}/${i}.jpg`
);

let bodyHtml = t(article.fullDesc);
if (article.contentFormat === 'markdown' && typeof marked !== 'undefined') {
  bodyHtml = marked.parse(bodyHtml);
}

const links = (article.links || []).filter((l) => l.url).map((l) =>
  `<a href="${l.url}" target="_blank" rel="noopener" class="btn" style="margin:0.25rem">${t(l.label) || l.url}</a>`
).join('');

document.getElementById('content').innerHTML = `
  <header class="page-header">
    <p class="page-meta">TIMESTAMP: ${article.date}</p>
    <h1>${t(article.title)}</h1>
  </header>
  <div class="kn-card-img" style="height:clamp(240px,40vw,480px);margin-bottom:2rem;border:1px solid var(--hairline)">
    <img src="${mainImg}" alt="" style="width:100%;height:100%;object-fit:cover" onerror="handleNewsImgError(this,'${id}')">
  </div>
  <div class="prose">${bodyHtml}</div>
  ${links ? `<div style="margin:2rem 0">${links}</div>` : ''}
  ${gallery.length ? `
    <div class="section-title" style="margin-top:3rem"><span class="num">[G]</span><span class="text">Dokumentacja foto</span></div>
    <div class="gallery-grid" id="gallery"></div>` : ''}
`;

if (gallery.length) {
  const all = [mainImg, ...gallery.map((u) => u.replace('w_600', 'w_1600'))];
  document.getElementById('gallery').innerHTML = all.map((url, i) =>
    `<div class="gallery-item" data-idx="${i}"><img src="${url.replace('w_1600', 'w_600')}" alt="" loading="lazy"></div>`
  ).join('');

  const lb = document.getElementById('lightbox');
  document.getElementById('gallery').addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    document.getElementById('lb-img').src = all[item.dataset.idx];
    lb.classList.add('open');
  });
  document.getElementById('lb-close').onclick = () => lb.classList.remove('open');
  lb.onclick = (e) => { if (e.target === lb) lb.classList.remove('open'); };
}
