// project.js - Final Blueprint Edition (Fixed Member Images)

let allProjectImages = [];
let currentImageIndex = 0;
const GALLERY_LIMIT = 3; 

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projId = urlParams.get('id');
    const project = projects.find(p => p.id === projId);

    if (!project) return;

    allProjectImages = [];

    document.getElementById('project-visuals').innerHTML = "";
    document.getElementById('project-description').innerHTML = "";
    document.getElementById('project-team').innerHTML = "";

    renderHeader(project);
    renderGallery(project); 
    renderDescription(project);
    renderTeamSection(project);
});

/**
 * NAGŁÓWEK - Blueprint Dark Mode
 */
function renderHeader(project) {
    const headerContainer = document.getElementById('project-header');
    const fullTitleHTML = project.fullTitle 
        ? `<div class="text-white/70 text-sm md:text-xl font-light tracking-wide mt-4 border-l-2 border-[#038DAE] pl-6 italic leading-relaxed">${t(project.fullTitle)}</div>` 
        : '';

    headerContainer.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            <div class="flex items-center gap-3 mb-2">
                <span class="text-[#038DAE] text-[10px] font-bold tracking-[0.4em] uppercase">Node_ID:</span>
                <span class="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">${t(project.id)}</span>
            </div>
            <h1 class="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] italic">
                ${t(project.title)}
            </h1>
            ${fullTitleHTML}
        </div>
    `;
}

/**
 * GALERIA PROJEKTU
 */
function renderGallery(project) {
    const container = document.getElementById('project-visuals');
    if (!container) return;
    
    container.innerHTML = `
        <div class="header-accent mb-8">
            <h2 class="text-xl font-bold uppercase tracking-tighter text-[#012A4F]">Visual_Output</h2>
        </div>
        <div id="main-photo-box" class="relative group mb-6 h-[500px] overflow-hidden data-block cursor-pointer bg-slate-100" onclick="openLightbox(0)">
            <img id="main-img-element" src="https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/projects/${t(project.id)}/main.jpg" 
                 class="w-full h-full object-cover transition duration-700 opacity-0" 
                 onload="this.style.opacity='1'"
                 onerror="handleMainImageError(this, '${t(project.id)}', '${t(project.image)}')">
            <div class="absolute inset-0 bg-gradient-to-t from-[#012A4F]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div class="absolute bottom-4 left-4 bg-[#038DAE] text-white text-[9px] px-2 py-1 font-bold tracking-widest">PRIMARY_FEED</div>
        </div>
        <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 gap-6"></div>
        <button id="btn-expand-gallery" class="hidden w-full py-5 border border-dashed border-[#038DAE]/30 text-[10px] font-bold text-[#038DAE] hover:bg-[#038DAE]/5 hover:border-[#038DAE] transition-all uppercase mt-6 tracking-[0.2em]">
            [ + ] Expand_Visual_Archive
        </button>
    `;

    allProjectImages[0] = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/projects/${t(project.id)}/main.jpg`;
    const grid = document.getElementById('gallery-grid');
    const expandBtn = document.getElementById('btn-expand-gallery');
    const extensions = ['jpg', 'jpeg', 'png'];

    expandBtn.onclick = () => {
        document.querySelectorAll('.gallery-item-extra').forEach(el => el.classList.remove('hidden'));
        expandBtn.remove();
    };

    for (let i = 1; i <= 15; i++) {
        checkExtension(project.id, i, 0, extensions, grid, expandBtn);
    }
}

function checkExtension(projId, num, extIdx, extensions, grid, expandBtn) {
    if (extIdx >= extensions.length) return;
    const path = `gallery/projects/${projId}/${num}.${extensions[extIdx]}`;
    const tempImg = new Image();
    tempImg.onload = () => {
        allProjectImages.push(path);
        const newIndex = allProjectImages.length - 1;
        const isOverLimit = (allProjectImages.length - 1) > GALLERY_LIMIT;
        const item = document.createElement('div');
        item.className = `gallery-item ${isOverLimit ? 'gallery-item-extra hidden' : ''} relative h-36 overflow-hidden data-block group cursor-pointer bg-white`;
        item.innerHTML = `<img src="${path}" onclick="openLightbox(${newIndex})" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">`;
        grid.appendChild(item);
        if (isOverLimit && expandBtn) expandBtn.classList.remove('hidden');
    };
    tempImg.onerror = () => checkExtension(projId, num, extIdx + 1, extensions, grid, expandBtn);
    tempImg.src = path;
}

/**
 * OPIS I SPECYFIKACJA
 */
function renderDescription(project) {
    let contentHTML = `<div class="text-[#012A4F]/80 text-sm leading-relaxed mb-12 font-medium">${t(project.fullDesc)}</div>`;
    if (project.spec) {
        contentHTML += `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#038DAE]/20 border border-[#038DAE]/20 shadow-sm">
                ${project.spec.map(s => `
                    <div class="flex justify-between items-center p-5 bg-white group hover:bg-slate-50 transition-colors">
                        <span class="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-bold">${t(s.label)}</span>
                        <span class="text-[#038DAE] text-[11px] font-bold font-mono tracking-tighter">${t(s.value)}</span>
                    </div>
                `).join('')}
            </div>`;
    }
    document.getElementById('project-description').innerHTML = contentHTML;
}

/**
 * ZESPÓŁ - Naprawiona obsługa wielu formatów zdjęć
 */
function renderTeamSection(project) {
    const teamContainer = document.getElementById('project-team');
    if (!teamContainer || !project.teamIds) return;

    teamContainer.innerHTML = project.teamIds.map(mId => {
        const person = members.find(m => m.id.trim() === mId.trim());
        if (!person) return "";

        // Startujemy od JPG, resztę sprawdzi handleMemberImageError
        return `
            <a href="member.html?user=${t(person.id)}" class="flex items-center gap-4 p-4 data-block hover:border-[#038DAE] transition-all group mb-4">
                <div class="w-12 h-16 flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                    <img src="https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/members/${t(person.id)}.jpg" 
                         class="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                         onerror="handleMemberImageError(this, '${t(person.id)}')">
                </div>
                <div>
                    <p class="text-[14px] font-bold text-[#012A4F] uppercase group-hover:text-[#038DAE] transition-colors">${t(person.name)}</p>
                    <p class="text-[11px] text-[#038DAE] uppercase tracking-widest font-bold mt-0.5">${t(person.role)}</p>
                </div>
            </a>`;
    }).join('');
}

/**
 * OBSŁUGA BŁĘDÓW ZDJĘĆ CZŁONKÓW (JPG -> JPEG -> PNG -> DEFAULT)
 */
function handleMemberImageError(img, memberId) {
    if (img.src.includes('.jpg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/members/${memberId}.jpeg`;
    } else if (img.src.includes('.jpeg')) {
        img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/members/${memberId}.png`;
    } else {
        img.onerror = null;
        img.src = 'https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/members/default.jpg'; // Upewnij się, że masz ten plik lub zmień na placeholder
    }
}

/**
 * LIGHTBOX LOGIC
 */
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
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
    if (!img) return;
    img.style.opacity = '0';
    img.src = allProjectImages[currentImageIndex];
    img.onload = () => {
        img.style.opacity = '1';
        counter.innerText = `DATA_REF_0${currentImageIndex + 1} // TOTAL_${allProjectImages.length}`;
    };
}

function handleMainImageError(img, projId, fallback) {
    if (img.src.includes('main.jpg')) img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/projects/${projId}/main.jpeg`;
    else if (img.src.includes('main.jpeg')) img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto/kn-spa-i-blsps/projects/${projId}/main.png`;
    else if (img.src.includes('main.png') && fallback) img.src = fallback;
    else { img.onerror = null; img.src = 'https://via.placeholder.com/1200x800?text=IMAGE_NOT_FOUND'; }
    allProjectImages[0] = img.src;
}