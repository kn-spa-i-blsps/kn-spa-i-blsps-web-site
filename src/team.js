// team.js

const projectColors = {
    "musc": "text-red-500 border-red-500/30 bg-red-500/5",
    "flysearch": "text-green-400 border-green-400/30 bg-green-400/5",
    "bluespark": "text-blue-400 border-blue-400/30 bg-blue-400/5",
    "hawk-eye": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    "snows-eye": "text-white border-white/30 bg-white/5"
};

function renderTeam() {
    const container = document.getElementById('team-container');
    const countDisplay = document.getElementById('member-count');
    if (!container) return;

    container.innerHTML = "";
    if (countDisplay) countDisplay.innerText = members.length;

    const sortedMembers = [...members].sort((a, b) => {
        const minOrderA = Math.min(...projects.filter(p => p.teamIds.includes(a.id)).map(p => p.ordering || 999));
        const minOrderB = Math.min(...projects.filter(p => p.teamIds.includes(b.id)).map(p => p.ordering || 999));
        return minOrderA - minOrderB;
    });

    sortedMembers.forEach((person, index) => {
        const hasCustomTags = person.customTags && person.customTags.length > 0;
        
        // Tagi: text-[9px] to idealny kompromis
        const customBadges = (person.customTags || []).map(tag => `
            <span class="text-[9px] px-2 py-0.5 border border-orange-500/40 bg-orange-500/5 text-orange-500 uppercase font-bold tracking-tight">
                ${tag}
            </span>
        `).join('');

        let personProjects = projects
            .filter(p => p.teamIds.includes(person.id))
            .sort((a, b) => (a.ordering || 999) - (b.ordering || 999));

        if (hasCustomTags && personProjects.length > 0) {
            personProjects = [personProjects[0]]; 
        }

        const projectBadges = personProjects.map(p => {
            const colorClass = projectColors[p.id] || "text-orange-500 border-orange-500/30 bg-orange-500/5";
            return `<span class="text-[9px] px-2 py-0.5 border uppercase font-bold tracking-tight ${colorClass}">${p.title}</span>`;
        }).join('');

        const hiddenCount = (person.customTags && person.customTags.length > 0) 
            ? projects.filter(p => p.teamIds.includes(person.id)).length - 1 
            : 0;
            
        const moreIndicator = hiddenCount > 0 
            ? `<span class="text-[9px] text-gray-700 font-bold self-center ml-1">+${hiddenCount}</span>` 
            : '';

        const card = `
            <a href="member.html?user=${person.id}" class="group bg-[#0a0a0b] p-6 hover:bg-white/[0.02] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden h-full">
                
                <div class="absolute top-3 left-4 text-[10px] text-gray-800 group-hover:text-orange-500/50 transition font-mono">
                    ID_${index + 1}
                </div>

                <div class="relative mb-4">
                    <div class="absolute -inset-1.5 border border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-500 rounded-sm opacity-0 group-hover:opacity-100"></div>
                    <img src="${person.img}" class="w-24 h-24 object-cover border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                </div>

                <p class="font-bold text-base text-white uppercase tracking-tighter group-hover:text-orange-500 transition leading-none">
                    ${person.name}
                </p>
                
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mt-1.5 mb-3">
                    ${person.role}
                </p>

                <div class="flex flex-wrap justify-center gap-1.5 mt-auto">
                    ${customBadges}
                    ${projectBadges}
                    ${moreIndicator}
                </div>

                <div class="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </a>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', renderTeam);