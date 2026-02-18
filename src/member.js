// member.js

async function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    const user = members.find(m => m.id === userId);
    const container = document.getElementById('profile-content');
    
    if (!user || !container) {
        if (container) container.innerHTML = "<h1 class='text-orange-500 text-center mt-20 font-mono'>[!] ERROR: USER_NOT_FOUND</h1>";
        return;
    }

    // 1. POBIERANIE BIO (Markdown lub String)

    let bioHTML = "";
    if (user.bioSource) {
        try {
            const response = await fetch(user.bioSource);
            if (!response.ok) throw new Error();
            const markdownText = await response.text();
            bioHTML = marked.parse(markdownText); // Konwersja MD -> HTML
        } catch (e) {
            bioHTML = `<p class="text-red-500 opacity-50">[ FILENO_0x04: FAILED_TO_LOAD_EXTERNAL_BIO ]</p>`;
        }
    } else {
        // Jeśli nie ma pliku .md, używamy zwykłego stringa (whitespace-pre-line obsłuży entery)
        bioHTML = user.bio || "No data available in bio registry.";
    }

    // 2. KOLORY PROJEKTÓW
    const projectColors = {
        "musc": "text-red-500 border-red-500/30 bg-red-500/5",
        "flysearch": "text-green-400 border-green-400/30 bg-green-400/5",
        "bluespark": "text-blue-400 border-blue-400/30 bg-blue-400/5",
        "hawk-eye": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
        "snows-eye": "text-white border-white/30 bg-white/5"
    };

    const customBadges = (user.customTags || []).map(tag => `
        <span class="text-[9px] px-2.5 py-1 border border-orange-500/40 bg-orange-500/5 text-orange-500 uppercase font-bold tracking-tight shadow-sm">
            ${tag}
        </span>
    `).join('');

    const personProjects = projects
        .filter(p => p.teamIds.includes(user.id))
        .sort((a, b) => (a.ordering || 999) - (b.ordering || 999));

    const projectBadges = personProjects.map(p => {
        const colorClass = projectColors[p.id] || "text-orange-500 border-orange-500/30 bg-orange-500/5";
        return `<span class="text-[9px] px-2.5 py-1 border uppercase font-bold tracking-tight ${colorClass}">${p.title}</span>`;
    }).join('');

    // 3. SOCIAL LINKS
    let socialLinksHTML = "";
    if (user.socials) {
        user.socials.forEach(link => {
            const platform = link.platform.toLowerCase();
            let linkStyle = "border-white/10 text-gray-400 hover:border-white hover:text-white";
            if (platform === 'github') linkStyle = "border-white/10 text-gray-300 hover:bg-white hover:text-black";
            else if (platform === 'linkedin') linkStyle = "border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500";
            else if (platform === 'instagram') linkStyle = "border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500";
            else if (platform === 'website') linkStyle = "border-orange-500/30 text-orange-500 hover:bg-orange-500/20 hover:border-orange-500";

            socialLinksHTML += `
                <a href="${link.url}" target="_blank" class="px-4 py-1.5 border ${linkStyle} text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300">
                    ${link.platform}
                </a>`;
        });
    }

    // 4. FINALNY RENDER
    // 4. FINALNY RENDER - Skupiony na szerokości
    container.innerHTML = `
        <div class="w-full max-w-7xl mx-auto profile-card p-8 md:p-14 shadow-2xl bg-[#0a0a0b] border border-white/5 relative overflow-hidden">
            
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
                
                <div class="w-full lg:w-64 flex flex-col items-center lg:items-start flex-shrink-0">
                    <div class="relative mb-4 group">
                        <div class="w-64 h-64 overflow-hidden border border-white/10 bg-black">
                            <img src="${user.img}" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute -bottom-3 -right-3 bg-orange-500 text-black font-black px-3 py-1 text-[10px] tracking-tighter z-10 shadow-lg font-mono">
                            CORE_UNIT_${user.id.toUpperCase()}
                        </div>
                    </div>

                    <div class="mt-4 mb-8 flex items-center justify-center lg:justify-start gap-2 w-full">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full status-blink shadow-[0_0_8px_#22c55e]"></div>
                        <span class="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-bold">Connection_Stable</span>
                    </div>

                    <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
                        ${customBadges}
                        ${projectBadges}
                    </div>
                </div>

                <div class="flex-grow w-full overflow-hidden">
                    <div class="mb-8 text-center lg:text-left">
                        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
                            ${user.name}
                        </h1>
                        <div class="flex items-center justify-center lg:justify-start gap-4">
                            <span class="text-orange-500 font-bold uppercase tracking-[0.5em] text-[10px]">
                                // ${user.role}
                            </span>
                            <div class="h-px flex-grow bg-white/5 hidden md:block"></div>
                        </div>
                    </div>

                    <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                        ${socialLinksHTML}
                    </div>

                    <div class="relative min-h-[250px]">
                        <div class="absolute -left-6 top-0 bottom-0 w-[1px] bg-orange-500/30"></div>
                        
                        <div class="text-sm md:text-base text-gray-400 leading-[1.8] font-light pl-2 markdown-body">
                            ${bioHTML}
                        </div>
                        
                        <div class="mt-12 flex flex-wrap gap-6 opacity-30 border-t border-white/5 pt-6 font-mono">
                            <div class="text-[8px] uppercase tracking-[0.2em] text-gray-500">Access: Verified_Entity</div>
                            <div class="text-[8px] uppercase tracking-[0.2em] text-gray-500">Registry_ID: ${user.id}</div>
                            <div class="text-[8px] uppercase tracking-[0.2em] text-gray-500">Encryption: SHA-256</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderProfile);