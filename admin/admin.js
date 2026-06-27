const API = '/api';
let token = localStorage.getItem('admin_token');
let currentEdit = null;
let currentType = null;
let cloudinaryEnabled = false;

async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...opts.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers, credentials: 'include' });
  if (res.status === 401 && !path.includes('/auth/login')) {
    logout();
    throw new Error('Unauthorized');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function toast(msg, isError = false) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show${isError ? ' error' : ''}`;
  setTimeout(() => el.classList.remove('show'), 3000);
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-layout').classList.remove('active');
}

async function showAdmin(username) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-layout').classList.add('active');
  document.getElementById('user-info').textContent = username;
  try {
    const cfg = await api('/admin/config');
    cloudinaryEnabled = cfg.cloudinaryUpload;
  } catch { /* ignore */ }
  loadAll();
}

async function checkAuth() {
  if (!token) return showLogin();
  try {
    const me = await api('/auth/me');
    showAdmin(me.username);
  } catch {
    showLogin();
  }
}

function logout() {
  token = null;
  localStorage.removeItem('admin_token');
  api('/auth/logout', { method: 'POST' }).catch(() => {});
  showLogin();
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const err = document.getElementById('login-error');
  err.style.display = 'none';
  try {
    const fd = new FormData(e.target);
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }),
    });
    token = data.token;
    localStorage.setItem('admin_token', token);
    showAdmin(fd.get('username'));
  } catch (ex) {
    err.textContent = ex.message || 'Błąd logowania';
    err.style.display = 'block';
  }
});

document.getElementById('logout-btn').addEventListener('click', (e) => { e.preventDefault(); logout(); });

// Navigation
document.querySelectorAll('.sidebar-nav a[data-section]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const section = a.dataset.section;
    document.querySelectorAll('.sidebar-nav a').forEach((x) => x.classList.remove('active'));
    a.classList.add('active');
    document.querySelectorAll('.section-panel').forEach((p) => p.classList.add('hidden'));
    document.getElementById(`section-${section}`).classList.remove('hidden');
  });
});

// Modal
const modal = document.getElementById('modal');
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-cancel').onclick = closeModal;

function openModal(title, html, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-form').innerHTML = html;
  modal.classList.add('open');
  currentEdit.onSave = onSave;
}

function closeModal() {
  modal.classList.remove('open');
  currentEdit = null;
  currentType = null;
}

document.getElementById('modal-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentEdit?.onSave) return;
  try {
    await currentEdit.onSave(new FormData(e.target));
    closeModal();
    loadAll();
    toast('Zapisano!');
  } catch (ex) {
    toast(ex.message, true);
  }
});

function bilingualFields(prefix, data = {}) {
  return `
    <div class="form-row">
      <div class="form-group"><label>${prefix} (PL)</label><textarea name="${prefix}_pl" class="tall">${data[`${prefix}_pl`] || ''}</textarea></div>
      <div class="form-group"><label>${prefix} (EN)</label><textarea name="${prefix}_en">${data[`${prefix}_en`] || ''}</textarea></div>
    </div>`;
}

// ─── Load tables ─────────────────────────────────────────────

async function loadAll() {
  await Promise.all([loadNews(), loadMembers(), loadProjects(), loadPartners()]);
}

async function loadNews() {
  const rows = await api('/admin/news');
  document.getElementById('news-table').innerHTML = rows.map((r) => `
    <tr>
      <td class="mono">${r.date}</td>
      <td>${r.title_pl}</td>
      <td class="mono" style="color:var(--fg-muted)">${r.id}</td>
      <td>
        <button class="btn btn-sm" onclick="editNews('${r.id}')">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('news','${r.id}')">Usuń</button>
      </td>
    </tr>`).join('');
}

async function loadMembers() {
  const rows = await api('/admin/members');
  document.getElementById('members-table').innerHTML = rows.map((r) => `
    <tr>
      <td>${r.name}</td>
      <td>${r.role_pl}</td>
      <td class="mono" style="color:var(--fg-muted)">${r.id}</td>
      <td>
        <button class="btn btn-sm" onclick="editMember('${r.id}')">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('members','${r.id}')">Usuń</button>
      </td>
    </tr>`).join('');
}

async function loadProjects() {
  const rows = await api('/admin/projects');
  document.getElementById('projects-table').innerHTML = rows.map((r) => `
    <tr>
      <td>${r.title}</td>
      <td class="mono" style="color:var(--fg-muted)">${r.id}</td>
      <td>${r.ordering}</td>
      <td>
        <button class="btn btn-sm" onclick="editProject('${r.id}')">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('projects','${r.id}')">Usuń</button>
      </td>
    </tr>`).join('');
}

async function loadPartners() {
  const rows = await api('/admin/partners');
  document.getElementById('partners-table').innerHTML = rows.map((r) => `
    <tr>
      <td>${r.name}</td>
      <td>${r.category}</td>
      <td>
        <button class="btn btn-sm" onclick="editPartner(${r.id})">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('partners',${r.id})">Usuń</button>
      </td>
    </tr>`).join('');
}

window.deleteItem = async (type, id) => {
  if (!confirm('Na pewno usunąć?')) return;
  await api(`/admin/${type}/${id}`, { method: 'DELETE' });
  loadAll();
  toast('Usunięto');
};

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function parseJsonField(val, fallback = []) {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val || '[]'); } catch { return fallback; }
}

function formatOptions(selected) {
  return [
    ['html', 'HTML — pełna kontrola tagów'],
    ['markdown', 'Markdown — nagłówki, listy, pogrubienie'],
    ['plain', 'Zwykły tekst — auto akapity'],
  ].map(([v, l]) => `<option value="${v}" ${selected === v ? 'selected' : ''}>${l}</option>`).join('');
}

function linkRowHTML(link = {}, idx = 0) {
  const label = link.label || {};
  return `
    <div class="link-row">
      <div class="form-row">
        <div class="form-group"><label>Etykieta PL</label><input class="link-label-pl" value="${esc(label.pl || '')}"></div>
        <div class="form-group"><label>Etykieta EN</label><input class="link-label-en" value="${esc(label.en || '')}"></div>
      </div>
      <div class="form-group"><label>URL *</label><input class="link-url" value="${esc(link.url || '')}" placeholder="https://"></div>
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.link-row').remove()">Usuń link</button>
    </div>`;
}

function linksEditorHTML(links) {
  const items = parseJsonField(links, []).filter((l) => l && l.url);
  const rows = items.length ? items.map((l, i) => linkRowHTML(l, i)).join('') : '';
  return `
    <div class="form-group">
      <label>Linki zewnętrzne (panel boczny artykułu)</label>
      <div id="links-list" class="links-list">${rows}</div>
      <button type="button" class="btn btn-sm" onclick="addLinkRow()" style="margin-top:0.5rem">+ Dodaj link</button>
    </div>`;
}

function mediaFieldsHTML(r = {}) {
  const gallery = parseJsonField(r.gallery, []);
  const hint = cloudinaryEnabled
    ? 'Upload bezpośrednio na Cloudinary lub wklej URL.'
    : 'Upload: ustaw CLOUDINARY_API_KEY i CLOUDINARY_API_SECRET na Renderze. Na razie wklejaj URL.';
  return `
    <div class="media-section">
      <p class="form-hint">${hint}</p>
      <div class="form-group">
        <label>Okładka (hero artykułu)</label>
        <input name="cover_image" id="cover-image-input" value="${esc(r.cover_image || '')}" placeholder="https://res.cloudinary.com/...">
        <div class="media-row">
          ${cloudinaryEnabled ? '<label class="btn btn-sm">Wgraj okładkę<input type="file" accept="image/*" id="cover-upload" hidden></label>' : ''}
          <img id="cover-preview" class="img-preview" src="${esc(r.cover_image || '')}" alt="">
        </div>
      </div>
      <div class="form-group">
        <label>Galeria zdjęć</label>
        <input type="hidden" name="gallery" id="gallery-json" value="${esc(JSON.stringify(gallery))}">
        <div id="gallery-previews" class="gallery-previews"></div>
        <div class="media-row" style="margin-top:0.5rem">
          ${cloudinaryEnabled ? '<label class="btn btn-sm">Dodaj zdjęcia<input type="file" accept="image/*" multiple id="gallery-upload" hidden></label>' : ''}
          <button type="button" class="btn btn-sm" onclick="addGalleryUrl()">+ Wklej URL</button>
        </div>
      </div>
    </div>`;
}

function articleFormHTML(r = {}, isNew = false) {
  return `
    <div class="form-row">
      <div class="form-group"><label>ID (slug) *</label><input name="id" ${isNew ? '' : 'disabled'} value="${esc(r.id || '')}" ${isNew ? 'required placeholder="moja-konferencja-2026"' : ''}></div>
      <div class="form-group"><label>Data *</label><input type="date" name="date" required value="${esc(r.date || new Date().toISOString().slice(0, 10))}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Tytuł PL *</label><input name="title_pl" required value="${esc(r.title_pl || '')}"></div>
      <div class="form-group"><label>Tytuł EN</label><input name="title_en" value="${esc(r.title_en || '')}"></div>
    </div>
    ${bilingualFields('short_desc', r)}
    <div class="form-group">
      <label>Format treści</label>
      <select name="content_format">${formatOptions(r.content_format || 'html')}</select>
    </div>
    ${bilingualFields('full_desc', r)}
    ${mediaFieldsHTML(r)}
    ${linksEditorHTML(r.links)}
    <div class="form-group"><label><input type="checkbox" name="published" value="1" ${r.published !== 0 ? 'checked' : ''}> Opublikowany</label></div>
    ${isNew ? '' : `<input type="hidden" name="_id" value="${esc(r.id)}">`}
  `;
}

function collectLinks() {
  return [...document.querySelectorAll('#links-list .link-row')].map((row) => ({
    label: {
      pl: row.querySelector('.link-label-pl')?.value || '',
      en: row.querySelector('.link-label-en')?.value || '',
    },
    url: row.querySelector('.link-url')?.value || '',
  })).filter((l) => l.url);
}

function getGalleryFromForm() {
  try { return JSON.parse(document.getElementById('gallery-json')?.value || '[]'); } catch { return []; }
}

function setGallery(urls) {
  document.getElementById('gallery-json').value = JSON.stringify(urls);
  renderGalleryPreviews(urls);
}

function renderGalleryPreviews(urls) {
  const el = document.getElementById('gallery-previews');
  if (!el) return;
  el.innerHTML = urls.map((url, i) => `
    <div class="gallery-thumb">
      <img src="${esc(url)}" alt="">
      <button type="button" onclick="removeGalleryImage(${i})" title="Usuń">×</button>
    </div>
  `).join('');
}

window.addLinkRow = () => {
  document.getElementById('links-list').insertAdjacentHTML('beforeend', linkRowHTML({}, Date.now()));
};

window.removeGalleryImage = (idx) => {
  const g = getGalleryFromForm();
  g.splice(idx, 1);
  setGallery(g);
};

window.addGalleryUrl = () => {
  const url = prompt('URL zdjęcia (Cloudinary lub inny):');
  if (!url) return;
  setGallery([...getGalleryFromForm(), url.trim()]);
};

function getArticleIdFromForm() {
  const idField = document.querySelector('#modal-form [name="id"]');
  if (idField && !idField.disabled && idField.value.trim()) return idField.value.trim();
  return document.querySelector('#modal-form [name="_id"]')?.value || currentEdit?.id;
}

async function uploadArticleImage(file, articleId, type, index) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('articleId', articleId);
  fd.append('type', type);
  if (index != null) fd.append('index', String(index));
  const res = await fetch(`${API}/admin/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include',
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data.url;
}

