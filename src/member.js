function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    const user = members.find(m => m.id === userId);
    const container = document.getElementById('profile-content');
    
    if (!user || !container) {
        if (container) container.innerHTML = "<h1 class='text-orange-500'>ERROR: USER_NOT_FOUND</h1>";
        return;
    }

    let socialLinksHTML = "";
    if (user.socials) {
        user.socials.forEach(link => {
            // Definiujemy kolory dla konkretnych platform
            const platform = link.platform.toLowerCase();
            let linkStyle = "border-white/10 text-gray-400 hover:border-white hover:text-white"; // Domyślny

            if (platform === 'github') {
                linkStyle = "border-white/10 text-gray-300 hover:bg-white hover:text-black";
            } else if (platform === 'linkedin') {
                linkStyle = "border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500";
            } else if (platform === 'instagram') {
                linkStyle = "border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500";
            } else if (platform === 'website' || platform === 'portfolio') {
                linkStyle = "border-orange-500/30 text-orange-500 hover:bg-orange-500/20 hover:border-orange-500";
            }

            socialLinksHTML += `
                <a href="${link.url}" target="_blank" class="px-4 py-1.5 border ${linkStyle} text-[9px] font-bold uppercase tracking-widest transition-all duration-300">
                    ${link.platform}
                </a>`;
        });
    }

    container.innerHTML = `
        <div class="max-w-3xl w-full profile-card p-8 md:p-12 shadow-2xl">
            <div class="card-label uppercase">User_ID_Auth</div>

            <div class="flex flex-col md:flex-row gap-10 items-center md:items-start">
                
                <div class="relative group cursor-crosshair">
                    <div class="img-container w-48 h-48 overflow-hidden bg-black">
                        <img src="${user.img}" class="img-content w-full h-full object-cover">
                    </div>
                    <div class="mt-4 flex items-center justify-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full status-blink"></div>
                        <span class="text-[9px] text-gray-600 uppercase tracking-widest">Connection_Stable</span>
                    </div>
                </div>

                <div class="flex-grow text-center md:text-left">
                    <h1 class="text-4xl font-black text-white uppercase tracking-tighter mb-1">${user.name}</h1>
                    <p class="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6">// ${user.role}</p>
                    
                    <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                        ${socialLinksHTML}
                    </div>

                    <div class="bg-white/5 p-6 border-l-2 border-orange-500">
                        <div class="text-sm text-gray-400 leading-relaxed italic font-light">
                            ${user.bio}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-20 text-[8px] uppercase tracking-[0.5em]">
                <div>Access_Token: ${Math.random().toString(36).substring(7).toUpperCase()}</div>
                <div class="w-12 h-px bg-orange-500"></div>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', renderProfile);