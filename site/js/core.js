const API_BASE = '/api';

let contentCache = null;
let currentLang = localStorage.getItem('siteLang') || 'pl';

export function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[currentLang] || obj.pl || '';
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
  location.reload();
}

export async function fetchContent() {
  if (contentCache) return contentCache;
  const res = await fetch(`${API_BASE}/content`);
  if (!res.ok) throw new Error('Failed to load content');
  contentCache = await res.json();
  return contentCache;
}

export const CLOUDINARY = {
  member: (id, w = 800) =>
    `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_${w},c_limit/kn-spa-i-blsps/members/${id}.jpg`,
  memberFallback: (id) =>
    `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/${id}.jpeg`,
  memberDefault:
    'https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/default.jpg',
  project: (id, w = 800) =>
    `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_${w},c_limit/kn-spa-i-blsps/projects/${id}/main.jpg`,
  news: (id, w = 800) =>
    `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_${w},c_limit/kn-spa-i-blsps/news/${id}/main.jpg`,
  hero: (i, w = 1200) =>
    `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_${w}/kn-spa-i-blsps/main/${i}.jpg`,
  logo: 'https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/logo3.png',
};

export function imgExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function probeImages(baseFn, max = 15) {
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  const found = [];
  for (let i = 1; i <= max; i++) {
    let hit = false;
    for (const ext of exts) {
      const url = baseFn(i).replace('.jpg', `.${ext}`);
      if (await imgExists(url)) { found.push(url); hit = true; break; }
    }
    if (!hit) break;
  }
  return found;
}

export function handleMemberImgError(img, id) {
  if (!img.dataset.triedJpeg) { img.dataset.triedJpeg = '1'; img.src = CLOUDINARY.memberFallback(id); }
  else { img.onerror = null; img.src = CLOUDINARY.memberDefault; }
}

export function handleProjectImgError(img) {
  const src = img.src;
  if (src.includes('main.jpg')) img.src = src.replace('main.jpg', 'main.jpeg');
  else if (src.includes('main.jpeg')) img.src = src.replace('main.jpeg', 'main.png');
  else { img.onerror = null; img.style.display = 'none'; }
}

export function handleNewsImgError(img, id) {
  const src = img.src;
  if (src.includes('main.jpg')) img.src = CLOUDINARY.news(id).replace('main.jpg', 'main.jpeg');
  else if (src.includes('main.jpeg')) img.src = CLOUDINARY.news(id).replace('main.jpeg', 'main.png');
  else { img.onerror = null; }
}

export function initTheme() {
  if (localStorage.getItem('kn-theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  document.querySelectorAll('[data-theme-switch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('kn-theme', 'light'); }
      else { document.documentElement.setAttribute('data-theme', 'dark'); localStorage.setItem('kn-theme', 'dark'); }
    });
  });
}

export function initNav() {
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    const nav = document.querySelector('.nav-items');
    const open = nav?.classList.toggle('open');
    document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.lang-switch').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); if (el.dataset.lang) setLang(el.dataset.lang); });
  });
}

export function renderNav(active = '') {
  const L = currentLang === 'pl'
    ? { projects: 'Projekty', team: 'Zespół', contact: 'Kontakt', news: 'Aktualności' }
    : { projects: 'Projects', team: 'Team', contact: 'Contact', news: 'News' };

  return `
    <header class="site-nav">
      <div class="container nav-row">
        <a href="/" class="brand">
          <img src="${CLOUDINARY.logo}" alt="KN SPA i BLSPS" class="brand-mark" width="44" height="44" loading="eager">
          <span class="brand-text">
            <span class="brand-name">KN SPA i BLSPS</span>
            <span class="brand-org">${currentLang === 'pl' ? 'KOŁO NAUKOWE' : 'STUDENT RESEARCH GROUP'}</span>
          </span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
        <nav class="nav-items">
          <ul>
            <li><a href="/projects" class="${active === 'projects' ? 'active' : ''}"><span class="num">[01]</span><span>${L.projects}</span></a></li>
            <li><a href="/team" class="${active === 'team' ? 'active' : ''}"><span class="num">[02]</span><span>${L.team}</span></a></li>
            <li><a href="/#news" class="${active === 'news' ? 'active' : ''}"><span class="num">[03]</span><span>${L.news}</span></a></li>
            <li><a href="/contact" class="${active === 'contact' ? 'active' : ''}"><span class="num">[04]</span><span>${L.contact}</span></a></li>
          </ul>
          <div class="nav-aux">
            <button class="theme-switch" type="button" data-theme-switch aria-label="Theme">
              <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>
              <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <a href="#" class="lang-switch" data-lang="${currentLang === 'pl' ? 'en' : 'pl'}">
              <span class="${currentLang === 'pl' ? 'active' : ''}">PL</span><span class="sep">/</span><span class="${currentLang === 'en' ? 'active' : ''}">EN</span>
            </a>
          </div>
        </nav>
      </div>
    </header>`;
}

export function renderFooter() {
  const pl = currentLang === 'pl';
  return `
    <footer class="site-footer">
      <div class="container footer-row">
        <div>
          <img src="${CLOUDINARY.logo}" alt="Logo" width="80" height="80" style="margin-bottom:1rem" loading="lazy">
          <p style="font-size:0.85rem;color:var(--fg-secondary)">${pl ? 'Koło Naukowe SPA i BLSPS — UW & PW.' : 'Student Research Group SPA & BLSPS — UW & WUT.'}</p>
        </div>
        <div class="footer-links">
          <div class="footer-col"><h4>${pl ? 'Projekty' : 'Projects'}</h4><ul>
            <li><a href="/project/musc">MUSC</a></li><li><a href="/project/flysearch">Flysearch</a></li>
            <li><a href="/bluespark/">BlueSpark</a></li><li><a href="/project/hawk-eye">Hawk Eye</a></li>
          </ul></div>
          <div class="footer-col"><h4>${pl ? 'Zespół' : 'Team'}</h4><ul>
            <li><a href="/team">${pl ? 'Członkowie' : 'Members'}</a></li><li><a href="/contact">${pl ? 'Kontakt' : 'Contact'}</a></li>
          </ul></div>
          <div class="footer-col"><h4>Links</h4><ul>
            <li><a href="https://github.com/kn-spa-i-blsps" target="_blank" rel="noopener">GitHub</a></li>
          </ul></div>
        </div>
      </div>
      <div class="container footer-meta"><span>© ${new Date().getFullYear()} KN SPA i BLSPS</span><span>v2.0</span></div>
    </footer>`;
}