function initArticleMediaHandlers() {
  renderGalleryPreviews(getGalleryFromForm());
  const coverPreview = document.getElementById('cover-preview');
  const coverInput = document.getElementById('cover-image-input');
  if (coverInput && coverPreview) {
    coverInput.addEventListener('input', () => {
      coverPreview.src = coverInput.value;
      coverPreview.style.display = coverInput.value ? 'block' : 'none';
    });
  }

  document.getElementById('cover-upload')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    const articleId = getArticleIdFromForm();
    if (!file || !articleId) { toast('Najpierw podaj ID artykułu', true); return; }
    try {
      toast('Uploadowanie...');
      const url = await uploadArticleImage(file, articleId, 'cover');
      coverInput.value = url;
      coverPreview.src = url;
      coverPreview.style.display = 'block';
      toast('Okładka wgrana!');
    } catch (ex) { toast(ex.message, true); }
    e.target.value = '';
  });

  document.getElementById('gallery-upload')?.addEventListener('change', async (e) => {
    const files = [...(e.target.files || [])];
    const articleId = getArticleIdFromForm();
    if (!articleId) { toast('Najpierw podaj ID artykułu', true); return; }
    const gallery = getGalleryFromForm();
    let nextIndex = gallery.length + 1;
    for (const file of files) {
      try {
        toast(`Upload ${file.name}...`);
        const url = await uploadArticleImage(file, articleId, 'gallery', nextIndex);
        gallery.push(url);
        nextIndex += 1;
      } catch (ex) { toast(ex.message, true); }
    }
    setGallery(gallery);
    e.target.value = '';
  });
}

