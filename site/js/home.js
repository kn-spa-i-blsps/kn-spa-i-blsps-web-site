import {
  fetchContent, t, getLang, renderNav, renderFooter, initTheme, initNav,
  CLOUDINARY, imgExists, handleMemberImgError, handleProjectImgError, handleNewsImgError,
} from './core.js';

const pl = getLang() === 'pl';

document.getElementById('nav').innerHTML = renderNav();
document.getElementById('footer').innerHTML = renderFooter();
initTheme();
initNav();

document.getElementById('news-title').textContent = pl ? 'Aktualności' : 'News';
document.getElementById('projects-title').textContent = pl ? 'Projekty' : 'Projects';
document.getElementById('team-title').textContent = pl ? 'Zespół' : 'Team';
document.getElementById('partners-title').textContent = pl ? 'Partnerzy i wsparcie' : 'Partners & Support';
document.getElementById('hero-title').textContent = pl
  ? 'Lotnicze systemy pomiarowe i automatyka'
  : 'Aerospace measurement systems & automation';
document.getElementById('hero-sub').textContent = pl
  ? 'Koło Naukowe SPA i BLSPS — projekty badawcze studentów UW i PW. Drony, AUV, systemy autonomiczne.'
  : 'Student Research Group SPA & BLSPS — research projects at UW and WUT. Drones, AUVs, autonomous systems.';

async function initHero() {
  const gallery = document.getElementById('hero-gallery');
  const dots = document.getElementById('hero-dots');
  const slides = [];
  const exts = ['jpg', 'jpeg', 'png', 'webp'];

  for (let i = 1; i <= 12; i++) {
    let found = false;
    for (const ext of exts) {
      const url = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_1200/kn-spa-i-blsps/main/${i}.${ext}`;
      if (await imgExists(url)) { slides.push(url); found = true; break; }
    }
    if (!found) break;
  }

  if (!slides.length) return;

  slides.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Hero ${i + 1}`;
    img.loading = i === 0 ? 'eager' : 'lazy';
    if (i === 0) img.classList.add('active');
    gallery.appendChild(img);

    const dot = document.createElement('button');
    dot.className = `hero-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  let current = 0;
  const imgs = gallery.querySelectorAll('img');
  const dotEls = dots.querySelectorAll('.hero-dot');

  function goTo(n) {
    imgs[current].classList.remove('active');
    dotEls[current].classList.remove('active');
    current = n;
    imgs[current].classList.add('active');
    dotEls[current].classList.add('active');
  }

  setInterval(() => goTo((current + 1) % slides.length), 7000);
}

function renderNews(news) {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = news.map((item, i) => `
    <a href="/news/${item.id}" class="kn-card">
      <div class="kn-card-img">
        <img src="${CLOUDINARY.news(item.id)}" alt="" loading="lazy" onerror="this.onerror=null;handleNewsImgError(this,'${item.id}')">
      </div>
      <div class="kn-card-body">
        <span class="kn-card-tag">${item.date}</span>
        <h3>${t(item.title)}</h3>
        <p>${t(item.shortDesc)}</p>
        <div class="kn-card-footer">READ_REPORT_0${i + 1} →</div>
      </div>
    </a>`).join('');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map((p, i) => {
    const href = p.id === 'bluespark' ? '/bluespark/' : `/project/${p.id}`;
    return `
    <a href="${href}" class="kn-card">
      <div class="kn-card-img">
        <img src="${CLOUDINARY.project(p.id)}" alt="" loading="lazy" onerror="handleProjectImgError(this)">
      </div>
      <div class="kn-card-body">
        <span class="kn-card-tag">SYS_0${i + 1}</span>
        <h3>${t(p.title)}</h3>
        <p>${t(p.shortDesc)}</p>
        <div class="kn-card-footer">DECRYPT_DATA →</div>
      </div>
    </a>`;
  }).join('');
}

function renderTeam(members, projects) {
  const colors = { musc: '#dc2626', flysearch: '#16a34a', bluespark: '#2563eb', 'hawk-eye': '#d97706', 'snows-eye': '#64748b' };
  const sorted = [...members].sort((a, b) => {
    const oa = Math.min(...projects.filter((p) => p.teamIds.includes(a.id)).map((p) => p.ordering || 999));
    const ob = Math.min(...projects.filter((p) => p.teamIds.includes(b.id)).map((p) => p.ordering || 999));
    return oa - ob;
  });

  document.getElementById('team-scroll').innerHTML = sorted.map((m) => {
    const badges = [
      ...(m.customTags || []).map((tag) => `<span class="badge" style="color:var(--accent)">${t(tag)}</span>`),
      ...projects.filter((p) => p.teamIds.includes(m.id)).map((p) =>
        `<span class="badge" style="color:${colors[p.id] || 'var(--fg-secondary)'}">${p.title}</span>`),
    ].join('');

    return `
    <a href="/member/${m.id}" class="kn-card team-card">
      <div class="kn-card-img">
        <img src="${CLOUDINARY.member(m.id)}" alt="${m.name}" loading="lazy"
          onerror="handleMemberImgError(this,'${m.id}')">
      </div>
      <div class="kn-card-body">
        <h3>${m.name}</h3>
        <span class="kn-card-tag">${t(m.role)}</span>
        <div style="margin-top:0.5rem">${badges}</div>
      </div>
    </a>`;
  }).join('');
}

function renderPartners(partners) {
  document.getElementById('partners-grid').innerHTML = partners.map((p) =>
    p.url
      ? `<a href="${p.url}" target="_blank" rel="noopener"><img src="${p.logo}" alt="${p.name}" class="partner-logo" loading="lazy"></a>`
      : `<img src="${p.logo}" alt="${p.name}" class="partner-logo" loading="lazy">`
  ).join('');
}

window.handleMemberImgError = handleMemberImgError;
window.handleProjectImgError = handleProjectImgError;
window.handleNewsImgError = handleNewsImgError;

try {
  const data = await fetchContent();
  renderNews(data.news);
  renderProjects(data.projects);
  renderTeam(data.members, data.projects);
  renderPartners(data.partners);
  initHero();
} catch (e) {
  console.error(e);
  document.getElementById('news-grid').innerHTML = '<p class="loading">Błąd ładowania danych</p>';
}
