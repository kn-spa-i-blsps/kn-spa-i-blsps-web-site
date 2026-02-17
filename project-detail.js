let allProjectImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projId = urlParams.get('id');
    const project = projects.find(p => p.id === projId);

    if (!project) return;

    // Przygotuj listę zdjęć dla galerii
    allProjectImages = [project.image, ...(project.gallery || [])];

    // Renderowanie nagłówka
    document.getElementById('project-header').innerHTML = `
        <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2">${project.title}</h1>
        <div class="text-orange-500 text-[10px] font-bold tracking-[0.5em] uppercase">Ref_ID: ${project.id}</div>
    `;

    renderGallery(project);
    renderDescription(project);
    renderTeamSection(project);

    // Obsługa klawiatury dla galerii
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "Escape") closeLightbox();
        }
    });
});

function renderGallery(project) {
    const container = document.getElementById('project-visuals');
    const LIMIT = 3;
    
    // Zdjęcie główne
    let galleryHTML = `
        <div class="relative group mb-4 h-[500px] overflow-hidden border border-white/10 cursor-pointer" onclick="openLightbox(0)">
            <img src="${project.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
        </div>
    `;

    // Miniaturki
    if (project.gallery && project.gallery.length > 0) {
        galleryHTML += `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">`;
        project.gallery.forEach((img, idx) => {
            const isHidden = idx >= LIMIT ? 'hidden' : '';
            // Indeks w allProjectImages to idx + 1 (bo 0 to zdjęcie główne)
            galleryHTML += `
                <div class="gallery-item ${isHidden} relative h-32 overflow-hidden border border-white/10 group cursor-pointer" onclick="openLightbox(${idx + 1})">
                    <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
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

    const btn = document.getElementById('btn-expand-gallery');
    if (btn) {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gallery-item.hidden').forEach(el => el.classList.remove('hidden'));
            btn.remove();
        });
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
    
    // Efekt przejścia
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = allProjectImages[currentImageIndex];
        img.style.opacity = '1';
        counter.innerText = `IMG_0${currentImageIndex + 1} // TOTAL_${allProjectImages.length}`;
    }, 150);
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
                    <a href="profil.html?user=${person.id}" class="data-block p-4 flex items-center gap-4 hover:border-orange-500/50 transition group">
                        <img src="${person.img}" class="w-10 h-10 object-cover border border-white/10 group-hover:border-orange-500 transition">
                        <div>
                            <p class="text-[11px] font-bold text-white uppercase group-hover:text-orange-500 transition">${person.name}</p>
                            <p class="text-[8px] text-gray-600 uppercase tracking-tighter">${person.role}</p>
                        </div>
                    </a>`;
            }
        });
    }
}