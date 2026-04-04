let allArticleImages = []; 
let currentLightboxIndex = 0;

async function initArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const item = news.find(n => n.id === id);

    if (!item) { window.location.href = 'index.html'; return; }

    document.title = `${t(item.title)} | SPA & BLSPS`;
    document.getElementById('article-date').innerText = `TIMESTAMP: ${item.date}`;
    document.getElementById('article-title').innerText = t(item.title);
    document.getElementById('article-content').innerHTML = t(item.fullDesc);

    const mainImgEl = document.getElementById('article-main-img');
    const mainImgUrl = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_1600/kn-spa-i-blsps/news/${id}/main.jpg`;
    
    if (mainImgEl) {
        mainImgEl.src = mainImgUrl;
        mainImgEl.onload = () => mainImgEl.classList.remove('opacity-0');
    }

    renderArticleLinks(item);
    await loadAndRenderGridGallery(id, mainImgUrl);
}

async function loadAndRenderGridGallery(id, mainImgUrl) {
    const gridContainer = document.getElementById('article-gallery-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = ""; 
    allArticleImages = []; // Reset puli zdjęć

    // 1. DODAJEMY ZDJĘCIE GŁÓWNE JAKO PIERWSZE W DOKUMENTACJI
    allArticleImages.push(mainImgUrl);
    renderGridItem(mainImgUrl.replace('w_1600', 'w_600'), 0, "MAIN_TRACK");

    // 2. SZUKAMY KOLEJNYCH ZDJĘĆ 1-15
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];

    for (let i = 1; i <= 15; i++) {
        let foundAnyFormat = false;
        let validUrl = '';

        for (const ext of extensions) {
            const url = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_600/kn-spa-i-blsps/news/${id}/${i}.${ext}`;
            if (await checkIfFileExists(url)) {
                validUrl = url;
                foundAnyFormat = true;
                break;
            }
        }

        if (foundAnyFormat) {
            allArticleImages.push(validUrl.replace('w_600', 'w_1600'));
            renderGridItem(validUrl, allArticleImages.length - 1, `DATA_NODE_0${i}`);
        } else {
            break; 
        }
    }
}

function renderGridItem(url, lightboxIndex, label) {
    const gridContainer = document.getElementById('article-gallery-grid');
    
    const itemHtml = `
        <div class="break-inside-avoid group relative overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer mb-4" 
             onclick="openLightbox(${lightboxIndex})">
            
            <img src="${url}" 
                 alt="Gallery image" 
                 class="w-full h-auto block transition-transform duration-700 group-hover:scale-110 opacity-0"
                 onload="this.classList.remove('opacity-0')">
            
            <div class="absolute inset-0 bg-[#012A4F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div class="text-[#038DAE] font-mono text-[9px] tracking-widest uppercase mb-1">VIEW_FULLRES</div>
                <div class="text-white font-bold text-xs uppercase italic tracking-tight">${label} // >></div>
            </div>
        </div>
    `;
    gridContainer.insertAdjacentHTML('beforeend', itemHtml);
}

// --- LIGHTBOX LOGIC ---

function openLightbox(index) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    currentLightboxIndex = index;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if(lb) {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
    }
    document.body.style.overflow = '';
}

function changeLightboxSlide(step) {
    currentLightboxIndex = (currentLightboxIndex + step + allArticleImages.length) % allArticleImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    if (!img) return;
    img.src = allArticleImages[currentLightboxIndex];
    if (counter) counter.innerText = `VISUAL_ARCHIVE_NODE: ${currentLightboxIndex + 1} / ${allArticleImages.length}`;
}

// Reszta funkcji pomocniczych (renderArticleLinks, checkIfFileExists) bez zmian...
function renderArticleLinks(item) {
    const linksContainer = document.getElementById('article-links');
    if (!linksContainer) return;
    if (item.links && item.links.length > 0) {
        linksContainer.innerHTML = item.links.map(link => `
            <a href="${link.url}" target="_blank" class="flex flex-col group/link border-b border-slate-200 pb-5 pt-2 hover:border-[#038DAE] transition-all">
                <span class="text-[#038DAE] text-[10px] uppercase font-black tracking-[0.2em] mb-2 opacity-80 group-hover/link:opacity-100">
                    ${t(link.label)}
                </span>
                <div class="flex items-center justify-between">
                    <span class="text-[#012A4F] text-sm font-bold tracking-tight group-hover/link:text-[#038DAE] transition-colors uppercase italic">ACCESS_RESOURCE</span>
                    <span class="text-[#038DAE] font-bold transform group-hover/link:translate-x-2 transition-transform duration-300">// >></span>
                </div>
            </a>
        `).join('');
    } else {
        linksContainer.innerHTML = `<div class="py-4 px-2 border border-dashed border-slate-200 text-center text-[11px] font-bold text-slate-400 tracking-widest uppercase italic">NO_RESOURCES</div>`;
    }
}

function checkIfFileExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

document.addEventListener('DOMContentLoaded', initArticle);