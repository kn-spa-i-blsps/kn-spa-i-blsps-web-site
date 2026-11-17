const API = '/api';
let token = null;
localStorage.removeItem('admin_token');
let currentEdit = null;
let currentType = null;
let cloudinaryEnabled = false;
let uploadMode = 'local';

function isLoginRequest(path, opts = {}) {
  return path.includes('/auth/login') && (opts.method || 'GET') === 'POST';
}

async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...opts.headers };
  if (token && !isLoginRequest(path, opts)) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers, credentials: 'include' });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !path.includes('/auth/login')) {
    logout();
    throw new Error(data.error || 'Unauthorized');
  }
  if (!res.ok) throw new Error(data.error || `Błąd (${res.status})`);
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
  if(false){
    location.replace('/test/index.html');return;
  }
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-layout').classList.add('active');
  document.getElementById('user-info').textContent = username;
  try {
    const cfg = await api('/admin/config');
    cloudinaryEnabled = cfg.cloudinaryUpload;
    uploadMode = cfg.uploadMode || (cloudinaryEnabled ? 'cloudinary' : 'local');
  } catch { /* ignore */ }
  loadAll();
}

async function checkAuth() {
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
    token = null;
    localStorage.removeItem('admin_token');
    const fd = new FormData(e.target);
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: String(fd.get('username') || '').trim(),
        password: String(fd.get('password') || ''),
      }),
    });
    token = data.token;
    showAdmin(data.username || String(fd.get('username') || '').trim());
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
    if (section === 'messages') loadMessages().catch(ex => toast(ex.message, true));
  });
});

// Modal
const modal = document.getElementById('modal');
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-cancel').onclick = closeModal;

function openModal(title, html, onSave) {
  document.getElementById('modal-form').onchange=null;document.getElementById('modal-form').onclick=null;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-form').innerHTML = html;
  modal.classList.add('open');
  if (!currentEdit) currentEdit = {};
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
      <div class="form-group"><label>${prefix} (PL)</label><textarea name="${prefix}_pl" class="tall">${esc(data[`${prefix}_pl`] || '')}</textarea></div>
      <div class="form-group"><label>${prefix} (EN)</label><textarea name="${prefix}_en">${esc(data[`${prefix}_en`] || '')}</textarea></div>
    </div>`;
}

// ─── Load tables ─────────────────────────────────────────────

async function loadAll() {
  await Promise.all([loadNews(), loadMembers(), loadProjects(), loadPartners(), loadMessages(), loadSiteEditor()]);
}

async function loadNews() {
  const rows = await api('/admin/news');
  document.getElementById('news-table').innerHTML = rows.map((r) => `
    <tr>
      <td class="mono">${r.date}</td>
      <td>${r.featured ? '<span title="Wyróżniony na stronie głównej">★</span> ' : ''}${esc(r.title_pl)}</td>
      <td class="mono" style="color:var(--fg-muted)">${r.id}</td>
      <td>
        <button type="button" class="btn btn-sm ${r.featured ? 'btn-primary' : ''}" title="Wyróżnij na stronie głównej" onclick="toggleNewsFeatured('${r.id}')">${r.featured ? '★' : '☆'}</button>
        <button class="btn btn-sm" onclick="editNews('${r.id}')">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('news','${r.id}')">Usuń</button>
      </td>
    </tr>`).join('');
}

async function loadMembers() {
  const rows = await api('/admin/members');
  document.getElementById('members-table').innerHTML = rows.map((r) => `
    <tr>
      <td>${esc(r.name)}</td>
      <td>${esc(r.role_pl)}</td>
      <td class="mono" style="color:var(--fg-muted)">${r.id}</td>
      <td>
        <button class="btn btn-sm" onclick="editMember('${r.id}')">Edytuj</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('members','${r.id}')">Usuń</button>
      </td>
    </tr>`).join('');
}

async function loadProjects() {
  const rows = await api('/admin/projects');
  projectChoices=rows;
  document.getElementById('projects-table').innerHTML = rows.map((r) => `
    <tr>
      <td>${esc(r.title)}</td>
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
      <td>${esc(r.name)}</td>
      <td>${esc(r.category)}</td>
      <td>${r.sort_order}</td>
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
  return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
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
  const label = typeof link.label === 'string' ? {pl:link.label,en:link.label} : link.label || {};
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
    ? 'Wgraj plik z dysku (trafi na Cloudinary) lub wklej URL.'
    : 'Wgraj plik z dysku (zapis na serwerze — wymaga Persistent Disk na Render) lub wklej URL Cloudinary.';
  return `
    <div class="media-section">
      <p class="form-hint">${hint}</p>
      <div class="form-group">
        <label>Okładka (hero artykułu)</label>
        <input name="cover_image" id="cover-image-input" value="${esc(r.cover_image || '')}" placeholder="https://... lub /uploads/...">
        <div class="media-row">
          <label class="btn btn-sm">Wgraj okładkę<input type="file" accept="image/*,.heic,.heif" id="cover-upload" hidden></label>
          <img id="cover-preview" class="img-preview" src="${esc(r.cover_image || '')}" alt="">
        </div>
      </div>
      <div class="form-group">
        <label>Galeria zdjęć</label>
        <input type="hidden" name="gallery" id="gallery-json" value="${esc(JSON.stringify(gallery))}">
        <div id="gallery-previews" class="gallery-previews"></div>
        <div class="media-row" style="margin-top:0.5rem">
          <label class="btn btn-sm">Dodaj zdjęcia<input type="file" accept="image/*,.heic,.heif" multiple id="gallery-upload" hidden></label>
          <button type="button" class="btn btn-sm" onclick="addGalleryUrl()">+ Wklej URL</button>
        </div>
      </div>
    </div>`;
}

