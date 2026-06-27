// team.js

const projectColors = {
    "musc": "text-red-400 border-red-400/30 bg-red-400/10",
    "flysearch": "text-green-400 border-green-400/30 bg-green-400/10",
    "bluespark": "text-blue-400 border-blue-400/30 bg-blue-400/10",
    "hawk-eye": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "snows-eye": "text-slate-300 border-slate-300/30 bg-slate-300/10"
};

function handleImageError(imgElement, secondarySrc, finalFallback) {
    if (!imgElement.dataset.triedJpeg) {
        imgElement.dataset.triedJpeg = "true";
        imgElement.src = secondarySrc;
    } else if (!imgElement.dataset.triedFallback) {
        imgElement.dataset.triedFallback = "true";
        imgElement.src = finalFallback;
    } else {
        imgElement.onerror = null;
        imgElement.src = 'https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/default.jpg';
    }
}

function renderTeam() {
    const container = document.getElementById('team-container');
    // const countDisplay = document.getElementById('member-count');
    if (!container) return;

    // countDisplay.innerText = members.length;

    // Sortowanie według priorytetu projektów
    const sortedMembers = [...members].sort((a, b) => {
        const minA = Math.min(...projects.filter(p => p.teamIds.includes(a.id)).map(p => p.ordering || 999));
        const minB = Math.min(...projects.filter(p => p.teamIds.includes(b.id)).map(p => p.ordering || 999));
        return minA - minB;
    });

    container.innerHTML = sortedMembers.map((person, index) => {
        const primarySrc = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/${t(person.id)}.jpg`;
        const secondarySrc = `https://res.cloudinary.com/dsrdp5vrr/image/upload/f_auto,q_auto,w_800,c_limit/kn-spa-i-blsps/members/${t(person.id)}.jpeg`;
        const fallbackSrc = person.img || "";

        // --- LOGIKA ZBIERANIA WSZYSTKICH TAGÓW ---
        const allTags = [];
        
        // 1. Tagi specjalne (Zarząd itp.)
        if (person.customTags) {
            person.customTags.forEach(tag => allTags.push({ 
                text: t(tag), 
                css: "text-[#038DAE] border-[#038DAE]/40 bg-[#038DAE]/10"
            }));
        }
        
        // 2. Tagi projektów
        projects.filter(p => p.teamIds.includes(person.id)).forEach(p => {
            allTags.push({ 
                text: p.title, 
                css: projectColors[p.id] || "text-[#038DAE] border-[#038DAE]/20" 
            });
        });

        // --- RENDEROWANIE DWÓCH PIERWSZYCH TAGÓW ---
        const visibleTagsHTML = allTags.slice(0, 2).map(tag => `
            <span class="text-[8px] px-2 py-0.5 border uppercase font-bold tracking-widest truncate max-w-[70px] ${tag.css}">
                ${tag.text}
            </span>
        `).join('');
        
        // Licznik pokaże się tylko jeśli tagów jest więcej niż 2
        const moreCount = allTags.length > 2 
            ? `<span class="text-[9px] text-[#038DAE] font-bold ml-1 opacity-70 tracking-tighter">+${allTags.length - 2}</span>` 
            : '';

        return `
            <a href="member.html?user=${t(person.id)}" class="blueprint-card p-4 flex flex-col group h-full">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-[8px] font-mono text-[#038DAE] opacity-50">#${String(index + 1).padStart(3, '0')}</span>
                    <div class="w-2 h-2 rounded-full status-blink status-glow"></div>
                </div>

                <div class="img-blueprint-wrap mb-4 aspect-[3/4]">
                    <img src="${primarySrc}" 
                         loading="lazy"
                         class="w-full h-full object-cover"
                         onerror="handleImageError(this, '${secondarySrc}', '${fallbackSrc}')">
                </div>

                <div class="flex-grow">
                    <h2 class="text-lg font-black text-white uppercase tracking-tighter italic leading-tight group-hover:text-[#4ade80] transition-colors">
                        ${t(person.name)}
                    </h2>
                    <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1 mb-4">
                        ${t(person.role)}
                    </p>
                </div>

                <div class="flex items-center gap-1 mt-auto pt-3 border-t border-[#038DAE]/20 overflow-hidden">
                    ${visibleTagsHTML}
                    ${moreCount}
                </div>
            </a>
        `;
    }).join('');
}

window.bootTeam = renderTeam;