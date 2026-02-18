// home.js

function renderHomeProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((proj, index) => {
        container.innerHTML += `
            <a href="project.html?id=${proj.id}" class="tech-card overflow-hidden group flex flex-col h-full shadow-sm">
                <div class="relative h-40 overflow-hidden border-b border-slate-100">
                    <img src="${proj.image}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
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

function renderHomeTeam() {
    const container = document.getElementById('team-scroll-container');
    if (!container) return;
    container.innerHTML = "";

    // Zmiana kolorystyki projektów na pastelową/czytelną na jasnym tle
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

    sortedMembers.forEach(person => {
        // Tagi customowe: Teraz w kolorze błękitnym (#038DAE)
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

        container.innerHTML += `
            <a href="member.html?user=${person.id}" class="min-w-[240px] tech-card p-4 snap-center group transition-all shadow-sm">
                <div class="relative mb-4 overflow-hidden bg-slate-100">
                    <img src="${person.img}" class="w-full h-56 object-cover transition duration-500 group-hover:scale-105">
                </div>
                
                <h3 class="text-sm font-bold text-[#012A4F] uppercase tracking-tight group-hover:text-[#038DAE] transition">
                    ${person.name}
                </h3>
                <p class="text-[9px] text-[#038DAE] font-bold mt-1 tracking-widest uppercase italic mb-3">
                    ${person.role}
                </p>

                <div class="flex flex-wrap gap-1 mt-auto border-t border-slate-100 pt-3">
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