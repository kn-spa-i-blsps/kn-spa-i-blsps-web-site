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
  seedEccv2026News();
  seedWccmEccomas2026News();
}

// Manual insert while the admin panel form is broken — remove once content is confirmed live and
// editable through /admin again.
function seedRoboSub2026News() {
  const id = 'robosub-2026-post-event';
  const exists = db.prepare('SELECT id FROM news WHERE id = ?').get(id);
  if (exists) return;

  const fullDescPl = `<p>W lipcu 2026 roku zespół reprezentujący Uniwersytet Warszawski wziął udział w międzynarodowych zawodach robotów podwodnych RoboSub 2026, odbywających się w Kalifornii (USA). Projekt BlueSpark – autonomiczny pojazd podwodny (AUV) rozwijany przez ostatni rok – był jedynym reprezentantem Europy w tegorocznej edycji wydarzenia.</p>
<p>Start w zawodach był dla debiutującego zespołu okazją do weryfikacji rozwiązań konstrukcyjnych i programistycznych w warunkach basenowych. Zebrane podczas testów dane inżynieryjne stanowią podstawę do dalszych prac nad rozwojem platformy. Kluczowym momentem wydarzenia było zaprezentowanie sędziom części badawczo-rozwojowej projektu.</p>
<p>Zespół otrzymał nagrodę specjalną w kategorii Research (Special Award for Research). Uznanie sędziów zyskało innowacyjne podejście do generowania zbiorów danych modeli 3D z wykorzystaniem technologii Gaussian splatting, zrealizowane na bazie autorskiej, studenckiej konstrukcji.</p>
<p>Realizacja projektu oraz udział w zawodach w USA były możliwe dzięki wsparciu partnerów biznesowych i akademickich. Głównym partnerem wyjazdu została Grupa WB. Projekt wsparły również firma Creotech Geo, Fundacja Universitatis Varsoviensis oraz Uniwersytet Warszawski, w tym Wydział Fizyki, Wydział Matematyki, Informatyki i Mechaniki oraz Wydział Zarządzania.</p>
<p>Pełna relacja z wyjazdu wraz z galerią zdjęć dostępna jest na stronie projektu: <a href="/bluespark/competitions/robosub-2026/" target="_blank" rel="noopener">BlueSpark – RoboSub 2026</a>.</p>`;

  const fullDescEn = `<p>In July 2026, the team representing the University of Warsaw participated in the RoboSub 2026 international underwater robotics competition in California, USA. The BlueSpark project—an autonomous underwater vehicle (AUV) developed over the past year—was the sole representative from Europe in this year's competition.</p>
<p>For the rookie team, the event provided an opportunity to validate hardware and software systems under operational pool conditions. The technical data collected during testing will form the foundation for future platform development. A key outcome of the event was the evaluation of the project's research and development component by the judging panel.</p>
<p>The team received the Special Award for Research. The judges recognized the innovative approach to generating 3D model datasets using Gaussian splatting, implemented within a student-developed robotic platform.</p>
<p>The execution of the project and participation in the US event were supported by industry and academic partners. WB Group served as the Key Partner for the expedition. Additional support was provided by Creotech Geo, Fundacja Universitatis Varsoviensis, and the University of Warsaw, including the Faculty of Physics, the Faculty of Mathematics, Informatics and Mechanics, and the Faculty of Management.</p>
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
    date: '2026-07-15',
    title_pl: 'Sukces projektu BlueSpark na zawodach RoboSub 2026 w Kalifornii. Nagroda specjalna dla reprezentacji z Polski',
    title_en: 'BlueSpark Project Awarded at RoboSub 2026 in California',
    short_desc_pl: 'Polski zespół rozwijający autonomiczny pojazd podwodny BlueSpark wziął udział w międzynarodowych zawodach RoboSub 2026 w Kalifornii. Jako jedyna reprezentacja z Europy, studenci Uniwersytetu Warszawskiego zaprezentowali autorską konstrukcję zbudowaną w ciągu ostatniego roku. Wyjazd przyniósł zespołowi sukces w części naukowej – pojazd BlueSpark został wyróżniony nagrodą specjalną w kategorii Research za wykorzystanie technologii Gaussian splatting do generowania modeli 3D. Pomyślnie przeprowadzono również serię testów basenowych. Projekt zrealizowano przy wsparciu Grupy WB, Creotech Geo, Fundacji Universitatis Varsoviensis oraz Uniwersytetu Warszawskiego (Wydziału Fizyki, Wydziału MIM i Wydziału Zarządzania).',
    short_desc_en: 'The team behind the BlueSpark autonomous underwater vehicle participated in the international RoboSub 2026 competition in California. As the only European team in attendance, the University of Warsaw students presented a custom vehicle built over the past year. The team achieved scientific recognition by winning the Special Award for Research for applying Gaussian splatting to 3D model generation, alongside completing planned pool tests. The initiative was supported by WB Group, Creotech Geo, Fundacja Universitatis Varsoviensis, and the University of Warsaw (Faculty of Physics, Faculty of MIM, and Faculty of Management).',
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

function seedEccv2026News() {
  const id = 'eccv-2026-malmo';
  const exists = db.prepare('SELECT id FROM news WHERE id = ?').get(id);
  if (exists) return;

  const fullDescPl = `<p>W dniach 8–12 września w Malmömässan oraz Malmö Arenie odbyła się 19. edycja European Conference on Computer Vision (ECCV 2026) — jednego z najważniejszych światowych wydarzeń poświęconych sztucznej inteligencji, uczeniu maszynowemu i analizie obrazu. Wśród badaczy z całego świata nie zabrakło również przedstawicieli naszego zespołu.</p>
<h3>Prezentacja publikacji i posteru</h3>
<p>Głównym punktem naszej obecności na konferencji była prezentacja artykułu naukowego zatytułowanego „Gaussian-Splat Synthetic Augmentation for Underwater Anomaly Detection: A Substitution Feasibility Study”.</p>
<p>Praca koncentruje się na wyzwaniach związanych z pozyskiwaniem danych i precyzyjną detekcją obiektów oraz anomalii w podwodnym środowisku operacyjnym. W badaniu przeanalizowaliśmy wykonalność zastosowania technologii Gaussian Splatting do generowania syntetycznych zbiorów danych, oceniając stopień, w jakim mogą one zastąpić lub uzupełnić tradycyjne dane pomiarowe.</p>
<h3>Wymiana doświadczeń i dalsze kroki</h3>
<p>Sesja posterowa stworzyła przestrzeń do dyskusji z inżynierami i naukowcami zajmującymi się zaawansowaną analizą obrazu. Rozmowy z uczestnikami pozwoliły na walidację naszego podejścia oraz skonsultowanie metodologicznych szczegółów z ekspertami z branży. Udział w ECCV 2026 był cenny nie tylko ze względu na możliwość zaprezentowania wyników prac R&D, ale także jako źródło nowej wiedzy technicznej, którą wdrożymy w kolejnych iteracjach naszych systemów.</p>`;

  const fullDescEn = `<p>From September 8 to 12, the 19th European Conference on Computer Vision (ECCV 2026) took place at Malmömässan and Malmö Arena, bringing together leading global researchers in machine learning, AI, and visual computing. Our team attended the event to contribute to the technical program and engage with the international academic community.</p>
<h3>Paper Presentation &amp; Poster Session</h3>
<p>Our main contribution to the conference was the presentation of our research paper, titled "Gaussian-Splat Synthetic Augmentation for Underwater Anomaly Detection: A Substitution Feasibility Study".</p>
<p>The research addresses the operational challenges of data acquisition and accurate object detection in underwater environments. In this study, we evaluated the feasibility of applying 3D Gaussian Splatting for synthetic data augmentation, testing how effectively generated visual data can substitute for or complement real-world datasets in anomaly detection pipelines.</p>
<h3>Technical Feedback and Next Steps</h3>
<p>The poster sessions provided an opportunity for direct technical exchange with researchers and developers specializing in computer vision and robotics. The discussions yielded valuable insights into our current pipeline and highlighted potential areas for further optimization. Attending ECCV 2026 reinforced our R&D roadmap and provided actionable feedback that will directly inform our upcoming projects.</p>`;

  const gallery = [
    '/photo/szwecja/32780d8c-879c-4c35-bbc6-7be2ab709cba.jpg',
    '/photo/szwecja/369c75b3-a526-4af7-8082-4f5d048656e7.jpg',
    '/photo/szwecja/389d73aa-a315-4d26-b405-67d502aea86d.jpg',
    '/photo/szwecja/b5b41814-12b2-43be-ae8a-22d186485396.jpg',
    '/photo/szwecja/eb06daa5-38cf-4fbc-bac0-105bba1e4916.jpg',
  ];

  db.prepare(`
    INSERT INTO news (id, date, title_pl, title_en, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, content_format, cover_image, gallery, links, published, featured)
    VALUES (@id, @date, @title_pl, @title_en, @short_desc_pl, @short_desc_en, @full_desc_pl, @full_desc_en, 'html', @cover_image, @gallery, '[]', 1, 0)
  `).run({
    id,
    date: '2026-09-08',
    title_pl: 'Nasz zespół na ECCV 2026: Prezentacja wyników badań nad podwodnym Computer Vision w Malmö',
    title_en: 'Our Team at ECCV 2026: Presenting Research on Underwater Computer Vision in Malmö',
    short_desc_pl: 'W dniach 8–12 września reprezentacja naszego zespołu wzięła udział w prestiżowej konferencji European Conference on Computer Vision (ECCV 2026) w Malmö. Podczas wydarzenia zaprezentowaliśmy publikację pt. „Gaussian-Splat Synthetic Augmentation for Underwater Anomaly Detection: A Substitution Feasibility Study”. Praca dotyczy wykorzystania technologii Gaussian Splatting do syntezy danych i usprawnienia algorytmów detekcji anomalii w trudnych warunkach podwodnych. Udział w konferencji był okazją do zaprezentowania wyników naszych badań międzynarodowemu środowisku naukowemu oraz zebrania wartościowego feedbacku, który wykorzystamy przy kolejnych projektach R&D.',
    short_desc_en: 'From September 8–12, our team attended the European Conference on Computer Vision (ECCV 2026) in Malmö, Sweden. We presented our research paper, "Gaussian-Splat Synthetic Augmentation for Underwater Anomaly Detection: A Substitution Feasibility Study". The study focuses on leveraging Gaussian Splatting techniques to generate synthetic data and enhance anomaly detection systems operating in complex underwater environments. Participating in ECCV allowed us to share our R&D outcomes with the global computer vision community and gather technical feedback to drive our ongoing developments.',
    full_desc_pl: fullDescPl,
    full_desc_en: fullDescEn,
    cover_image: gallery[0],
    gallery: JSON.stringify(gallery),
  });
  console.log('[schema] Seeded ECCV 2026 Malmö news article');
}

function seedWccmEccomas2026News() {
  const id = 'wccm-eccomas-2026-monachium';
  const exists = db.prepare('SELECT id FROM news WHERE id = ?').get(id);
  if (exists) return;

  const fullDescPl = `<p>W dniach 19–24 lipca 2026 roku w Monachium odbyła się połączona konferencja WCCM-ECCOMAS 2026 (17th World Congress on Computational Mechanics oraz 10th European Congress on Computational Methods in Applied Sciences and Engineering) — jedno z najważniejszych międzynarodowych wydarzeń gromadzących badaczy, inżynierów i ekspertów z zakresu metod obliczeniowych i nauk inżynieryjnych. Wśród uczestników nie zabrakło również reprezentacji naszego zespołu. Głównym punktem naszej obecności była prezentacja podsumowująca prace badawcze realizowane w ramach projektu finansowanego ze środków programu NATO Science for Peace and Security (SPS). Wydarzenie stworzyło przestrzeń do merytorycznej dyskusji z naukowcami oraz praktykami zajmującymi się zaawansowaną technologią. Rozmowy kuluarowe i wymiana doświadczeń po wystąpieniu pozwoliły na skonsultowanie naszych rozwiązań z międzynarodowym środowiskiem naukowym, a zdobyta wiedza i feedback bezpośrednio zasilą kolejne etapy naszych prac badawczo-rozwojowych.</p>`;

  const fullDescEn = `<p>From July 19 to 24, 2026, the joint WCCM-ECCOMAS 2026 congress (17th World Congress on Computational Mechanics and 10th European Congress on Computational Methods in Applied Sciences and Engineering) took place in Munich, Germany, bringing together leading global researchers, engineers, and experts in computational methods and engineering sciences. Our team attended the event to contribute to the technical program and engage with the international academic community. Our main contribution was a presentation showcasing outcomes from research conducted within the framework of a project supported by the NATO Science for Peace and Security (SPS) Programme. The congress provided a valuable platform for direct technical exchange with international specialists. The discussions following our presentation validated our approaches and provided actionable insights that will directly inform our upcoming R&D iterations.</p>`;

  const gallery = [
    '/photo/monachium/download.jpg',
    '/photo/monachium/download-1.jpg',
  ];

  db.prepare(`
    INSERT INTO news (id, date, title_pl, title_en, short_desc_pl, short_desc_en, full_desc_pl, full_desc_en, content_format, cover_image, gallery, links, published, featured)
    VALUES (@id, @date, @title_pl, @title_en, @short_desc_pl, @short_desc_en, @full_desc_pl, @full_desc_en, 'html', @cover_image, @gallery, '[]', 1, 0)
  `).run({
    id,
    date: '2026-07-19',
    title_pl: 'Nasz zespół na WCCM-ECCOMAS 2026: Prezentacja wyników badań w projekcie NATO SPS w Monachium',
    title_en: 'Our Team at WCCM-ECCOMAS 2026: Presenting NATO SPS Research Outcomes in Munich',
    short_desc_pl: 'W dniach 19–24 lipca 2026 roku reprezentacja naszego zespołu wzięła udział w prestiżowej konferencji WCCM-ECCOMAS 2026 (17th World Congress on Computational Mechanics oraz 10th European Congress on Computational Methods in Applied Sciences and Engineering) w Monachium. Podczas wydarzenia przedstawiliśmy naszą prezentację przygotowaną w ramach projektu NATO Science for Peace and Security (SPS). Udział w konferencji był okazją do zaprezentowania wyników naszych prac międzynarodowemu środowisku naukowemu oraz zebrania wartościowego feedbacku od ekspertów z branży.',
    short_desc_en: 'From July 19–24, 2026, our team attended the WCCM-ECCOMAS 2026 conference (17th World Congress on Computational Mechanics and 10th European Congress on Computational Methods in Applied Sciences and Engineering) in Munich, Germany. During the event, we delivered a presentation developed under the NATO Science for Peace and Security (SPS) Programme. Participating in the congress allowed us to share our R&D outcomes with the global scientific community and gather technical feedback from industry experts.',
    full_desc_pl: fullDescPl,
    full_desc_en: fullDescEn,
    cover_image: gallery[0],
    gallery: JSON.stringify(gallery),
  });
  console.log('[schema] Seeded WCCM-ECCOMAS 2026 Munich news article');
}