function collectNewsPayload(fd) {
  return {
    id: fd.get('id') || undefined,
    date: fd.get('date'),
    title_pl: fd.get('title_pl'),
    title_en: fd.get('title_en'),
    short_desc_pl: fd.get('short_desc_pl'),
    short_desc_en: fd.get('short_desc_en'),
    full_desc_pl: fd.get('full_desc_pl'),
    full_desc_en: fd.get('full_desc_en'),
    content_format: fd.get('content_format'),
    cover_image: document.getElementById('cover-image-input')?.value || fd.get('cover_image') || '',
    gallery: getGalleryFromForm(),
    links: collectLinks(),
    published: fd.get('published') === '1',
  };
}

// ─── News CRUD ───────────────────────────────────────────────

document.getElementById('add-news-btn').onclick = () => {
  currentEdit = {};
  currentType = 'news';
  openModal('Nowy artykuł', articleFormHTML({}, true), async (fd) => {
    await api('/admin/news', { method: 'POST', body: JSON.stringify(collectNewsPayload(fd)) });
  });
  setTimeout(initArticleMediaHandlers, 50);
};

window.editNews = async (id) => {
  const rows = await api('/admin/news');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  currentEdit = r;
  currentType = 'news';
  openModal(`Edytuj: ${r.title_pl}`, articleFormHTML(r, false), async (fd) => {
    await api(`/admin/news/${r.id}`, { method: 'PUT', body: JSON.stringify(collectNewsPayload(fd)) });
  });
  setTimeout(initArticleMediaHandlers, 50);
};

