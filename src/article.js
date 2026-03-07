let slideIndex = 0;
let slides = [];

async function initArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const item = news.find(n => n.id === id);

    if (!item) { window.location.href = 'index.html'; return; }

    // 1. Podstawowe dane
    document.title = `${t(item.title)} | SPA & BLSPS`;
    document.getElementById('article-date').innerText = `TIMESTAMP: ${item.date}`;
    document.getElementById('article-title').innerText = t(item.title);
    document.getElementById('article-content').innerHTML = t(item.fullDesc);
    document.getElementById('info-id').innerText = id.toUpperCase();

    // 2. Linki / Zasoby
    const linksContainer = document.getElementById('article-links');
    if (item.links && item.links.length > 0) {
        linksContainer.innerHTML = item.links.map(link => `
            <a href="${link.url}" target="_blank" class="flex flex-col group/link border-b border-slate-200 pb-5 pt-2 hover:border-[#038DAE] transition-all">
                <span class="text-[#038DAE] text-[10px] md:text-[11px] uppercase font-black tracking-[0.2em] mb-2 opacity-80 group-hover/link:opacity-100">
                    ${t(link.label)}
                </span>
                
                <div class="flex items-center justify-between">
                    <span class="text-[#012A4F] text-sm md:text-base font-bold tracking-tight group-hover/link:text-[#038DAE] transition-colors uppercase italic">
                        ACCESS_RESOURCE
                    </span>
                    <span class="text-[#038DAE] font-bold transform group-hover/link:translate-x-2 transition-transform duration-300">
                        // >>
                    </span>
                </div>
            </a>
        `).join('');
    } else {
        linksContainer.innerHTML = `
            <div class="py-4 px-2 border border-dashed border-slate-200 text-center">
                <p class="text-[11px] font-bold text-slate-400 tracking-widest uppercase italic">NO_EXTERNAL_LINKS_FOUND</p>
            </div>
        `;
    }

    // 3. Automatyczny Hero Slider & Galeria
    const slider = document.getElementById('hero-slider-container');
    const gallery = document.getElementById('article-gallery');
    const dots = document.getElementById('slider-dots');
    const extensions = ['jpg', 'jpeg', 'png'];
    
    // Szukamy id-main oraz id-1 do id-10
    const imageNames = [`${id}-main`, ...Array.from({length: 10}, (_, i) => `${id}-${i+1}`)];
    
    let foundCount = 0;

    for (const name of imageNames) {
        let imgUrl = null;
        for (const ext of extensions) {
            const testUrl = `https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/news/${name}.${ext}`;
            if (await checkIfFileExists(testUrl)) { imgUrl = testUrl; break; }
        }

        if (imgUrl) {
            // Dodaj do slidera (tylko pierwsze 4 zdjęcia)
            if (foundCount < 4) {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.className = `absolute inset-0 w-full h-full object-cover gallery-fade ${foundCount === 0 ? 'opacity-100' : 'opacity-0'}`;
                slider.appendChild(img);
                
                const dot = document.createElement('div');
                dot.className = `h-1 transition-all duration-500 ${foundCount === 0 ? 'w-12 bg-[#038DAE]' : 'w-4 bg-white/30'}`;
                dots.appendChild(dot);
                slides.push({img, dot});
            }
            
            // Dodaj wszystko do dolnej galerii
            const gItem = document.createElement('div');
            // overflow-hidden jest kluczowe, żeby zdjęcie nie "wyszło" poza ramkę przy skali
            gItem.className = "aspect-square overflow-hidden bg-slate-100 border border-slate-200 group/gallery-item cursor-pointer";

            gItem.innerHTML = `
                <img src="${imgUrl}" 
                    class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/gallery-item:scale-110">
            `;

            gallery.appendChild(gItem);
            
            foundCount++;
        }
    }

    if (slides.length > 1) startSlider();
}

function startSlider() {
    setInterval(() => {
        const prev = slideIndex;
        slideIndex = (slideIndex + 1) % slides.length;
        
        slides[prev].img.classList.replace('opacity-100', 'opacity-0');
        slides[slideIndex].img.classList.replace('opacity-0', 'opacity-100');
        
        slides[prev].dot.className = 'h-1 w-4 bg-white/30 transition-all duration-500';
        slides[slideIndex].dot.className = 'h-1 w-12 bg-[#038DAE] transition-all duration-500';
    }, 5000);
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