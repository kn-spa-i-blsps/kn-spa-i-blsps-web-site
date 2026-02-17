// home.js

function renderHomeProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((proj, index) => {
        container.innerHTML += `
            <a href="projekt.html?id=${proj.id}" class="tech-card overflow-hidden group flex flex-col h-full">
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

    members.forEach(person => {
        container.innerHTML += `
            <a href="profil.html?user=${person.id}" class="min-w-[240px] tech-card p-4 snap-center group transition-all">
                <div class="relative mb-4 overflow-hidden bg-[#141416]">
                    <img src="${person.img}" class="w-full h-56 object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110">
                    
                    <div class="absolute top-0 right-0 w-8 h-8 border-t border-right border-orange-500/0 group-hover:border-orange-500/50 transition-all"></div>
                </div>
                
                <h3 class="text-sm font-bold text-white uppercase tracking-tight group-hover:text-orange-500 transition">
                    ${person.name}
                </h3>
                <p class="text-[9px] text-orange-500 font-bold mt-1 tracking-widest uppercase italic">
                    ${person.role}
                </p>
            </a>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderHomeProjects();
    renderHomeTeam();
});