// ─── Members CRUD ────────────────────────────────────────────

document.getElementById('add-member-btn').onclick = () => {
  currentEdit = {};
  openModal('Nowy członek', `
    <div class="form-row">
      <div class="form-group"><label>Imię i nazwisko *</label><input name="name" required></div>
      <div class="form-group"><label>ID (slug)</label><input name="id" placeholder="jan-kowalski"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Rola PL</label><input name="role_pl"></div>
      <div class="form-group"><label>Rola EN</label><input name="role_en"></div>
    </div>
    ${bilingualFields('bio')}
    <div class="form-group"><label>Socials (JSON)</label><textarea name="socials" placeholder='[{"platform":"github","url":"https://..."}]'></textarea></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="sort_order" value="999"></div>
  `, async (fd) => {
    await api('/admin/members', {
      method: 'POST',
      body: JSON.stringify({
        id: fd.get('id') || undefined, name: fd.get('name'),
        role_pl: fd.get('role_pl'), role_en: fd.get('role_en'),
        bio_pl: fd.get('bio_pl'), bio_en: fd.get('bio_en'),
        socials: fd.get('socials') || '[]', sort_order: parseInt(fd.get('sort_order')) || 999,
      }),
    });
  });
};

window.editMember = async (id) => {
  const rows = await api('/admin/members');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${r.name}`, `
    <div class="form-group"><label>Imię</label><input name="name" required value="${esc(r.name)}"></div>
    <div class="form-row">
      <div class="form-group"><label>Rola PL</label><input name="role_pl" value="${esc(r.role_pl)}"></div>
      <div class="form-group"><label>Rola EN</label><input name="role_en" value="${esc(r.role_en)}"></div>
    </div>
    ${bilingualFields('bio', r)}
    <div class="form-group"><label>Socials (JSON)</label><textarea name="socials">${esc(r.socials)}</textarea></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="sort_order" value="${r.sort_order}"></div>
  `, async (fd) => {
    await api(`/admin/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: fd.get('name'), role_pl: fd.get('role_pl'), role_en: fd.get('role_en'),
        bio_pl: fd.get('bio_pl'), bio_en: fd.get('bio_en'),
        socials: fd.get('socials'), sort_order: parseInt(fd.get('sort_order')) || 999,
      }),
    });
  });
};