function memberPhotoFieldHTML(r = {}) {
  return `
    <div class="form-group">
      <label>Zdjęcie członka</label>
      <input name="photo_url" id="member-photo-input" value="${esc(r.photo_url || '')}" placeholder="https://... lub /uploads/...">
      <p class="form-hint">Najpierw ustaw ID (slug), potem wgraj plik.</p>
      <div class="media-row">
        <label class="btn btn-sm">Wgraj zdjęcie<input type="file" accept="image/*,.heic,.heif" id="member-photo-upload" hidden></label>
        <img id="member-photo-preview" class="img-preview" src="${esc(r.photo_url || '')}" alt="">
      </div>
    </div>`;
}

function projectImageFieldHTML(r = {}) {
  return `
    <div class="form-group">
      <label>Okładka projektu (main)</label>
      <input name="image_url" id="project-image-input" value="${esc(r.image_url || '')}" placeholder="https://... lub /uploads/...">
      <div class="media-row">
        <label class="btn btn-sm">Wgraj okładkę<input type="file" accept="image/*,.heic,.heif" id="project-image-upload" hidden></label>
        <img id="project-image-preview" class="img-preview" src="${esc(r.image_url || '')}" alt="">
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
    <div class="form-group"><label>Projekt / kategoria</label><select name="project_id">${projectOptions(r.project_id||'kn')}</select></div>
    ${bilingualFields('short_desc', r)}
    <div class="form-group">
      <label>Format treści</label>
      <select name="content_format">${formatOptions(r.content_format || 'html')}</select>
    </div>
    ${bilingualFields('full_desc', r)}
    ${mediaFieldsHTML(r)}
    ${linksEditorHTML(r.links)}
    <div class="form-group"><label><input type="checkbox" name="featured" value="1" ${r.featured ? 'checked' : ''}> Wyróżniony na stronie głównej (duża karta / siatka)</label></div>
    <p class="form-hint" style="margin-top:-0.5rem;margin-bottom:1rem;font-size:12px;color:var(--fg-muted)">Możesz wyróżnić kilka artykułów (np. 3) — pojawią się u góry sekcji Aktualności. Badge <strong>LATEST</strong> zawsze na najnowszym po dacie. Szybka gwiazdka: ☆/★ w tabeli.</p>
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

async function uploadMediaFile(file, { category, entityId, role, index }) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('category', category);
  fd.append('entityId', entityId);
  fd.append('role', role);
  if (category === 'news') {
    fd.append('articleId', entityId);
    fd.append('type', role);
  }
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

async function uploadArticleImage(file, articleId, type, index) {
  return uploadMediaFile(file, { category: 'news', entityId: articleId, role: type, index });
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

function initMemberPhotoHandlers(memberId) {
  const input = document.getElementById('member-photo-input');
  const preview = document.getElementById('member-photo-preview');
  const upload = document.getElementById('member-photo-upload');
  input?.addEventListener('input', () => {
    if (preview) preview.src = input.value;
  });
  upload?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    const id = memberId || document.querySelector('#modal-form [name="id"]')?.value?.trim();
    if (!file || !id) { toast('Najpierw podaj ID członka', true); return; }
    try {
      toast('Uploadowanie...');
      const url = await uploadMediaFile(file, { category: 'member', entityId: id, role: 'main' });
      input.value = url;
      if (preview) preview.src = url;
      toast('Zdjęcie wgrane!');
    } catch (ex) { toast(ex.message, true); }
    e.target.value = '';
  });
}

function initProjectImageHandlers(projectId) {
  const input = document.getElementById('project-image-input');
  const preview = document.getElementById('project-image-preview');
  const upload = document.getElementById('project-image-upload');
  input?.addEventListener('input', () => {
    if (preview) preview.src = input.value;
  });
  upload?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    const id = projectId || document.querySelector('#modal-form [name="id"]')?.value?.trim();
    if (!file || !id) { toast('Najpierw podaj ID projektu', true); return; }
    try {
      toast('Uploadowanie...');
      const url = await uploadMediaFile(file, { category: 'project', entityId: id, role: 'main' });
      input.value = url;
      if (preview) preview.src = url;
      toast('Okładka wgrana!');
    } catch (ex) { toast(ex.message, true); }
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
    featured: fd.get('featured') === '1',
    project_id: fd.get('project_id')||'kn',
  };
}

function newsRowToPayload(r, overrides = {}) {
  return {
    date: r.date,
    title_pl: r.title_pl,
    title_en: r.title_en || '',
    short_desc_pl: r.short_desc_pl || '',
    short_desc_en: r.short_desc_en || '',
    full_desc_pl: r.full_desc_pl || '',
    full_desc_en: r.full_desc_en || '',
    content_format: r.content_format || 'html',
    cover_image: r.cover_image || '',
    gallery: parseJsonField(r.gallery),
    links: parseJsonField(r.links),
    published: r.published !== 0,
    featured: !!r.featured,
    project_id: r.project_id||'kn',
    ...overrides,
  };
}

window.toggleNewsFeatured = async (id) => {
  const rows = await api('/admin/news');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  await api(`/admin/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newsRowToPayload(r, { featured: !r.featured })),
  });
  loadNews();
  toast(r.featured ? 'Usunięto wyróżnienie' : 'Dodano wyróżnienie ★');
};

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
  openModal(`Edytuj: ${esc(r.title_pl)}`, articleFormHTML(r, false), async (fd) => {
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
    ${memberPhotoFieldHTML()}
    <div class="form-group"><label>Socials (JSON)</label><textarea name="socials" placeholder='[{"platform":"github","url":"https://..."}]'></textarea></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="sort_order" value="999"></div>
  `, async (fd) => {
    await api('/admin/members', {
      method: 'POST',
      body: JSON.stringify({
        id: fd.get('id') || undefined, name: fd.get('name'),
        role_pl: fd.get('role_pl'), role_en: fd.get('role_en'),
        bio_pl: fd.get('bio_pl'), bio_en: fd.get('bio_en'),
        photo_url: fd.get('photo_url') || '',
        socials: fd.get('socials') || '[]', sort_order: parseInt(fd.get('sort_order')) || 999,
      }),
    });
  });
  setTimeout(() => initMemberPhotoHandlers(), 50);
};

window.editMember = async (id) => {
  const rows = await api('/admin/members');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${esc(r.name)}`, `
    <div class="form-group"><label>Imię</label><input name="name" required value="${esc(r.name)}"></div>
    <div class="form-row">
      <div class="form-group"><label>Rola PL</label><input name="role_pl" value="${esc(r.role_pl)}"></div>
      <div class="form-group"><label>Rola EN</label><input name="role_en" value="${esc(r.role_en)}"></div>
    </div>
    ${bilingualFields('bio', r)}
    ${memberPhotoFieldHTML(r)}
    <div class="form-group"><label>Socials (JSON)</label><textarea name="socials">${esc(r.socials)}</textarea></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="sort_order" value="${r.sort_order}"></div>
  `, async (fd) => {
    await api(`/admin/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: fd.get('name'), role_pl: fd.get('role_pl'), role_en: fd.get('role_en'),
        bio_pl: fd.get('bio_pl'), bio_en: fd.get('bio_en'),
        photo_url: fd.get('photo_url') || '',
        socials: fd.get('socials'), sort_order: parseInt(fd.get('sort_order')) || 999,
      }),
    });
  });
  setTimeout(() => initMemberPhotoHandlers(id), 50);
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
    ${projectImageFieldHTML()}
    <div class="form-group"><label>Team IDs (JSON array)</label><textarea name="team_ids" placeholder='["jan-kowalski"]'></textarea></div>
  `, async (fd) => {
    await api('/admin/projects', {
      method: 'POST',
      body: JSON.stringify({
        id: fd.get('id') || undefined, title: fd.get('title'), full_title: fd.get('full_title'),
        ordering: parseInt(fd.get('ordering')) || 999,
        short_desc_pl: fd.get('short_desc_pl'), short_desc_en: fd.get('short_desc_en'),
        full_desc_pl: fd.get('full_desc_pl'), full_desc_en: fd.get('full_desc_en'),
        image_url: fd.get('image_url') || '',
        team_ids: fd.get('team_ids') || '[]',
      }),
    });
  });
  setTimeout(() => initProjectImageHandlers(), 50);
};

window.editProject = async (id) => {
  const rows = await api('/admin/projects');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${esc(r.title)}`, `
    <div class="form-group"><label>Nazwa</label><input name="title" required value="${esc(r.title)}"></div>
    <div class="form-group"><label>Pełny tytuł</label><input name="full_title" value="${esc(r.full_title)}"></div>
    <div class="form-group"><label>Kolejność</label><input type="number" name="ordering" value="${r.ordering}"></div>
    ${bilingualFields('short_desc', r)}
    ${bilingualFields('full_desc', r)}
    ${projectImageFieldHTML(r)}
    <div class="form-group"><label>Team IDs (JSON)</label><textarea name="team_ids">${esc(r.team_ids)}</textarea></div>
  `, async (fd) => {
    await api(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: fd.get('title'), full_title: fd.get('full_title'),
        ordering: parseInt(fd.get('ordering')) || 999,
        short_desc_pl: fd.get('short_desc_pl'), short_desc_en: fd.get('short_desc_en'),
        full_desc_pl: fd.get('full_desc_pl'), full_desc_en: fd.get('full_desc_en'),
        image_url: fd.get('image_url') || '',
        team_ids: fd.get('team_ids'),
      }),
    });
  });
  setTimeout(() => initProjectImageHandlers(id), 50);
};

// ─── Partners CRUD ─────────────────────────────────────────────

document.getElementById('add-partner-btn').onclick = () => {
  openModal('Nowy partner', `
    <div class="form-group"><label>Nazwa *</label><input name="name" required></div>
    <div class="form-group"><label>URL</label><input name="url" type="url"></div>
    <div class="form-group"><label>Logo URL</label><input name="logo"></div>
    <div class="form-group"><label>Kategoria</label><select name="category"><option value="partner">Partner</option><option value="support">Wsparcie</option></select></div>
    <div class="form-group"><label>Kolejność</label><input name="sort_order" type="number" value="999"></div>
  `, async (fd) => {
    const body = Object.fromEntries(fd);
    body.sort_order = parseInt(body.sort_order, 10) || 999;
    await api('/admin/partners', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  });
};

window.editPartner = async (id) => {
  const rows = await api('/admin/partners');
  const r = rows.find((x) => x.id === id);
  if (!r) return;
  openModal(`Edytuj: ${esc(r.name)}`, `
    <div class="form-group"><label>Nazwa</label><input name="name" required value="${esc(r.name)}"></div>
    <div class="form-group"><label>URL</label><input name="url" value="${esc(r.url)}"></div>
    <div class="form-group"><label>Logo URL</label><input name="logo" value="${esc(r.logo)}"></div>
    <div class="form-group"><label>Kategoria</label><select name="category"><option value="partner" ${r.category === 'partner' ? 'selected' : ''}>Partner</option><option value="support" ${r.category === 'support' ? 'selected' : ''}>Wsparcie</option></select></div>
    <div class="form-group"><label>Kolejność</label><input name="sort_order" type="number" value="${r.sort_order ?? 999}"></div>
  `, async (fd) => {
    const body = Object.fromEntries(fd);
    body.sort_order = parseInt(body.sort_order, 10) || 999;
    await api(`/admin/partners/${id}`, { method: 'PUT', body: JSON.stringify(body) });
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


// Contact inbox. Render submitted text as escaped content, never HTML.
let messageOffset = 0;
const MESSAGE_PAGE_SIZE = 25;
async function loadMessages() {
  const result = await api(`/admin/messages?limit=${MESSAGE_PAGE_SIZE}&offset=${messageOffset}`);
  if (messageOffset && messageOffset >= result.total) { messageOffset = 0; return loadMessages(); }
  const badge = document.getElementById('messages-badge');
  badge.textContent = String(result.unread); badge.hidden = result.unread === 0;
  document.getElementById('messages-summary').textContent = `${result.total} wiadomości · ${result.unread} nieprzeczytanych`;
  document.getElementById('messages-list').innerHTML = result.items.length ? result.items.map(row => `
    <article class="message-card${row.is_read ? '' : ' unread'}">
      <div class="message-header"><h3>${esc(row.subject)}</h3><span>${row.is_read ? 'Przeczytana' : 'Nowa'}</span></div>
      <p class="message-meta"><strong>${esc(row.name)}</strong> · <a href="mailto:${encodeURIComponent(row.email)}">${esc(row.email)}</a> · ${esc(new Date(row.created_at).toLocaleString('pl-PL'))}</p>
      <p class="message-body">${esc(row.message)}</p>
      <div class="message-actions"><button type="button" class="btn" data-message-id="${row.id}" data-message-read="${row.is_read ? 'false' : 'true'}">${row.is_read ? 'Oznacz jako nieprzeczytaną' : 'Oznacz jako przeczytaną'}</button><a class="btn" href="mailto:${encodeURIComponent(row.email)}">Odpowiedz e-mailem</a><button type="button" class="btn" data-message-id="${row.id}" data-message-delete="true">Usuń</button></div>
    </article>`).join('') : '<p class="messages-empty">Nie ma jeszcze wiadomości z formularza.</p>';
  document.getElementById('messages-prev').disabled = messageOffset === 0;
  document.getElementById('messages-next').disabled = messageOffset + MESSAGE_PAGE_SIZE >= result.total;
  document.getElementById('messages-page').textContent = result.total ? `${messageOffset + 1}–${Math.min(messageOffset + MESSAGE_PAGE_SIZE, result.total)} z ${result.total}` : '0';
}
document.getElementById('messages-refresh').addEventListener('click', () => loadMessages().catch(ex => toast(ex.message, true)));
document.getElementById('messages-prev').addEventListener('click', () => { messageOffset = Math.max(0, messageOffset - MESSAGE_PAGE_SIZE); loadMessages().catch(ex => toast(ex.message, true)); });
document.getElementById('messages-next').addEventListener('click', () => { messageOffset += MESSAGE_PAGE_SIZE; loadMessages().catch(ex => toast(ex.message, true)); });
document.getElementById('messages-list').addEventListener('click', async event => {
  const button = event.target.closest('button[data-message-id]'); if (!button) return;
  if (button.dataset.messageDelete && !confirm('Usunąć tę wiadomość? Tej operacji nie można cofnąć.')) return;
  button.disabled = true;
  try {
    await api(`/admin/messages/${button.dataset.messageId}`, button.dataset.messageDelete ? { method: 'DELETE' } : { method: 'PATCH', body: JSON.stringify({ is_read: button.dataset.messageRead === 'true' }) });
    await loadMessages();
  } catch (ex) { toast(ex.message, true); button.disabled = false; }
});

// Redesign editors: all values below feed the same database as the public site.
let projectChoices=[];
const inputField=(label,name,value='',type='text')=>`<div class="form-group"><label>${esc(label)}</label><input type="${type}" name="${esc(name)}" value="${esc(value)}"></div>`;
const textField=(label,name,value='')=>`<div class="form-group"><label>${esc(label)}</label><textarea name="${esc(name)}" class="tall">${esc(value)}</textarea></div>`;
const pairFields=(label,prefix,data={})=>`<div class="form-row">${textField(label+' PL',prefix+'_pl',data[prefix+'_pl']||'')}${textField(label+' EN',prefix+'_en',data[prefix+'_en']||'')}</div>`;
const checkboxField=(label,name,value=true)=>`<div class="form-group"><label><input type="checkbox" name="${esc(name)}" ${value?'checked':''}> ${esc(label)}</label></div>`;
const mediaField=(label,name,value='',video=false)=>`${inputField(label,name,value)}<label class="btn btn-sm">Wgraj ${video?'film':'obraz'} do Cloudinary<input type="file" hidden data-upload-field="${esc(name)}" accept="${video?'video/mp4,video/webm':'image/*,.heic,.heif'}"></label><p class="form-hint">Po przesłaniu pliku zapisz formularz.</p>`;
function projectOptions(value='kn'){return `<option value="kn" ${value==='kn'?'selected':''}>KN SPA</option>`+projectChoices.map(p=>`<option value="${esc(p.id)}" ${value===p.id?'selected':''}>${esc(p.title)}</option>`).join('');}
function aboutRow(a={}){return `<fieldset class="editor-row project-about"><legend>Sekcja opisu</legend>${pairFields('Nagłówek','heading',a)}${pairFields('Treść','text',a)}<button type="button" class="btn btn-sm" data-remove-row>Usuń sekcję</button></fieldset>`;}
function photoRow(p={},layout=false){return `<fieldset class="editor-row photo-row">${mediaField('URL zdjęcia','photo-url',p.url||'')}${inputField('Podpis PL','caption_pl',p.caption_pl||'')}${inputField('Podpis EN','caption_en',p.caption_en||'')}${layout?inputField('Rozmiar w siatce (np. w2 h2)','layout',p.layout||''):''}<button type="button" class="btn btn-sm" data-remove-row>Usuń zdjęcie</button></fieldset>`;}
function readPhotos(container){return [...document.querySelectorAll(container+' .photo-row')].map(row=>({url:row.querySelector('[name="photo-url"]').value,caption_pl:row.querySelector('[name="caption_pl"]').value,caption_en:row.querySelector('[name="caption_en"]').value,layout:row.querySelector('[name="layout"]')?.value||''})).filter(p=>p.url);}
function getModalId(){
 const form=document.getElementById('modal-form'),id=form.querySelector('[name="id"]');
 if(id&&!id.value){const source=form.querySelector('[name="name"],[name="title"]')?.value||'';id.value=source.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(!id.value)throw Error('Najpierw podaj nazwę lub ID');}
 return id?.value||currentEdit?.id||'website';
}
function bindEnhancedUploads(category){
 const form=document.getElementById('modal-form');
 form.onchange=async event=>{
  const fileInput=event.target;if(!fileInput.matches('[data-upload-field]')||!fileInput.files?.length)return;
  const field=fileInput.dataset.uploadField;
  const scope=fileInput.closest('.photo-row')||form;
  const urlInput=scope.querySelector(`[name="${field}"]`);
  const save=document.getElementById('modal-save');save.disabled=true;fileInput.disabled=true;
  try{
   const role=fileInput.closest('.photo-row')?'gallery':field.replace(/_/g,'-');
   const url=await uploadMediaFile(fileInput.files[0],{category,entityId:getModalId(),role,index:Date.now()});
   urlInput.value=url;
   if(category==='member'){const show=form.querySelector('[name="show_photo"]');if(show)show.checked=true;}
   toast('Plik w Cloudinary. Zapisz formularz.');
  }catch(ex){toast(ex.message,true);}finally{save.disabled=false;fileInput.disabled=false;fileInput.value='';}
 };
 form.onclick=event=>{
  const remove=event.target.closest('[data-remove-row]');if(remove){remove.closest('fieldset').remove();return;}
  const add=event.target.closest('[data-add-row]');if(!add)return;
  const target=form.querySelector('#'+add.dataset.addRow);
  target.insertAdjacentHTML('beforeend',add.dataset.kind==='about'?aboutRow():photoRow({},add.dataset.layout==='true'));
 };
}
async function editRedesignMember(id){
 const [rows,projects,site]=await Promise.all([api('/admin/members'),api('/admin/projects'),api('/admin/site')]);
 const r=id?rows.find(r=>r.id===id):{};if(!r)return;currentEdit=r;
 const assigned=parseJsonField(r.assignments);const groups=[...site.groups];for(const p of projects)if(!groups.some(g=>g.id===p.id))groups.push({id:p.id,g:p.title});
 openModal(id?'Edytuj: '+r.name:'Nowy członek',`
 ${inputField('Imię i nazwisko','name',r.name)}${!id?inputField('ID (np. jan-kowalski)','id'):''}
 ${inputField('Główna rola PL','role_pl',r.role_pl)}${inputField('Główna rola EN','role_en',r.role_en)}
 ${checkboxField('Widoczny w zespole','is_active',r.is_active!==0)}${checkboxField('Pokazuj zdjęcie','show_photo',r.show_photo!==0)}
 ${mediaField('Zdjęcie','photo_url',r.photo_url||'')}
 <h3>Przypisania do zespołów</h3><p class="form-hint">Zaznacz zespoły i wpisz rolę danej osoby w każdym z nich.</p>
 ${groups.map(g=>{const a=assigned.find(a=>a.group===g.id)||{};return `<fieldset class="editor-row member-assignment" data-group="${esc(g.id)}">${checkboxField(g.g,'assigned',!!a.group)}${inputField('Rola PL','assignment-role-pl',a.role_pl||r.role_pl)}${inputField('Rola EN','assignment-role-en',a.role_en||r.role_en)}</fieldset>`;}).join('')}
 ${pairFields('Opis profilu — zachowany, ukryty publicznie','bio',r)}${textField('Linki profilu (JSON) — ukryte publicznie','socials',r.socials||'[]')}${inputField('Kolejność','sort_order',r.sort_order??999,'number')}
 `,async fd=>{
  const assignments=[...document.querySelectorAll('.member-assignment')].filter(row=>row.querySelector('[name="assigned"]').checked).map(row=>({group:row.dataset.group,role_pl:row.querySelector('[name="assignment-role-pl"]').value||fd.get('role_pl'),role_en:row.querySelector('[name="assignment-role-en"]').value||fd.get('role_en')}));
  if(fd.has('is_active')&&!assignments.length)throw Error('Przypisz widoczną osobę do przynajmniej jednego zespołu');
  const payload={...Object.fromEntries(fd),assignments,is_active:fd.has('is_active'),show_photo:fd.has('show_photo'),sort_order:Number(fd.get('sort_order'))||0};
  await api('/admin/members'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(payload)});
 });bindEnhancedUploads('member');
}
async function editRedesignProject(id){
 const [projects,members]=await Promise.all([api('/admin/projects'),api('/admin/members')]);const r=id?projects.find(p=>p.id===id):{};if(!r)return;currentEdit=r;
 const w=parseJsonField(r.website,{}),team=parseJsonField(r.team_ids);
 openModal(id?'Edytuj: '+r.title:'Nowy projekt',`
 ${inputField('Nazwa','title',r.title)}${!id?inputField('ID projektu (np. nowy-projekt)','id'):''}${inputField('Kolejność','ordering',r.ordering??999,'number')}
 ${pairFields('Krótki opis karty','short_desc',r)}${pairFields('Hasło projektu','title',w)}${pairFields('Wprowadzenie','lead',w)}
 ${inputField('Kolor (#RRGGBB lub var(--bs))','color',w.color||'var(--kn)')}${pairFields('Kategoria','tag',w)}${pairFields('Środowisko','where',w)}${inputField('Wysokość / głębokość','alt',w.alt)}
 ${mediaField('Logo projektu (przezroczyste)','logo_url',w.logo_url)}${mediaField('Ikona karty (opcjonalna)','favicon_url',w.favicon_url)}${mediaField('Ilustracja na karcie','illustration_url',w.illustration_url)}
 <h3>Opis projektu</h3><div id="project-about-rows">${(w.about||[{}]).map(aboutRow).join('')}</div><button type="button" class="btn" data-add-row="project-about-rows" data-kind="about">+ Sekcja opisu</button>
 ${inputField('Etap: 0 — koncepcja, 1 — prototyp, 2 — testy, 3 — wdrożenie','stage',w.stage??0,'number')}${checkboxField('Projekt zakończony','finished',w.finished)}
 ${mediaField('Zdjęcie stanu projektu','image_url',r.image_url)}${pairFields('Podpis zdjęcia','done_caption',w)}${pairFields('Co już działa','done',w)}${pairFields('Następne kroki','plan',w)}
 <h3>Galeria projektu</h3><div id="project-gallery-rows">${(w.gallery||[]).map(p=>photoRow(p)).join('')}</div><button type="button" class="btn" data-add-row="project-gallery-rows">+ Zdjęcie</button>
 ${checkboxField('Sekcja Research','research',w.research)}${pairFields('Research (HTML)','research_html',w)}
 <h3>Zespół projektu</h3>${members.filter(m=>m.is_active!==0).map(m=>checkboxField(m.name,'team:'+m.id,team.includes(m.id))).join('')}
 `,async fd=>{
  const website={...w};for(const key of ['color','alt','logo_url','illustration_url','favicon_url'])website[key]=fd.get(key)||'';
  for(const key of ['title','lead','tag','where','done_caption','done','plan','research_html'])for(const lang of ['pl','en'])website[key+'_'+lang]=fd.get(key+'_'+lang)||'';
  website.stage=Number(fd.get('stage'))||0;website.finished=fd.has('finished');website.research=fd.has('research');
  website.about=[...document.querySelectorAll('.project-about')].map(row=>Object.fromEntries([...row.querySelectorAll('textarea')].map(input=>[input.name,input.value])));
  website.gallery=readPhotos('#project-gallery-rows');
  const payload={id:fd.get('id')||undefined,title:fd.get('title'),full_title:website.title_pl,ordering:Number(fd.get('ordering'))||0,short_desc_pl:fd.get('short_desc_pl'),short_desc_en:fd.get('short_desc_en'),website,image_url:fd.get('image_url')||'',team_ids:members.filter(m=>fd.has('team:'+m.id)).map(m=>m.id)};
  await api('/admin/projects'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(payload)});
 });bindEnhancedUploads('project');
}
async function editRedesignPartner(id){
 const rows=await api('/admin/partners');const r=id?rows.find(p=>p.id===id):{};if(!r)return;currentEdit={...r,id:String(id||'partner-'+Date.now())};
 openModal(id?'Edytuj: '+r.name:'Nowy partner',`${inputField('Nazwa','name',r.name)}${inputField('Adres strony partnera','url',r.url)}${mediaField('Logo','logo',r.logo)}<div class="form-group"><label>Kategoria</label><select name="category"><option value="partner">Partner</option><option value="support" ${r.category==='support'?'selected':''}>Wsparcie</option></select></div>${inputField('Kolejność','sort_order',r.sort_order??999,'number')}`,async fd=>api('/admin/partners'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify({...Object.fromEntries(fd),sort_order:Number(fd.get('sort_order'))||0})}));bindEnhancedUploads('partner');
}
async function loadSiteEditor(){
 const site=await api('/admin/site');window.currentSite=site;
 document.getElementById('site-editor').innerHTML=`<button type="button" class="btn btn-primary" id="edit-site-button">Edytuj stronę główną i kontakt</button><p class="form-hint">Teksty PL/EN, adres e-mail, adres koła, zdjęcie sekcji „Kim jesteśmy” i galeria strony głównej.</p>`;
 document.getElementById('edit-site-button').onclick=()=>{
  currentEdit={id:'website'};
  openModal('Strona główna i kontakt',`${inputField('Adres e-mail','email',site.contact.email)}${textField('Adres koła — bez tłumaczenia (może zawierać <br>)','address',site.contact.address)}${mediaField('Zdjęcie Kim jesteśmy','homeAboutImage',site.homeAboutImage||'')}${mediaField('Ikona karty koła','club-icon',site.icons.club)}${mediaField('Film Research','research-video',site.researchVideo||'',true)}<h3>Media społecznościowe</h3>${(site.socials||[]).map((social,i)=>inputField(social.name+' — URL','social-url-'+i,social.url)+inputField(social.name+' — opis','social-handle-'+i,social.handle)).join('')}
  ${site.texts.map((item,i)=>`<fieldset class="editor-row"> <legend>${esc(item.label)}</legend>${textField('PL','copy-pl-'+i,item.pl)}${textField('EN','copy-en-'+i,item.en)}</fieldset>`).join('')}
  <h3>Galeria strony głównej</h3><div id="site-gallery-rows">${site.homeGallery.map(p=>photoRow(p,true)).join('')}</div><button type="button" class="btn" data-add-row="site-gallery-rows" data-layout="true">+ Zdjęcie</button>`,async fd=>{
   const next={...site,icons:{...site.icons,club:fd.get('club-icon')},researchVideo:fd.get('research-video'),socials:(site.socials||[]).map((social,i)=>({...social,url:fd.get('social-url-'+i),handle:fd.get('social-handle-'+i)})),contact:{email:fd.get('email'),address:fd.get('address')},homeAboutImage:fd.get('homeAboutImage'),homeGallery:readPhotos('#site-gallery-rows'),texts:site.texts.map((item,i)=>({...item,pl:fd.get('copy-pl-'+i),en:fd.get('copy-en-'+i)}))};
   await api('/admin/site',{method:'PUT',body:JSON.stringify(next)});loadSiteEditor();
  });bindEnhancedUploads('site');
 };
}
document.getElementById('add-member-btn').onclick=()=>editRedesignMember();window.editMember=editRedesignMember;
document.getElementById('add-project-btn').onclick=()=>editRedesignProject();window.editProject=editRedesignProject;
document.getElementById('add-partner-btn').onclick=()=>editRedesignPartner();window.editPartner=editRedesignPartner;

checkAuth();
