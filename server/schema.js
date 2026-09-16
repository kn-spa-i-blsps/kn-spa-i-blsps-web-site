import db from './db.js';

export function runSchemaMigrations() {
  const newsCols = db.prepare('PRAGMA table_info(news)').all().map((c) => c.name);
  if (!newsCols.includes('cover_image')) {
    db.exec('ALTER TABLE news ADD COLUMN cover_image TEXT DEFAULT ""');
  }
  if (!newsCols.includes('gallery')) {
    db.exec('ALTER TABLE news ADD COLUMN gallery TEXT DEFAULT "[]"');
  }
  if (!newsCols.includes('featured')) {
    db.exec('ALTER TABLE news ADD COLUMN featured INTEGER DEFAULT 0');
    console.log('[schema] Added news.featured column');
  }

  const memberCols = db.prepare('PRAGMA table_info(members)').all().map((c) => c.name);
  if (!memberCols.includes('photo_url')) {
    db.exec('ALTER TABLE members ADD COLUMN photo_url TEXT DEFAULT ""');
    console.log('[schema] Added members.photo_url column');
  }

  const cleared = db.prepare(`
    UPDATE projects SET image_url = ''
    WHERE image_url LIKE '%images.unsplash.com%'
       OR image_url LIKE '%via.placeholder.com%'
  `).run();
  if (cleared.changes > 0) {
    console.log(`[schema] Cleared ${cleared.changes} placeholder project image_url values`);
  }

  seedRoboSub2026News();
  seedRoboSub2026Partners();
}

