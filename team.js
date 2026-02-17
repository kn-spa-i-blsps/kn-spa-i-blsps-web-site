// team.js
function renderTeam() {
    const container = document.getElementById('team-container');
    const countDisplay = document.getElementById('member-count');
    if (!container) return;

    container.innerHTML = "";
    
    // Aktualizujemy licznik na górze strony
    if (countDisplay) countDisplay.innerText = members.length;

    members.forEach((person, index) => {
        const card = `
            <a href="profil.html?user=${person.id}" class="group bg-[#0a0a0b] p-6 hover:bg-orange-500/5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                
                <div class="absolute top-2 left-2 text-[8px] text-gray-700 group-hover:text-orange-500 transition font-bold">
                    ID_0${index + 1}
                </div>

                <div class="relative mb-6">
                    <div class="absolute inset-0 border border-orange-500/0 group-hover:border-orange-500 transition-all scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"></div>
                    <img src="${person.img}" class="w-24 h-24 object-cover border border-white/10 group-hover:border-transparent transition-all">
                </div>

                <p class="font-bold text-xs text-white uppercase tracking-tight mb-1 group-hover:text-orange-500 transition">
                    ${person.name}
                </p>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                    ${person.role}
                </p>

                <div class="absolute bottom-0 left-0 w-full h-[1px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </a>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', renderTeam);