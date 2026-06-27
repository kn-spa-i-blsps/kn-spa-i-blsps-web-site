// project.js - Optimized Sequential Slider

let allProjectImages = [];
let currentSliderIndex = 0;
let mainSliderInterval;
const MAX_GALLERY_IMAGES = 10; 
const SLIDE_DURATION = 5000; 

window.bootProject = function bootProject() {
    const urlParams = new URLSearchParams(window.location.search);
    let projId = urlParams.get('id');
    if (!projId && location.pathname.includes('/project/')) {
        projId = location.pathname.split('/').filter(Boolean).pop();
    }
    const project = projects.find(p => p.id === projId);

    if (!project) return;

    allProjectImages = [];
    clearInterval(mainSliderInterval);

    renderHeader(project);
    renderProjectGallery(project);
    renderDescription(project);
    renderTeamSection(project);
};


/**
 * 1. NAGŁÓWEK
 */
function renderHeader(project) {
    const headerContainer = document.getElementById('project-header');
    const projId = t(project.id);
    
    const logoHTML = `
        <div id="logo-wrap-${projId}" class="hidden flex-shrink-0 mb-4 md:mb-0">
             <img src="${Img.cld(`projects/${projId}/logo`, 'f_auto,q_auto,w_800')}" 
                  data-hide-on-fail="1"
                  class="h-20 md:h-28 w-auto object-contain border-r border-[#038DAE]/30 pr-8 mr-2"
                  onload="this.parentElement.classList.remove('hidden')"
                  onerror="handleConventionImageError(this, 'projects/${projId}/logo', 'f_auto,q_auto,w_800', '')">
        </div>`;

    headerContainer.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center gap-8 w-full">
            ${logoHTML}
            <div class="flex flex-col gap-2 flex-grow">
                <div class="flex items-center gap-3 mb-2">
                    <span class="text-[#038DAE] text-[10px] font-bold tracking-[0.4em] uppercase">Node_ID:</span>
                    <span class="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">${projId}</span>
                </div>
                <h1 class="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] italic">${t(project.title)}</h1>
                ${project.fullTitle ? `<div class="text-white/70 text-sm md:text-xl font-light tracking-wide mt-4 border-l-2 border-[#038DAE] pl-6 italic leading-relaxed">${t(project.fullTitle)}</div>` : ''}
            </div>
        </div>`;
}

/**
 * 2. GŁÓWNA GALERIA (AUTO-SLIDER + SEKWENCYJNE ŁADOWANIE)
 */
async function renderProjectGallery(project) {
    const container = document.getElementById('project-visuals');
    if (!container) return;
    
    const projId = t(project.id);
    const mainImgUrl = Img.resolveProjectImage(project, projId, 1200);
    
    allProjectImages = [mainImgUrl];

    container.innerHTML = `
        <div class="header-accent mb-8">
            <h2 class="text-xl font-bold uppercase tracking-tighter text-[#012A4F]">Visual_Output</h2>
        </div>
        
        <div id="main-photo-box" class="relative group mb-6 h-[600px] overflow-hidden data-block bg-slate-900 shadow-2xl">
            <img id="main-img-element" src="${mainImgUrl}" 
                 class="w-full h-full object-cover transition-opacity duration-700 opacity-100 cursor-pointer" 
                 onclick="openLightbox(currentSliderIndex)">
            
            <div class="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onclick="changeProjectSlide(-1)" class="p-4 bg-black/40 text-white hover:bg-[#038DAE] transition-all backdrop-blur-sm border border-white/10 pointer-events-auto">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onclick="changeProjectSlide(1)" class="p-4 bg-black/40 text-white hover:bg-[#038DAE] transition-all backdrop-blur-sm border border-white/10 pointer-events-auto">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            <div id="slider-dots" class="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-6"></div>

            <div class="absolute top-4 left-4 bg-[#038DAE] text-white text-[10px] px-3 py-1 font-bold tracking-[0.3em] uppercase">
                LIVE_ARCHIVE // NODE_${projId}
            </div>
        </div>
    `;

    for (let i = 1; i <= MAX_GALLERY_IMAGES; i++) {
        let foundAnyFormat = false;

        for (const ext of Img.EXT) {
            const url = Img.cldExt(`projects/${projId}/${i}`, ext, 'f_auto,q_auto,w_1200');
            const exists = await Img.checkExists(url);
            
            if (exists) {
                allProjectImages.push(url);
                foundAnyFormat = true;
                break; // Znaleźliśmy ten numer, przejdź do i+1
            }
        }

        if (!foundAnyFormat) {
            // PRZERWIJ PĘTLĘ: Nie znaleźliśmy zdjęcia o numerze i w żadnym formacie
            break; 
        }
    }

    updateSliderDots();
    startProjectAutoSlider();
}

function startProjectAutoSlider() {
    clearInterval(mainSliderInterval);
    mainSliderInterval = setInterval(() => {
        if (allProjectImages.length > 1) {
            changeProjectSlide(1);
        }
    }, SLIDE_DURATION);
}

function changeProjectSlide(step) {
    if (allProjectImages.length <= 1) return;

    currentSliderIndex = (currentSliderIndex + step + allProjectImages.length) % allProjectImages.length;
    
    const imgElement = document.getElementById('main-img-element');
    if (!imgElement) return;

    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = allProjectImages[currentSliderIndex];
        imgElement.onload = () => imgElement.style.opacity = '1';
        updateSliderDots();
    }, 400);
}

function updateSliderDots() {
    const dotsContainer = document.getElementById('slider-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = allProjectImages.map((_, i) => `
        <div class="h-1 transition-all duration-500 ${i === currentSliderIndex ? 'w-12 bg-[#038DAE]' : 'w-3 bg-white/20'}"></div>
    `).join('');
}


/**
 * 3. OPIS I ZESPÓŁ
 */
function renderDescription(project) {
    let content = `<div class="text-[#012A4F]/80 text-sm leading-relaxed mb-12 font-medium">${t(project.fullDesc)}</div>`;
    if (project.spec) {
        content += `<div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#038DAE]/20 border border-[#038DAE]/20">
            ${project.spec.map(s => `<div class="flex justify-between items-center p-5 bg-white group hover:bg-slate-50 transition-colors">
                <span class="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-bold">${t(s.label)}</span>
                <span class="text-[#038DAE] text-[11px] font-bold font-mono">${t(s.value)}</span>
            </div>`).join('')}</div>`;
    }
    document.getElementById('project-description').innerHTML = content;
}

function renderTeamSection(project) {
    const teamContainer = document.getElementById('project-team');
    if (!teamContainer || !project.teamIds) return;
    teamContainer.innerHTML = project.teamIds.map(mId => {
        const person = members.find(m => m.id.trim() === mId.trim());
        if (!person) return "";
        const memberId = t(person.id);
        const defaultMember = Img.cld('members/default', 'f_auto,q_auto,w_400');
        const photoSrc = Img.srcForApiImage(person.photo, 400) || Img.cld(`members/${memberId}`, 'f_auto,q_auto,w_400');
        return `<a href="member.html?user=${memberId}" class="flex items-center gap-4 p-4 data-block hover:border-[#038DAE] transition-all group mb-4 bg-white">
            <div class="w-12 h-16 flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                <img src="${photoSrc}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" onerror="handleConventionImageError(this, 'members/${memberId}', 'f_auto,q_auto,w_400', '${defaultMember}')">
            </div>
            <div>
                <p class="text-[14px] font-bold text-[#012A4F] uppercase group-hover:text-[#038DAE]">${t(person.name)}</p>
                <p class="text-[11px] text-[#038DAE] uppercase tracking-widest font-bold mt-0.5">${t(person.role)}</p>
            </div></a>`;
    }).join('');
}


/**
 * 4. LIGHTBOX
 */
function openLightbox(index) {
    currentSliderIndex = index;
    const lb = document.getElementById('lightbox');
    if (lb) lb.style.display = 'flex';
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    currentSliderIndex = (currentSliderIndex + step + allProjectImages.length) % allProjectImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    if (!img) return;
    img.style.opacity = '0';
    img.src = allProjectImages[currentSliderIndex];
    img.onload = () => {
        img.style.opacity = '1';
        counter.innerText = `DATA_REF_0${currentSliderIndex + 1} // TOTAL_${allProjectImages.length}`;
    };
}