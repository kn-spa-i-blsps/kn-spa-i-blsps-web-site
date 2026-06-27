import { fetchContent, t, renderNav, renderFooter, initTheme, initNav, CLOUDINARY, handleMemberImgError } from './core.js';

const id = location.pathname.split('/').pop();
document.getElementById('nav').innerHTML = renderNav('team');
document.getElementById('footer').innerHTML = renderFooter();
initTheme();
initNav();

const { members, projects } = await fetchContent();
const member = members.find((m) => m.id === id);
if (!member) { location.href = '/team'; }

document.title = `${member.name} | KN SPA i BLSPS`;

const socialIcons = { github: 'GitHub', linkedin: 'LinkedIn', instagram: 'Instagram', website: 'Web' };
const socials = (member.socials || []).filter((s) => s.url && !s.url.startsWith('#')).map((s) =>
  `<a href="${s.url}" target="_blank" rel="noopener" class="btn" style="margin:0.25rem">${socialIcons[s.platform] || s.platform}</a>`
).join('');

const memberProjects = projects.filter((p) => p.teamIds.includes(id));

document.getElementById('content').innerHTML = `
  <div style="display:grid;grid-template-columns:280px 1fr;gap:2rem;margin:3rem 0" class="member-layout">
    <div>
      <img src="${CLOUDINARY.member(id, 600)}" alt="${member.name}" style="width:100%;aspect-ratio:3/4;object-fit:cover;border:1px solid var(--hairline)"
        onerror="handleMemberImgError(this,'${id}')">
    </div>
    <div>
      <p class="page-meta">USER // ${id}</p>
      <h1 style="font-size:2rem;font-weight:700;text-transform:uppercase;margin:0.5rem 0">${member.name}</h1>
      <p class="kn-card-tag" style="font-size:0.85rem;margin-bottom:1.5rem">${t(member.role)}</p>
      <div class="prose">${t(member.bio)}</div>
      ${socials ? `<div style="margin-top:1.5rem">${socials}</div>` : ''}
      ${memberProjects.length ? `
        <div style="margin-top:2rem">
          <p class="page-meta">PROJECTS</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.5rem">
            ${memberProjects.map((p) => `<a href="/project/${p.id}" class="badge" style="text-decoration:none;padding:0.5rem 1rem">${p.title}</a>`).join('')}
          </div>
        </div>` : ''}
    </div>
  </div>
`;

window.handleMemberImgError = handleMemberImgError;