// ─── Projects CRUD ─────────────────────────────────────────────

document.getElementById('add-project-btn').onclick = () => {
  openModal('Nowy projekt', `
    <div class="form-row">
      <div class="form-group"><label>Nazwa *</label><input name="title" required></div>
      <div class="form-group"><label>ID</label><input name="id" placeholder="moj-projekt"></div>
    </div>
    <div class="form-group"><label>Pełny tytuł</label><input name="full_title"></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="ordering" value="999"></div>
    ${bilingualFields('short_desc')}
    ${bilingualFields('full_desc')}
    <div class="form-group"><label>Team IDs (JSON array)</label><textarea name="team_ids" placeholder='["jan-kowalski"]'></textarea></div>
  `, async (fd) => {
    await api('/admin/projects', {
      method: 'POST',
      body: JSON.stringify({
        id: fd.get('id') || undefined, title: fd.get('title'), full_title: fd.get('full_title'),
        ordering: parseInt(fd.get('ordering')) || 999,
        short_desc_pl: fd.get('short_desc_pl'), short_desc_en: fd.get('short_desc_en'),
        full_desc_pl: fd.get('full_desc_pl'), full_desc_en: fd.get('full_desc_en'),
        team_ids: fd.get('team_ids') || '[]',
      }),
    });
  });
};

window.editProject = async (id) => {
  const rows = await api('/admin/projects');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${r.title}`, `
    <div class="form-group"><label>Nazwa</label><input name="title" required value="${esc(r.title)}"></div>
    <div class="form-group"><label>Pełny tytuł</label><input name="full_title" value="${esc(r.full_title)}"></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="ordering" value="${r.ordering}"></div>
    ${bilingualFields('short_desc', r)}
    ${bilingualFields('full_desc', r)}
    <div class="form-group"><label>Team IDs (JSON)</label><textarea name="team_ids">${esc(r.team_ids)}</textarea></div>
  `, async (fd) => {
    await api(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: fd.get('title'), full_title: fd.get('full_title'),
        ordering: parseInt(fd.get('ordering')) || 999,
        short_desc_pl: fd.get('short_desc_pl'), short_desc_en: fd.get('short_desc_en'),
        full_desc_pl: fd.get('full_desc_pl'), full_desc_en: fd.get('full_desc_en'),
        team_ids: fd.get('team_ids'),
      }),
    });
  });
};

// ─── Partners CRUD ─────────────────────────────────────────────

document.getElementById('add-partner-btn').onclick = () => {
  openModal('Nowy partner', `
    <div class="form-group"><label>Nazwa *</label><input name="name" required></div>
    <div class="form-group"><label>URL</label><input name="url" type="url"></div>
    <div class="form-group"><label>Logo URL</label><input name="logo"></div>
    <div class="form-group"><label>Kategoria</label><select name="category"><option value="partner">Partner</option><option value="support">Wsparcie</option></select></div>
  `, async (fd) => {
    await api('/admin/partners', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(fd)),
    });
  });
};

window.editPartner = async (id) => {
  const rows = await api('/admin/partners');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${r.name}`, `
    <div class="form-group"><label>Nazwa</label><input name="name" required value="${esc(r.name)}"></div>
    <div class="form-group"><label>URL</label><input name="url" value="${esc(r.url)}"></div>
    <div class="form-group"><label>Logo URL</label><input name="logo" value="${esc(r.logo)}"></div>
    <div class="form-group"><label>Kategoria</label><select name="category"><option value="partner" ${r.category === 'partner' ? 'selected' : ''}>Partner</option><option value="support" ${r.category === 'support' ? 'selected' : ''}>Wsparcie</option></select></div>
  `, async (fd) => {
    await api(`/admin/partners/${id}`, { method: 'PUT', body: JSON.stringify(Object.fromEntries(fd)) });
  });
};

// ─── Settings ──────────────────────────────────────────────────

document.getElementById('password-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword: fd.get('currentPassword'),
        newPassword: fd.get('newPassword'),
      }),
    });
    toast('Hasło zmienione!');
    e.target.reset();
  } catch (ex) {
    toast(ex.message, true);
  }
});

checkAuth();
