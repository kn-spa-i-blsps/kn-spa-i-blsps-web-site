let allProjectImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projId = urlParams.get('id');
    const project = projects.find(p => p.id === projId);

    if (!project) return;

    // 1. TO MUSI BYĆ PIERWSZE: Przygotuj listę zdjęć (0 to główne, potem reszta)
    allProjectImages = [project.image]; 
    if (project.gallery && project.gallery.length > 0) {
        allProjectImages = [...allProjectImages, ...project.gallery];
    }

    // 2. Czyścimy kontenery przed renderowaniem, żeby uniknąć konfliktów
    document.getElementById('project-visuals').innerHTML = "";
    document.getElementById('project-description').innerHTML = "";
    document.getElementById('project-team').innerHTML = "";

    // 3. Renderowanie nagłówka
    // Renderowanie nagłówka w project.js
    // Renderowanie nagłówka w project.js
    const headerContainer = document.getElementById('project-header');

    // Sprawdzamy, czy projekt ma fullTitle
    // Usunięto max-w-2xl, dodano w-full, aby tekst mógł zająć całą szerokość nad zdjęciem
    const fullTitleHTML = project.fullTitle 
        ? `<div class="text-gray-500 text-sm md:text-xl font-light tracking-wide mt-3 w-full border-l border-orange-500/30 pl-4 italic leading-relaxed">
            ${project.fullTitle}
        </div>` 
        : '';

    headerContainer.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            <div class="flex items-center gap-3">
                <span class="text-orange-500 text-[10px] font-bold tracking-[0.4em] uppercase">Project_Node:</span>
                <span class="text-gray-500 text-[10px] font-bold tracking-[0.4em] uppercase">${project.id}</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                ${project.title}
            </h1>
            ${fullTitleHTML}
        </div>
    `;

    // 4. Wywołanie funkcji
    renderGallery(project);
    renderDescription(project);
    renderTeamSection(project);
});

function renderGallery(project) {
    const container = document.getElementById('project-visuals');
    if (!container) return;
    
    // Czyścimy kontener, żeby nie dublować nagłówka "Visual_Output"
    container.innerHTML = `
        <div class="header-accent mb-6">
            <h2 class="text-xl font-bold uppercase tracking-tighter text-white">Visual_Output</h2>
        </div>
    `;

    const LIMIT = 3;
    
    // Zdjęcie główne - upewnij się, że project.image istnieje
    const mainImgSrc = project.image || 'https://via.placeholder.com/1200x800?text=NO_IMAGE';

    let galleryHTML = `
        <div class="relative group mb-4 h-[500px] overflow-hidden border border-white/10 cursor-pointer bg-[#141416]" onclick="openLightbox(0)">
            <img src="${mainImgSrc}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-0" onload="this.style.opacity='1'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        </div>
    `;

    // Miniaturki
    if (project.gallery && project.gallery.length > 0) {
        galleryHTML += `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">`;
        project.gallery.forEach((img, idx) => {
            const isHidden = idx >= LIMIT ? 'hidden' : '';
            galleryHTML += `
                <div class="gallery-item ${isHidden} relative h-32 overflow-hidden border border-white/10 group cursor-pointer bg-[#141416]">
                    <img src="${img}" onclick="openLightbox(${idx + 1})" class="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-0" onload="this.style.opacity='1'">
                </div>`;
        });
        galleryHTML += `</div>`;

        if (project.gallery.length > LIMIT) {
            galleryHTML += `
                <button id="btn-expand-gallery" class="w-full py-4 border border-dashed border-white/20 text-[10px] font-bold text-gray-500 hover:text-orange-500 hover:border-orange-500/50 transition-all uppercase mt-4">
                    + Expand_Visual_Data (${project.gallery.length - LIMIT}_files)
                </button>`;
        }
    }
    
    container.innerHTML += galleryHTML;

    // Obsługa przycisku rozwijania
    const btn = document.getElementById('btn-expand-gallery');
    if (btn) {
        btn.onclick = () => {
            document.querySelectorAll('.gallery-item.hidden').forEach(el => el.classList.remove('hidden'));
            btn.remove();
        };
    }
}

// --- OBSŁUGA LIGHTBOXA ---

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Blokada scrolla tła
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    currentImageIndex += step;
    if (currentImageIndex >= allProjectImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = allProjectImages.length - 1;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    
    if (!img || !allProjectImages[currentImageIndex]) return;

    img.style.opacity = '0';
    
    // Tworzymy tymczasowy obiekt obrazu, żeby załadować go w tle
    const tempImg = new Image();
    tempImg.src = allProjectImages[currentImageIndex];
    tempImg.onload = () => {
        img.src = tempImg.src;
        img.style.opacity = '1';
        counter.innerText = `IMG_0${currentImageIndex + 1} // TOTAL_${allProjectImages.length}`;
    };
}

// Funkcje renderujące opis i zespół (zostają bez zmian jak wcześniej)
function renderDescription(project) {
    let contentHTML = `<div class="text-gray-400 text-sm leading-relaxed mb-10">${project.fullDesc}</div>`;
    if (project.spec) {
        contentHTML += `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                ${project.spec.map(s => `
                    <div class="flex justify-between p-4 bg-[#0a0a0b] group">
                        <span class="text-gray-500 text-[9px] uppercase tracking-widest">${s.label}</span>
                        <span class="text-orange-500 text-[9px] font-bold group-hover:text-white transition">${s.value}</span>
                    </div>
                `).join('')}
            </div>`;
    }
    document.getElementById('project-description').innerHTML = contentHTML;
}

function renderTeamSection(project) {
    const teamContainer = document.getElementById('project-team');
    if (project.teamIds) {
        project.teamIds.forEach(mId => {
            const person = members.find(m => m.id.trim() === mId.trim());
            if (person) {
                teamContainer.innerHTML += `
                    <a href="member.html?user=${person.id}" class="data-block p-4 flex items-center gap-4 hover:border-orange-500/50 transition group bg-white/5 border border-white/10 mb-2">
                        <img src="${person.img}" class="w-12 h-12 object-cover border border-white/10 group-hover:border-orange-500 transition">
                        
                        <div>
                            <p class="text-sm font-bold text-white uppercase group-hover:text-orange-500 transition leading-tight">
                                ${person.name}
                            </p>
                            <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                                ${person.role}
                            </p>
                        </div>
                    </a>`;
            }
        });
    }
}