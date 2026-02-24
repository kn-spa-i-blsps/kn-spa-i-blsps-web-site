// member.js

async function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    
    if (!userId) {
        window.location.href = 'index.html';
        return;
    }

    const user = members.find(m => m.id.trim() === userId.trim());
    const container = document.getElementById('profile-content');
    
    if (!user) {
        container.innerHTML = "<h1 class='text-[#038DAE] text-center font-mono font-bold py-20'>[!] ERROR: UNIT_NOT_FOUND</h1>";
        return;
    }

    // --- LOGIKA WCZYTYWANIA BIO ---
    let bioHTML = "";
    if (user.bioSource) {
        try {
            const response = await fetch(user.bioSource);
            if (!response.ok) throw new Error();
            const markdownText = await response.text();
            bioHTML = marked.parse(markdownText); 
        } catch (e) {
            bioHTML = `<p class="text-red-500 font-bold uppercase text-[10px] italic">[ FAILED_TO_LOAD_BIO_STREAM ]</p>`;
        }
    } else {
        bioHTML = user.bio ? `<p>${t(user.bio)}</p>` : "<p class='italic opacity-50'>Registry entry empty.</p>";
    }

    // --- TAGI PROJEKTÓW (Powiększone i kolorowane) ---
    const projectColors = {
        "musc": "text-red-400 border-red-400/50 bg-red-400/10",
        "flysearch": "text-green-400 border-green-400/50 bg-green-400/10",
        "bluespark": "text-blue-400 border-blue-400/50 bg-blue-400/10",
        "hawk-eye": "text-amber-400 border-amber-400/50 bg-amber-400/10",
        "snows-eye": "text-slate-300 border-slate-300/50 bg-slate-300/10"
    };

    const projectBadges = projects.filter(p => p.teamIds.includes(user.id)).map(p => {
        const colorClass = projectColors[p.id] || "text-[#038DAE] border-[#038DAE]/50 bg-[#038DAE]/10";
        return `
            <span class="text-[10px] px-3 py-1 border uppercase font-black tracking-widest ${colorClass}">
                ${p.title}
            </span>`;
    }).join('');

    const customBadges = (user.customTags || []).map(tag => `
        <span class="text-[10px] px-3 py-1 border border-[#038DAE]/30 text-[#038DAE] uppercase font-bold tracking-widest bg-[#038DAE]/5 whitespace-nowrap">
            ${t(tag)}
        </span>
    `).join('');

    // --- SOCIAL LINKI (Większe i kolorowane) ---
    let socialLinksHTML = (user.socials || []).map(link => {
        const platform = link.platform.toLowerCase();
        let colors = "border-[#038DAE]/50 text-[#038DAE] hover:bg-[#038DAE] hover:text-white"; // default
        
        if (platform === 'github') colors = "border-white/30 text-white hover:bg-white hover:text-[#012A4F]";
        else if (platform === 'linkedin') colors = "border-[#0077b5]/50 text-[#0077b5] hover:bg-[#0077b5] hover:text-white";
        else if (platform === 'instagram') colors = "border-[#e1306c]/50 text-[#e1306c] hover:bg-[#e1306c] hover:text-white";
        else if (platform === 'website') colors = "border-[#038DAE] text-[#038DAE] hover:bg-[#038DAE] hover:text-white";

        return `
            <a href="${link.url}" target="_blank" 
               class="px-5 py-2.5 border ${colors} text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 bg-[#012A4F]/50 backdrop-blur-sm">
                ${link.platform}
            </a>`;
    }).join('');

    // --- RENDER FINALNEGO KAFELKA ---
   container.innerHTML = `
        <div class="w-full max-w-6xl blueprint-card p-8 md:p-14 pb-20 md:pb-24 relative overflow-hidden">
            <div class="blueprint-overlay"></div>
            
            <div class="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
                
                <div class="w-64 flex-shrink-0 mx-auto lg:mx-0">
                    <div class="img-container mb-8 shadow-2xl transform -rotate-1 group">
                        <div class="overflow-hidden h-80">
                            <img src="https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/members/${t(user.id)}.jpg" 
                                 class="w-full h-full object-cover img-content"
                                 onerror="handleMemberImageError(this, '${t(user.id)}')">
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-2.5 h-2.5 bg-green-400 rounded-sm status-blink shadow-[0_0_8px_#4ade80]"></div>
                            <span class="text-[10px] text-[#038DAE] uppercase font-black tracking-[0.3em]">Unit_Active</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${customBadges}
                            ${projectBadges}
                        </div>
                    </div>
                </div>

                <div class="flex-grow">
                    <header class="mb-10 relative">
                        <div class="text-[#038DAE] text-[11px] font-bold tracking-[0.6em] mb-4 opacity-80 uppercase">
                            Registry_Archive // ID_${t(user.id)}
                        </div>
                        <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8] italic mb-8">
                            ${t(user.name)}
                        </h1>
                        <div class="flex items-center gap-6">
                            <div class="h-[3px] w-16 bg-[#038DAE]"></div>
                            <div class="text-[#038DAE] text-sm md:text-xl font-black uppercase tracking-[0.4em]">
                                ${t(user.role)}
                            </div>
                        </div>
                    </header>

                    <div class="flex flex-wrap gap-4 mb-12">
                        ${socialLinksHTML}
                    </div>

                    <div class="bio-window p-8 md:p-12 shadow-2xl markdown-body border-2 border-slate-200 relative mb-12">
                        <div class="absolute top-0 right-0 p-3 text-[9px] text-slate-300 font-bold font-mono tracking-widest uppercase">
                            Access_Type: Read_Only
                        </div>
                        ${bioHTML}
                    </div>
                </div>
            </div>

            <div class="absolute bottom-6 left-8 md:left-8 right-8 md:right-14 flex justify-between items-end z-20">
                <div class="font-mono text-[10px] text-[#038DAE] font-bold uppercase space-y-1 opacity-40">
                    <div>> SECURITY_LEVEL: HIGH</div>
                    <div>> ENCRYPTION: AES-256</div>
                    <div>> DATA_REF: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>
                
                <img src="https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/logo3.png" 
                    class="h-10 md:h-12 w-auto object-contain" 
                    style="filter: brightness(1.2) contrast(1.1) drop-shadow(0 0 5px rgba(3, 141, 174, 1));">
            </div>
        </div>
    `;
}

function handleMemberImageError(img, memberId) {
    if (img.src.includes('.jpg')) img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/members/${memberId}.jpeg`;
    else if (img.src.includes('.jpeg')) img.src = `https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/members/${memberId}.png`;
    else { img.onerror = null; img.src = 'https://res.cloudinary.com/dsrdp5vrr/image/upload/kn-spa-i-blsps/members/default.jpg'; }
}

document.addEventListener('DOMContentLoaded', renderProfile);