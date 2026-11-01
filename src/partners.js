function renderPartners() {
    const container = document.getElementById('partners-container');
    if (!container) return;

    const supporters = partners.filter(p => p.category === 'support');
    const officialPartners = partners.filter(p => p.category === 'partner');

    const renderGroup = (items, titlePl, titleEn) => {
        if (items.length === 0) return '';
        
        return `
            <div class="w-full text-center">
                <div class="flex items-center justify-center gap-4 mb-12">
                    <div class="h-[2px] w-16 md:w-32 bg-slate-300"></div>
                    <h3 class="t-translate text-[12px] font-bold text-[#012A4F] uppercase tracking-[0.7em]"
                        data-pl="${titlePl}" data-en="${titleEn}">
                        ${titlePl}
                    </h3>
                    <div class="h-[2px] w-16 md:w-32 bg-slate-300"></div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    ${items.map(partner => `
                        <a href="${partner.url}" target="_blank" rel="noopener noreferrer" 
                        class="group relative flex items-center justify-center p-10 rounded-2xl 
                                bg-black/20 border border-black/20 
                                transition-all duration-500 
                                hover:bg-black/65 hover:border-black hover:-translate-y-2 aspect-[16/9]">
                            
                            <img 
                                src="${partner.logo}" 
                                alt="${partner.name}" 
                                class="max-h-full max-w-full w-auto h-auto object-contain 
                                    transition-all duration-500 
                                    filter brightness(0) invert(1) 
                                    group-hover:filter-none group-hover:opacity-100 group-hover:scale-105"
                            >
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    };

    container.innerHTML = `
        <div class="flex flex-col gap-32">
            ${renderGroup(officialPartners, "NASI PARTNERZY", "OUR PARTNERS")}
            ${renderGroup(supporters, "WSPARLI NAS", "SUPPORTED BY")}
        </div>
    `;
    
    // Kluczowe dla działania tłumaczeń
    if (typeof updateStaticTranslations === 'function') updateStaticTranslations();
}

window.bootPartners = renderPartners;