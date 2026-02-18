// team.js

const projectColors = {
    "musc": "text-red-600 border-red-200 bg-red-50",
    "flysearch": "text-green-600 border-green-200 bg-green-50",
    "bluespark": "text-blue-600 border-blue-200 bg-blue-50",
    "hawk-eye": "text-amber-600 border-amber-200 bg-amber-50",
    "snows-eye": "text-slate-600 border-slate-200 bg-slate-50"
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
        
        // Tagi customowe: Teraz w kolorze błękitnym (#038DAE)
        const customBadges = (person.customTags || []).map(tag => `
            <span class="text-[9px] px-2 py-0.5 border border-[#038DAE]/30 bg-[#038DAE]/5 text-[#038DAE] uppercase font-bold tracking-tight">
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
            const colorClass = projectColors[p.id] || "text-slate-500 border-slate-200 bg-slate-50";
            return `<span class="text-[9px] px-2 py-0.5 border uppercase font-bold tracking-tight ${colorClass}">${p.title}</span>`;
        }).join('');

        const hiddenCount = (person.customTags && person.customTags.length > 0) 
            ? projects.filter(p => p.teamIds.includes(person.id)).length - 1 
            : 0;
            
        const moreIndicator = hiddenCount > 0 
            ? `<span class="text-[9px] text-slate-400 font-bold self-center ml-1">+${hiddenCount}</span>` 
            : '';

        const card = `
            <a href="member.html?user=${person.id}" class="group bg-white p-6 hover:shadow-xl hover:shadow-[#012A4F]/5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden h-full border border-dashed border-slate-200 hover:border-[#038DAE]">
                
                <div class="absolute top-3 left-4 text-[10px] text-slate-300 group-hover:text-[#038DAE]/50 transition font-mono">
                    ID_${index + 1 < 10 ? '0' + (index + 1) : index + 1}
                </div>

                <div class="relative mb-4">
                    <div class="absolute -inset-1.5 border border-[#038DAE]/0 group-hover:border-[#038DAE]/30 transition-all duration-500 rounded-sm opacity-0 group-hover:opacity-100"></div>
                    <img src="${person.img}" class="w-24 h-24 object-cover border border-slate-100 group-hover:scale-105 transition-all duration-500 shadow-md">
                </div>

                <p class="font-bold text-base text-[#012A4F] uppercase tracking-tighter group-hover:text-[#038DAE] transition leading-none">
                    ${person.name}
                </p>
                
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-1.5 mb-3">
                    ${person.role}
                </p>

                <div class="flex flex-wrap justify-center gap-1.5 mt-auto">
                    ${customBadges}
                    ${projectBadges}
                    ${moreIndicator}
                </div>

                <div class="absolute bottom-0 left-0 w-full h-[3px] bg-[#038DAE] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', renderTeam);