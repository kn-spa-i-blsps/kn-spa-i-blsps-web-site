// home.js

function renderHomeProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((proj, index) => {
        container.innerHTML += `
            <a href="project.html?id=${proj.id}" class="tech-card overflow-hidden group flex flex-col h-full">
                <div class="relative h-40 overflow-hidden border-b border-white/5">
                    <img src="${proj.image}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110">
                    <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 text-[9px] text-orange-500 border border-orange-500/30">
                        IMG_REF_0${index + 1}
                    </div>
                </div>

                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-[9px] font-bold text-gray-500 tracking-widest uppercase">SYS_LOG: ${proj.id}</span>
                    </div>
                    
                    <h3 class="text-md font-bold text-white mb-2 uppercase group-hover:text-orange-500 transition">
                        ${proj.title}
                    </h3>
                    
                    <p class="text-[11px] text-gray-500 leading-relaxed mb-6 flex-grow">
                        ${proj.shortDesc}
                    </p>
                    
                    <div class="text-[10px] font-bold text-orange-500/50 group-hover:text-orange-500 flex items-center gap-2 uppercase tracking-tighter">
                        DECRYPT_DATA <span class="group-hover:translate-x-1 transition">>></span>
                    </div>
                </div>
            </a>
        `;
    });
}

function renderHomeTeam() {
    const container = document.getElementById('team-scroll-container');
    if (!container) return;
    container.innerHTML = "";

    const projectColors = {
        "musc": "text-red-500 border-red-500/30 bg-red-500/5",
        "flysearch": "text-green-400 border-green-400/30 bg-green-400/5",
        "bluespark": "text-blue-400 border-blue-400/30 bg-blue-400/5",
        "hawk-eye": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
        "snows-eye": "text-white border-white/30 bg-white/5"
    };

    // 1. Sortowanie członków zespołu na podstawie pola 'ordering' ich projektów
    const sortedMembers = [...members].sort((a, b) => {
        // Znajdź wszystkie projekty osoby A i wybierz ten z najniższym (najlepszym) orderingiem
        const minOrderA = Math.min(...projects.filter(p => p.teamIds.includes(a.id)).map(p => p.ordering || 999));
        // To samo dla osoby B
        const minOrderB = Math.min(...projects.filter(p => p.teamIds.includes(b.id)).map(p => p.ordering || 999));
        
        return minOrderA - minOrderB;
    });

    sortedMembers.forEach(person => {
        // Tagi customowe (Pomarańczowe - PIERWSZE)
        const customBadges = (person.customTags || []).map(tag => `
            <span class="text-[8px] px-1.5 py-0.5 border border-orange-500/30 bg-orange-500/5 text-orange-500 uppercase tracking-tighter">
                ${tag}
            </span>
        `).join('');

        // Tagi projektowe (Kolorowe - DRUGIE)
        // Sortujemy je też tutaj, żeby wewnątrz karty projekty wyświetlały się od najważniejszego
        const personProjects = projects
            .filter(p => p.teamIds.includes(person.id))
            .sort((a, b) => (a.ordering || 999) - (b.ordering || 999));

        const projectBadges = personProjects.map(p => {
            const colorClass = projectColors[p.id] || "text-orange-500 border-orange-500/30 bg-orange-500/5";
            return `<span class="text-[8px] px-1.5 py-0.5 border uppercase tracking-tighter ${colorClass}">${p.title}</span>`;
        }).join('');

        container.innerHTML += `
            <a href="member.html?user=${person.id}" class="min-w-[240px] tech-card p-4 snap-center group transition-all">
                <div class="relative mb-4 overflow-hidden bg-[#141416]">
                    <img src="${person.img}" class="w-full h-56 object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110">
                </div>
                
                <h3 class="text-sm font-bold text-white uppercase tracking-tight group-hover:text-orange-500 transition">
                    ${person.name}
                </h3>
                <p class="text-[9px] text-orange-500 font-bold mt-1 tracking-widest uppercase italic mb-3">
                    ${person.role}
                </p>

                <div class="flex flex-wrap gap-1 mt-auto border-t border-white/5 pt-3">
                    ${customBadges} 
                    ${projectBadges}
                </div>
            </a>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderHomeProjects();
    renderHomeTeam();
});