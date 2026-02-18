// member.js

async function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    const user = members.find(m => m.id === userId);
    const container = document.getElementById('profile-content');
    
    if (!user || !container) {
        if (container) container.innerHTML = "<h1 class='text-[#038DAE] text-center mt-20 font-mono'>[!] ERROR: USER_NOT_FOUND</h1>";
        return;
    }

    let bioHTML = "";
    if (user.bioSource) {
        try {
            const response = await fetch(user.bioSource);
            if (!response.ok) throw new Error();
            const markdownText = await response.text();
            bioHTML = marked.parse(markdownText); 
        } catch (e) {
            bioHTML = `<p class="text-red-500 opacity-50 font-bold uppercase text-[10px]">[ FILENO_0x04: FAILED_TO_LOAD_EXTERNAL_BIO ]</p>`;
        }
    } else {
        bioHTML = user.bio || "No data available in bio registry.";
    }

    const projectColors = {
        "musc": "text-red-600 border-red-200 bg-red-50",
        "flysearch": "text-green-600 border-green-200 bg-green-50",
        "bluespark": "text-blue-600 border-blue-200 bg-blue-50",
        "hawk-eye": "text-amber-600 border-amber-200 bg-amber-50",
        "snows-eye": "text-slate-600 border-slate-200 bg-slate-50"
    };

    const customBadges = (user.customTags || []).map(tag => `
        <span class="text-[9px] px-2.5 py-1 border border-[#038DAE]/30 bg-[#038DAE]/5 text-[#038DAE] uppercase font-bold tracking-tight">
            ${tag}
        </span>
    `).join('');

    const personProjects = projects.filter(p => p.teamIds.includes(user.id));
    const projectBadges = personProjects.map(p => {
        const colorClass = projectColors[p.id] || "text-slate-500 border-slate-200 bg-slate-50";
        return `<span class="text-[9px] px-2.5 py-1 border uppercase font-bold tracking-tight ${colorClass}">${p.title}</span>`;
    }).join('');

    let socialLinksHTML = "";
    if (user.socials) {
        user.socials.forEach(link => {
            const platform = link.platform.toLowerCase();
            let linkStyle = "border-slate-200 text-slate-400 hover:border-[#012A4F] hover:text-[#012A4F]";
            if (platform === 'github') linkStyle = "border-slate-200 text-slate-500 hover:bg-slate-500 hover:text-white hover:border-slate-500";
            else if (platform === 'linkedin') linkStyle = "border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600";
            else if (platform === 'instagram') linkStyle = "border-pink-200 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-pink-500";
            else if (platform === 'website') linkStyle = "border-[#038DAE]/30 text-[#038DAE] hover:bg-[#038DAE] hover:text-white";

            socialLinksHTML += `
                <a href="${link.url}" target="_blank" class="px-4 py-1.5 border ${linkStyle} text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 bg-white">
                    ${link.platform}
                </a>`;
        });
    }

    // --- KLUCZOWA ZMIANA: Usunięto overflow-hidden z profile-card ---
    container.innerHTML = `
        <div class="w-full max-w-7xl mx-auto profile-card p-8 md:p-14 shadow-xl relative group">
            <div class="card-label">CORE_UNIT_${user.id.toUpperCase()}</div>
            
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
                
                <div class="w-full lg:w-64 flex flex-col items-center lg:items-start flex-shrink-0">
                    <div class="relative mb-6">
                        <div class="w-64 h-64 overflow-hidden img-container bg-white">
                            <img src="${user.img}" class="w-full h-full object-cover img-content">
                        </div>
                    </div>

                    <div class="mb-8 flex items-center justify-center lg:justify-start gap-2 w-full font-bold">
                        <div class="w-2 h-2 bg-green-500 rounded-full status-blink shadow-[0_0_8px_#22c55e]"></div>
                        <span class="text-[9px] text-slate-400 uppercase tracking-[0.3em]">Connection_Stable</span>
                    </div>

                    <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
                        ${customBadges}
                        ${projectBadges}
                    </div>
                </div>

                <div class="flex-grow w-full">
                    <div class="mb-10 text-center lg:text-left">
                        <h1 class="text-4xl md:text-6xl font-black text-[#012A4F] uppercase tracking-tighter mb-3 leading-none">
                            ${user.name}
                        </h1>
                        <div class="flex items-center justify-center lg:justify-start gap-4">
                            <span class="text-[#038DAE] font-bold uppercase tracking-[0.4em] text-[10px]">
                                // ${user.role}
                            </span>
                            <div class="h-px flex-grow bg-slate-100 hidden md:block border-t border-dashed border-slate-200"></div>
                        </div>
                    </div>

                    <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                        ${socialLinksHTML}
                    </div>

                    <div class="relative min-h-[250px]">
                        <div class="absolute -left-6 top-0 bottom-0 w-[2px] bg-[#038DAE]/20"></div>
                        <div class="text-sm md:text-base leading-[1.8] font-medium pl-2 markdown-body">
                            ${bioHTML}
                        </div>
                        
                        <div class="mt-16 flex flex-wrap gap-6 opacity-40 border-t border-dashed border-slate-200 pt-6 font-mono font-bold text-[#012A4F]">
                            <div class="text-[8px] uppercase tracking-[0.2em]">Access: Verified_Entity</div>
                            <div class="text-[8px] uppercase tracking-[0.2em]">Registry_ID: ${user.id}</div>
                            <div class="text-[8px] uppercase tracking-[0.2em]">Encryption: SHA-256</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderProfile);