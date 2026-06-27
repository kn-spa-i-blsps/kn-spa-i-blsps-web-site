function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

async function fetchSiteData() {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch {
    await loadScript('/src/data.js');
    return {
      members: window.members,
      projects: window.projects,
      news: window.news,
      partners: window.partners,
      heroSlides: window.heroSlides || [],
    };
  }
}

(async function boot() {
  try {
    const data = await fetchSiteData();
    window.members = data.members;
    window.projects = data.projects;
    window.news = data.news;
    window.partners = data.partners;
    if (data.heroSlides) window.heroSlides = data.heroSlides;

    await loadScript('/src/image-utils.js?v=9');
    for (const src of window.__pageScripts || []) {
      await loadScript(src);
    }

    if (typeof updateLangUI === 'function') updateLangUI();

    if (typeof bootHome === 'function') await bootHome();
    if (typeof bootPartners === 'function') bootPartners();
    if (typeof bootArticle === 'function') await bootArticle();
    if (typeof bootProject === 'function') bootProject();
    if (typeof bootTeam === 'function') bootTeam();
    if (typeof bootMember === 'function') await bootMember();
    if (typeof window.__afterLoad === 'function') window.__afterLoad();
  } catch (err) {
    console.error('[loader]', err);
    const msg = err?.message ? `Błąd: ${err.message}` : 'Błąd ładowania danych. Odśwież stronę.';
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<div style="background:#012A4F;color:#fff;padding:1rem;text-align:center;font-family:monospace;font-size:12px">${msg}</div>`
    );
  }
})();