// Manual insert while the admin panel form is broken — remove once content is confirmed live and
// editable through /admin again.
function seedRoboSub2026News() {
  const id = 'robosub-2026-post-event';
  const exists = db.prepare('SELECT id FROM news WHERE id = ?').get(id);
  if (exists) return;

  const fullDescPl = `<p>Zespół BlueSpark, działający w ramach naszego koła naukowego, jako jedyna drużyna reprezentująca Europę wziął udział w tegorocznej edycji RoboSub – flagowych zawodach RoboNation, które odbyły się w Woollett Aquatics Center w Irvine w Kalifornii. Dla ekipy był to oficjalny debiut w zawodach tej rangi, a głównym celem wyjazdu była weryfikacja w praktyce autonomicznego pojazdu podwodnego BlueSpark, zbudowanego od podstaw w ciągu ostatniego roku.</p>
<p>Po rejestracji i przygotowaniu stanowiska w strefie prac inżynieryjnych zespół przeszedł do intensywnych prób w warunkach basenowych. Praca w nowym środowisku wiązała się z wyzwaniami integracyjnymi, które udało się rozwiązać na miejscu dzięki bieżącej diagnozie i optymalizacji systemu – co pozwoliło doprowadzić pojazd do pełnej gotowości operacyjnej i przystąpić do prób kwalifikacyjnych.</p>
<p>Równolegle zespół przygotował się do prezentacji przed międzynarodowym gronem sędziowskim, przedstawiając proces projektowy pojazdu oraz autorskie prace badawczo-rozwojowe nad wykorzystaniem technologii Gaussian splatting do automatycznego generowania modeli 3D. Jakość dokumentacji naukowej i prezentacji zaowocowała przyznaniem zespołowi <strong>nagrody specjalnej za pracę naukową (Special Award for Research)</strong>.</p>
<p>Udział w RoboSub 2026 był możliwy dzięki wsparciu naszych partnerów i instytucji:</p>
<ul>
<li>Grupa WB (Key Expedition Partner)</li>
<li>Creotech Geo</li>
<li>Fundacja Universitatis Varsoviensis</li>
<li>Uniwersytet Warszawski – Wydział Fizyki</li>
<li>Uniwersytet Warszawski – Wydział Matematyki, Informatyki i Mechaniki</li>
<li>Uniwersytet Warszawski – Wydział Zarządzania</li>
</ul>
<p>Pełna relacja z wyjazdu wraz z galerią zdjęć dostępna jest na stronie projektu: <a href="/bluespark/competitions/robosub-2026/" target="_blank" rel="noopener">BlueSpark – RoboSub 2026</a>.</p>`;

  const fullDescEn = `<p>BlueSpark, the team run within our science club, took part in this year's RoboSub — RoboNation's flagship competition held at the Woollett Aquatics Center in Irvine, California — as the only team representing Europe. It was the team's official debut at an event of this scale, with the main goal of putting BlueSpark, an autonomous underwater vehicle built entirely from scratch over the past year, to a real-world test.</p>
<p>After registration and setting up the pit area, the team moved into intensive in-water testing. Operating in a new environment brought system integration challenges, which the team resolved on site through continuous diagnostics and optimization — bringing the vehicle to full operational readiness and qualifying for the runs.</p>
<p>In parallel, the team prepared for the presentation before the international judging panel, showcasing its engineering workflow and original research on using Gaussian splatting technology for automated 3D model generation. The quality of the scientific documentation and presentation earned the team the <strong>Special Award for Research</strong>.</p>
<p>Participation in RoboSub 2026 was made possible thanks to the support of our partners and institutions:</p>
<ul>
<li>WB Group (Key Expedition Partner)</li>
<li>Creotech Geo</li>
<li>Fundacja Universitatis Varsoviensis</li>
<li>University of Warsaw – Faculty of Physics</li>
<li>University of Warsaw – Faculty of Mathematics, Informatics and Mechanics</li>
<li>University of Warsaw – Faculty of Management</li>
</ul>
<p>The full report with a photo gallery is available on the project page: <a href="/bluespark/en/competitions/robosub-2026/" target="_blank" rel="noopener">BlueSpark – RoboSub 2026</a>.</p>`;

  const gallery = [
    '/bluespark/photos/robosub/team-flags.jpg',
    '/bluespark/photos/robosub/team-parking-banner.jpg',
    '/bluespark/photos/robosub/team-celebration.jpg',
    '/bluespark/photos/robosub/pit-diagnostics.jpg',
    '/bluespark/photos/robosub/pit-vehicle-prep.jpg',
    '/bluespark/photos/robosub/pit-presenting.jpg',
  ];

  const links = [
    { label: { pl: 'Pełna relacja BlueSpark', en: 'Full BlueSpark report' }, url: '/bluespark/competitions/robosub-2026/' },
    { label: { pl: 'RoboSub 2026', en: 'RoboSub 2026' }, url: 'https://robosub.org/' },
  ];

  db.prepare(`
    INSERT INTO news (id, date, title_pl, title_en, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, content_format, cover_image, gallery, links, published, featured)
    VALUES (@id, @date, @title_pl, @title_en, @short_desc_pl, @short_desc_en, @full_desc_pl, @full_desc_en, 'html', @cover_image, @gallery, @links, 1, 1)
  `).run({
    id,
    date: '2026-08-24',
    title_pl: 'RoboSub 2026: nagroda specjalna za pracę naukową dla zespołu BlueSpark',
    title_en: 'RoboSub 2026: Special Award for Research for Team BlueSpark',
    short_desc_pl: 'Nasz zespół BlueSpark jako jedyny reprezentant Europy wystartował w RoboSub 2026 w Irvine w Kalifornii i zdobył nagrodę specjalną za pracę naukową (Special Award for Research).',
    short_desc_en: 'Our BlueSpark team was the only entry from Europe at RoboSub 2026 in Irvine, California, and won the Special Award for Research.',
    full_desc_pl: fullDescPl,
    full_desc_en: fullDescEn,
    cover_image: gallery[2],
    gallery: JSON.stringify(gallery),
    links: JSON.stringify(links),
  });
  console.log('[schema] Seeded RoboSub 2026 post-event news article');
}

function seedRoboSub2026Partners() {
  // Matched by URL domain, not name — the legacy seed data (src/data.js) already lists Fundacja
  // UV under a different display name, so a name-only check would create a duplicate.
  const insertPartner = db.prepare(`
    INSERT INTO partners (name, url, logo, category, sort_order) VALUES (@name, @url, @logo, @category, @sort_order)
  `);
  const existsByUrl = db.prepare("SELECT id FROM partners WHERE url LIKE '%' || ? || '%'");

  if (!existsByUrl.get('wbgroup.pl')) {
    insertPartner.run({
      name: 'WB Group',
      url: 'https://www.wbgroup.pl/',
      logo: '/bluespark/sponsors/wb-group.png',
      category: 'partner',
      sort_order: 999,
    });
    console.log('[schema] Seeded partner: WB Group');
  }

  if (!existsByUrl.get('fundacjauv.org.pl')) {
    insertPartner.run({
      name: 'Fundacja Universitatis Varsoviensis',
      url: 'https://fundacjauv.org.pl/',
      logo: '/bluespark/sponsors/fundacja-uv.png',
      category: 'partner',
      sort_order: 999,
    });
    console.log('[schema] Seeded partner: Fundacja Universitatis Varsoviensis');
  } else {
    console.log('[schema] Fundacja UV already present as a partner, skipping seed');
  }
}
