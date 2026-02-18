// home.js

/**
 * 1. RENDEROWANIE PROJEKTÓW NA STRONIE GŁÓWNEJ
 */
function renderHomeProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((proj, index) => {
        // Dynamiczna ścieżka do zdjęcia głównego projektu
        const mainImgPath = `gallery/projects/${proj.id}/main.jpg`;

        container.innerHTML += `
            <a href="project.html?id=${proj.id}" class="tech-card overflow-hidden group flex flex-col h-full shadow-sm">
                <div class="relative h-40 overflow-hidden border-b border-slate-100">
                    <img src="${mainImgPath}" 
                         class="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                         onerror="handleHomeProjectImageError(this, '${proj.id}', '${proj.image}')">
                    <div class="absolute top-2 left-2 bg-[#038DAE] px-2 py-1 text-[9px] text-white font-bold border border-[#038DAE]/30 shadow-lg">
                        IMG_REF_0${index + 1}
                    </div>
                </div>

                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-[9px] font-bold text-slate-400 tracking-widest uppercase italic">SYS_LOG: ${proj.id}</span>
                    </div>
                    
                    <h3 class="text-md font-bold text-[#012A4F] mb-2 uppercase group-hover:text-[#038DAE] transition">
                        ${proj.title}
                    </h3>
                    
                    <p class="text-[11px] text-slate-500 leading-relaxed mb-6 flex-grow">
                        ${proj.shortDesc}
                    </p>
                    
                    <div class="text-[10px] font-bold text-[#038DAE]/70 group-hover:text-[#038DAE] flex items-center gap-2 uppercase tracking-tighter">
                        DECRYPT_DATA <span class="group-hover:translate-x-1 transition">>></span>
                    </div>
                </div>
            </a>
        `;
    });
}

// Obsługa błędów formatów dla małych kafelków projektów
function handleHomeProjectImageError(img, id, fallback) {
    if (img.src.includes('main.jpg')) {
        img.src = `gallery/projects/${id}/main.jpeg`;
    } else if (img.src.includes('main.jpeg')) {
        img.src = `gallery/projects/${id}/main.png`;
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
        const primarySrc = `gallery/members/${person.id}.jpg`;
        const secondarySrc = `gallery/members/${person.id}.jpeg`;
        const fallbackSrc = person.img || "gallery/members/default.jpg";

        const customBadges = (person.customTags || []).map(tag => `
            <span class="text-[8px] px-1.5 py-0.5 border border-[#038DAE]/20 bg-[#038DAE]/5 text-[#038DAE] uppercase font-bold tracking-tighter">
                ${tag}
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
            <a href="member.html?user=${person.id}" class="min-w-[240px] tech-card p-4 snap-center group transition-transform duration-300 shadow-sm hover:shadow-md bg-white">
                <div class="relative mb-4 overflow-hidden bg-slate-100 aspect-[4/5]">
                    <img src="${primarySrc}" loading="lazy" class="w-full h-full object-cover"
                        onerror="handleImageError(this, '${secondarySrc}', '${fallbackSrc}')">
                </div>
                <h3 class="text-sm font-bold text-[#012A4F] uppercase tracking-tight group-hover:text-[#038DAE] transition-colors">${person.name}</h3>
                <p class="text-[9px] text-[#038DAE] font-bold mt-1 tracking-widest uppercase italic mb-3">${person.role}</p>
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
 * 3. DYNAMICZNY HERO SLIDER (SZUKANIE W GALLERY/MAIN)
 */
let currentSlide = 0;
let slideInterval;
let detectedHeroSlides = [];

async function initHeroGallery() {
    const galleryContainer = document.getElementById('hero-gallery');
    const dotsContainer = document.getElementById('gallery-dots');
    if (!galleryContainer) return;

    detectedHeroSlides = [];
    const extensions = ['jpg', 'jpeg', 'png'];
    const MAX_HERO_FILES = 10; // Sprawdzamy do 10 zdjęć w folderze gallery/main/

    // Brute-force szukanie zdjęć w gallery/main/1, 2, 3...
    for (let i = 1; i <= MAX_HERO_FILES; i++) {
        let found = false;
        for (const ext of extensions) {
            const path = `gallery/main/${i}.${ext}`;
            const exists = await checkIfFileExists(path);
            if (exists) {
                // Szukamy labeli/tytułów w heroSlides z data.js (jeśli są dopasowane po indeksie)
                const meta = (typeof heroSlides !== 'undefined' && heroSlides[i-1]) ? heroSlides[i-1] : { label: "ARCHIVE_DATA", title: `NODE_0${i}` };
                detectedHeroSlides.push({ img: path, label: meta.label, title: meta.title });
                found = true;
                break;
            }
        }
    }

    // Jeśli nic nie znalazło w folderze, spróbuj użyć starego heroSlides z data.js
    if (detectedHeroSlides.length === 0 && typeof heroSlides !== 'undefined') {
        detectedHeroSlides = heroSlides;
    }

    if (detectedHeroSlides.length === 0) return;

    // Renderowanie slajdów i kropek
    galleryContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    detectedHeroSlides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.img;
        img.className = `absolute inset-0 w-full h-full object-cover gallery-fade transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        img.id = `hero-img-${index}`;
        galleryContainer.appendChild(img);

        const dot = document.createElement('div');
        dot.className = `h-1 transition-all duration-500 ${index === 0 ? 'w-16 bg-[#038DAE]' : 'w-4 bg-slate-200'}`;
        dot.id = `hero-dot-${index}`;
        dotsContainer.appendChild(dot);
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

document.addEventListener('DOMContentLoaded', () => {
    renderHomeProjects();
    renderHomeTeam();
    initHeroGallery();
});