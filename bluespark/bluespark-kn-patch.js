(function () {
  const isEn = document.documentElement.lang === 'en' || /\/bluespark\/en(\/|$)/.test(location.pathname);
  const knLabel = isEn ? 'KN SPA & BLSPS' : 'KN SPA i BLSPS';
  const knTitle = isEn ? 'Back to the student club homepage' : 'Powrót do strony koła naukowego';

  document.querySelectorAll('.brand-mark, .footer-mark').forEach((img) => {
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.decoding = 'async';
    if (!img.alt) img.alt = 'BlueSpark';
  });

  const aux = document.querySelector('.nav-aux');
  if (aux && !document.querySelector('.kn-back-link')) {
    const link = document.createElement('a');
    link.href = '/';
    link.className = 'kn-back-link';
    link.title = knTitle;
    link.innerHTML = `<span class="kn-back-icon" aria-hidden="true">←</span><span>${knLabel}</span>`;
    aux.insertBefore(link, aux.firstChild);
  }

  document.querySelectorAll('.footer-links a[href="https://knspaiblsps.pl/"], .footer-links a[href="https://knspaiblsps.pl"]').forEach((a) => {
    a.href = '/';
    a.removeAttribute('target');
    a.removeAttribute('rel');
    if (isEn) {
      a.textContent = 'KN SPA & BLSPS — Home';
    } else {
      a.textContent = 'KN SPA i BLSPS — strona główna';
    }
  });
})();
