// profile.js
function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    const user = members.find(m => m.id === userId);
    const container = document.getElementById('profile-content');
    
    if (!user || !container) {
        if (container) container.innerHTML = "<h1 class='text-orange-500'>ERROR: USER_NOT_FOUND</h1>";
        return;
    }

    container.innerHTML = `
        <div class="max-w-3xl w-full profile-card p-8 md:p-12 shadow-2xl">
            <div class="flex flex-col md:flex-row gap-10 items-center md:items-start">
                
                <div class="relative group">
                    <div class="absolute -inset-1 bg-orange-500 opacity-20 blur-sm"></div>
                    <img src="${user.img}" class="relative w-48 h-48 object-cover border border-white/10 grayscale hover:grayscale-0 transition duration-500">
                    <div class="mt-4 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                        Status: <span class="text-green-500">ACTIVE</span>
                    </div>
                </div>

                <div class="flex-grow text-center md:text-left">
                    <h1 class="text-4xl font-black text-white uppercase tracking-tighter mb-2">${user.name}</h1>
                    <p class="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs mb-8 inline-block border-b border-orange-500/30 pb-1">
                        ${user.role}
                    </p>
                    
                    <div class="bg-white/5 p-6 border-l-2 border-orange-500 mb-8">
                        <p class="text-sm text-gray-400 leading-relaxed italic">
                            "${user.bio}"
                        </p>
                    </div>

                    <div class="flex flex-wrap justify-center md:justify-start gap-4">
                        <a href="${user.links.github}" target="_blank" class="px-6 py-2 border border-white/10 hover:bg-white hover:text-black transition text-xs font-bold uppercase tracking-widest">
                            GitHub_Link
                        </a>
                        <a href="${user.links.linkedin}" target="_blank" class="px-6 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition text-xs font-bold uppercase tracking-widest">
                            LinkedIn_Link
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
                <div class="text-[8px] uppercase tracking-widest">Access_Token: ${Math.random().toString(36).substring(7)}</div>
                <div class="w-16 h-[2px] bg-orange-500"></div>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', renderProfile);