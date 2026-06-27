// home.js

/**
 * 1. RENDEROWANIE PROJEKTÓW
 */

const PROJECT_DISPLAY_ORDER = ['bluespark', 'musc', 'flysearch', 'hawk-eye', 'snows-eye'];

function sortProjectsForDisplay(list) {
    return [...list].sort((a, b) => {
        const ai = PROJECT_DISPLAY_ORDER.indexOf(a.id);
        const bi = PROJECT_DISPLAY_ORDER.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
}

let currentLang = localStorage.getItem('siteLang') || 'pl';

function toggleLanguage() {
    currentLang = currentLang === 'pl' ? 'en' : 'pl';
    localStorage.setItem('siteLang', currentLang);
    location.reload(); 
}

function renderProjectCards(container, { featuredId = 'bluespark', layout = 'home' } = {}) {
    if (!container || typeof projects === 'undefined') return;
    container.innerHTML = '';

    const sorted = sortProjectsForDisplay(projects);
    const isPageLayout = layout === 'page';

    sorted.forEach((proj, index) => {
        const id = t(proj.id);
        const href = id === 'bluespark' ? '/bluespark/' : `project.html?id=${id}`;
        const mainImgPath = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_900,c_limit/kn-spa-i-blsps/projects/${id}/main.jpg`;
        const isFeatured = !isPageLayout && id === featuredId;
        const cardClass = isPageLayout ? ' page-card' : (isFeatured ? ' featured lg:col-span-2' : '');

        container.innerHTML += `
            <a href="${href}" class="home-project-card group${cardClass}">
                <img src="${mainImgPath}" alt="" class="bg-img" loading="lazy"
                     onerror="handleHomeProjectImageError(this, '${id}', '${proj.image || ''}')">
                <div class="overlay"></div>
                <div class="body">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-[8px] font-bold text-[#038DAE] tracking-[0.35em] uppercase">SYS_0${index + 1}</span>
                        <span class="text-[8px] text-white/50 font-mono">${id}</span>
                    </div>
                    <h3 class="text-xl lg:text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-[#038DAE] transition-colors leading-none">
                        ${t(proj.title)}
                    </h3>
                    <p class="text-[10px] text-slate-200 leading-relaxed mt-3 line-clamp-2">
                        ${t(proj.shortDesc)}
                    </p>
                    <span class="inline-flex items-center gap-2 mt-4 text-[9px] font-bold text-[#038DAE] tracking-[0.2em] uppercase">
                        DECRYPT_DATA <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </div>
            </a>
        `;
    });
}

function renderHomeProjects() {
    renderProjectCards(document.getElementById('projects-container'), { featuredId: 'bluespark', layout: 'home' });
}

// Obsługa błędów formatów dla małych kafelków projektów
function handleHomeProjectImageError(img, id, fallback) {
    if (img.src.includes('main.jpg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/projects/${id}/main.jpeg`;
    } else if (img.src.includes('main.jpeg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/projects/${id}/main.png`;
    } else if (img.src.includes('main.png') && fallback) {
        img.src = fallback;
    } else {
        img.onerror = null;
        img.src = 'https://via.placeholder.com/600x400?text=NO_IMAGE';
    }
}

/**
 * 2. RENDEROWANIE SEKCOJI TEAM (SCROLL)
 */
function renderHomeTeam() {
    const container = document.getElementById('team-scroll-container');
    if (!container) return;

    const projectColors = {
        "musc": "text-red-600 border-red-200 bg-red-50",
        "flysearch": "text-green-600 border-green-200 bg-green-50",
        "bluespark": "text-blue-600 border-blue-200 bg-blue-50",
        "hawk-eye": "text-amber-600 border-amber-200 bg-amber-50",
        "snows-eye": "text-slate-600 border-slate-200 bg-slate-50"
    };

    const sortedMembers = [...members].sort((a, b) => {
        const minOrderA = Math.min(...projects.filter(p => p.teamIds.includes(a.id)).map(p => p.ordering || 999));
        const minOrderB = Math.min(...projects.filter(p => p.teamIds.includes(b.id)).map(p => p.ordering || 999));
        return minOrderA - minOrderB;
    });

    const membersHTML = sortedMembers.map(person => {
        const primarySrc = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/${t(person.id)}.jpg`;
        const secondarySrc = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/${t(person.id)}.jpeg`;
        const fallbackSrc = person.img || "https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/default.jpg";

        const customBadges = (person.customTags || []).map(tag => `
            <span class="text-[8px] px-1.5 py-0.5 border border-[#038DAE]/20 bg-[#038DAE]/5 text-[#038DAE] uppercase font-bold tracking-tighter">
                ${t(tag)}
            </span>
        `).join('');

        const personProjects = projects
            .filter(p => p.teamIds.includes(person.id))
            .sort((a, b) => (a.ordering || 999) - (b.ordering || 999));

        const projectBadges = personProjects.map(p => {
            const colorClass = projectColors[p.id] || "text-[#012A4F] border-slate-200 bg-slate-50";
            return `<span class="text-[8px] px-1.5 py-0.5 border uppercase font-bold tracking-tighter ${colorClass}">${p.title}</span>`;
        }).join('');

        return `
            <a href="member.html?user=${t(person.id)}" class="min-w-[240px] tech-card p-4 snap-center group transition-transform duration-300 shadow-sm hover:shadow-md bg-white">
                <div class="relative mb-4 overflow-hidden bg-slate-100 aspect-[3/4]">
                    <img src="${primarySrc}" loading="lazy" class="w-full h-full object-cover"
                        onerror="handleImageError(this, '${secondarySrc}', '${fallbackSrc}')">
                </div>
                <h3 class="text-sm font-bold text-[#012A4F] uppercase tracking-tight group-hover:text-[#038DAE] transition-colors">${t(person.name)}</h3>
                <p class="text-[9px] text-[#038DAE] font-bold mt-1 tracking-widest uppercase italic mb-3">${t(person.role)}</p>
                <div class="flex flex-wrap gap-1 mt-auto border-t border-slate-100 pt-3">${customBadges}${projectBadges}</div>
            </a>
        `;
    }).join('');

    container.innerHTML = membersHTML;
}

function handleImageError(imgElement, nextSrc, finalFallback) {
    if (!imgElement.dataset.triedJpeg) {
        imgElement.dataset.triedJpeg = "true";
        imgElement.src = nextSrc;
    } else {
        imgElement.onerror = null;
        imgElement.src = finalFallback;
    }
}

/**
 * 3. DYNAMICZNY HERO SLIDER (SEKWENCYJNE SZUKANIE W MAIN/)
 */
let currentSlide = 0;
let slideInterval;
let detectedHeroSlides = [];

async function initHeroGallery() {
    const galleryContainer = document.getElementById('hero-gallery');
    const dotsContainer = document.getElementById('gallery-dots');
    if (!galleryContainer) return;

    detectedHeroSlides = [];
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];
    const MAX_HERO_FILES = 12; // Maksymalny dopuszczalny limit

    // SEKWENCYJNE SZUKANIE: jeśli brakuje numeru "i", przerywamy sprawdzanie kolejnych
    for (let i = 1; i <= MAX_HERO_FILES; i++) {
        let foundThisIndex = false;
        
        for (const ext of extensions) {
            const path = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_1200/kn-spa-i-blsps/main/${i}.${ext}`;
            const exists = await checkIfFileExists(path);
            
            if (exists) {
                // Dopasowanie metadanych z data.js (jeśli istnieją pod tym indeksem)
                const meta = (typeof heroSlides !== 'undefined' && heroSlides[i-1]) 
                    ? heroSlides[i-1] 
                    : { label: "ARCHIVE_DATA", title: `NODE_0${i}` };
                
                detectedHeroSlides.push({ img: path, label: meta.label, title: meta.title });
                foundThisIndex = true;
                break; // Znaleziono format, przerywamy sprawdzanie innych rozszerzeń dla tego numeru
            }
        }

        if (!foundThisIndex) {
            // BRAK PLIKU O NUMERZE i: Przerywamy sprawdzanie dalszych numerów (np. 3 brakuje -> nie sprawdza 4)
            console.log(`Hero Slider: Sequence broken at index ${i}. Stopping search.`);
            break; 
        }
    }

    // Fallback: jeśli folder /main/ jest pusty, użyj danych statycznych z data.js
    if (detectedHeroSlides.length === 0 && typeof heroSlides !== 'undefined') {
        detectedHeroSlides = heroSlides;
    }

    if (detectedHeroSlides.length === 0) return;

    // Renderowanie elementów wizualnych
    galleryContainer.innerHTML = "";
    if (dotsContainer) dotsContainer.innerHTML = "";

    detectedHeroSlides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.img;
        img.className = `absolute inset-0 w-full h-full object-cover gallery-fade transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        img.id = `hero-img-${index}`;
        galleryContainer.appendChild(img);

        if (dotsContainer) {
            const dot = document.createElement('div');
            dot.className = `h-1 transition-all duration-500 ${index === 0 ? 'w-16 bg-[#038DAE]' : 'w-4 bg-slate-200'}`;
            dot.id = `hero-dot-${index}`;
            dotsContainer.appendChild(dot);
        }
    });

    startHeroLogic();
}

function checkIfFileExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

function startHeroLogic() {
    const labelEl = document.getElementById('gallery-label');
    const titleEl = document.getElementById('gallery-title');
    const galleryContainer = document.getElementById('hero-gallery');

    const updateTexts = (index) => {
        labelEl.style.opacity = 0;
        titleEl.style.opacity = 0;
        setTimeout(() => {
            labelEl.innerText = detectedHeroSlides[index].label;
            titleEl.innerText = detectedHeroSlides[index].title;
            labelEl.style.opacity = 1;
            titleEl.style.opacity = 1;
        }, 400);
    };

    const changeSlide = (direction = 1) => {
        const nextSlide = (currentSlide + direction + detectedHeroSlides.length) % detectedHeroSlides.length;

        document.getElementById(`hero-img-${currentSlide}`).classList.replace('opacity-100', 'opacity-0');
        document.getElementById(`hero-img-${nextSlide}`).classList.replace('opacity-0', 'opacity-100');

        document.getElementById(`hero-dot-${currentSlide}`).className = 'h-1 w-4 bg-slate-200 transition-all duration-500';
        document.getElementById(`hero-dot-${nextSlide}`).className = 'h-1 w-16 bg-[#038DAE] transition-all duration-500';

        updateTexts(nextSlide);
        currentSlide = nextSlide;
    };

    updateTexts(0);
    galleryContainer.onclick = () => { clearInterval(slideInterval); changeSlide(1); startAuto(); };
    
    const startAuto = () => { slideInterval = setInterval(() => changeSlide(1), 7000); };
    startAuto();
}

/**
 * 4. RENDEROWANIE AKTUALNOŚCI NA STRONIE GŁÓWNEJ
 */
function newsImgPath(id, w = 800) {
    return `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_${w},c_limit/kn-spa-i-blsps/news/${id}/main.jpg`;
}

function newsCoverSrc(item, w = 800) {
    if (item.coverImage) return item.coverImage;
    if (item.cover && !item.cover.endsWith(`/news/${item.id}/main.jpg`)) return item.cover;
    return newsImgPath(item.id, w);
}

function spotlightNewsBadge(item, { isLatest }) {
    if (isLatest) {
        return '<div class="news-badge news-badge-latest">LATEST</div>';
    }
    if (item.featured) {
        return '<div class="news-badge news-badge-featured">FEATURED</div>';
    }
    return '';
}

function renderHomeNews() {
    const featuredEl = document.getElementById('news-featured');
    const container = document.getElementById('news-container');
    if (!container || typeof news === 'undefined') return;

    const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!sortedNews.length) return;

    const latest = sortedNews[0];
    const featuredNews = sortedNews.filter((n) => n.featured);
    const spotlight = featuredNews.length ? featuredNews[0] : latest;
    const rest = sortedNews.filter((n) => n.id !== spotlight.id);
    const spotlightIsLatest = spotlight.id === latest.id;

    if (featuredEl) {
        featuredEl.innerHTML = `
            <a href="article.html?id=${spotlight.id}" class="home-news-featured group">
                <div class="feat-img relative overflow-hidden bg-slate-100">
                    <img src="${newsCoverSrc(spotlight, 1000)}" alt="" class="w-full h-full object-cover min-h-[200px] md:min-h-full transition duration-500 group-hover:scale-105"
                         onerror="handleNewsImageError(this, '${spotlight.id}')">
                    <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        ${spotlightNewsBadge(spotlight, { isLatest: spotlightIsLatest })}
                    </div>
                </div>
                <div class="p-5 md:p-8 flex flex-col justify-center border-l-0 md:border-l border-slate-100">
                    <span class="text-[10px] font-mono text-[#038DAE] font-bold tracking-widest mb-2">${spotlight.date}</span>
                    <h3 class="text-xl md:text-2xl font-black text-[#012A4F] uppercase italic leading-tight mb-3 group-hover:text-[#038DAE] transition-colors">
                        ${t(spotlight.title)}
                    </h3>
                    <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-3 mb-4">${t(spotlight.shortDesc)}</p>
                    <span class="text-[9px] font-bold text-[#038DAE] tracking-[0.25em] uppercase">ACCESS_FULL_REPORT →</span>
                </div>
            </a>
        `;
    }

    container.innerHTML = rest.map((item) => {
        const isLatest = item.id === latest.id;
        return `
        <a href="article.html?id=${item.id}" class="home-news-row group">
            <div class="thumb relative overflow-hidden">
                <img src="${newsCoverSrc(item, 500)}" alt="" class="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                     onerror="handleNewsImageError(this, '${item.id}')">
                ${isLatest ? '<div class="news-badge news-badge-latest news-badge-sm">LATEST</div>' : ''}
            </div>
            <div class="row-body">
                <span class="text-[8px] font-mono text-slate-400 font-bold uppercase mb-1">${item.date}</span>
                <h3 class="text-[12px] font-bold text-[#012A4F] uppercase leading-snug line-clamp-2 group-hover:text-[#038DAE] transition-colors">
                    ${t(item.title)}
                </h3>
            </div>
        </a>
    `;
    }).join('');
}

/**
 * Obsługa błędów dla zdjęć aktualności (id-main + rozszerzenia)
 */
function handleNewsImageError(img, id) {
    if (img.src.includes('main.jpg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/news/${id}/main.jpeg`;
    } else if (img.src.includes('main.jpeg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/news/${id}/main.png`;
    } else {
        img.onerror = null;
        img.src = 'https://via.placeholder.com/800x600?text=IMAGE_NOT_FOUND';
    }
}



window.bootHome = async function () {
    await initHeroGallery();
    renderHomeNews();
    renderHomeProjects();
    renderHomeTeam();
};