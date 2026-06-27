import {
  fetchContent, t, renderNav, renderFooter, initTheme, initNav,
  CLOUDINARY, probeImages, handleProjectImgError, handleMemberImgError,
} from './core.js';

const id = location.pathname.split('/').pop();
document.getElementById('nav').innerHTML = renderNav('projects');
document.getElementById('footer').innerHTML = renderFooter();
initTheme();
initNav();
window.handleProjectImgError = handleProjectImgError;
window.handleMemberImgError = handleMemberImgError;

const { projects, members } = await fetchContent();
const project = projects.find((p) => p.id === id);
if (!project) { location.href = '/projects'; }

document.title = `${t(project.title)} | KN SPA i BLSPS`;

const team = members.filter((m) => project.teamIds.includes(m.id));
const gallery = await probeImages((i) => CLOUDINARY.project(id).replace('/main.jpg', `/${i}.jpg`));

document.getElementById('content').innerHTML = `
  <header class="page-header">
    <p class="page-meta">PROJECT // ${project.id.toUpperCase()}</p>
    <h1>${t(project.title)}</h1>
    ${project.fullTitle ? `<p style="color:var(--fg-secondary);margin-top:0.5rem">${project.fullTitle}</p>` : ''}
  </header>
  <div class="kn-card-img" style="height:400px;margin-bottom:2rem;border:1px solid var(--hairline)">
    <img src="${CLOUDINARY.project(id, 1600)}" alt="" style="width:100%;height:100%;object-fit:cover" onerror="handleProjectImgError(this)">
  </div>
  <div class="prose" style="margin-bottom:3rem">${t(project.fullDesc)}</div>
  ${gallery.length ? `<div class="section-title"><span class="num">[G]</span><span class="text">Galeria</span></div><div class="gallery-grid" id="gallery"></div>` : ''}
  ${team.length ? `
    <div class="section-title" style="margin-top:3rem"><span class="num">[T]</span><span class="text">Zespół</span></div>
    <div class="grid grid-3">${team.map((m) => `
      <a href="/member/${m.id}" class="kn-card">
        <div class="kn-card-img" style="height:200px"><img src="${CLOUDINARY.member(m.id)}" alt="" loading="lazy" onerror="handleMemberImgError(this,'${m.id}')"></div>
        <div class="kn-card-body"><h3>${m.name}</h3><span class="kn-card-tag">${t(m.role)}</span></div>
      </a>`).join('')}
    </div>` : ''}
`;

if (gallery.length) {
  const all = [CLOUDINARY.project(id, 1600), ...gallery.map((u) => u.replace('w_600', 'w_1600'))];
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
