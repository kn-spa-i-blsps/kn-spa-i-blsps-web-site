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
                        class="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1"
                        style="padding:20px;background:#fff;gap:16px;min-width:0;box-shadow:0 4px 16px rgba(1,42,79,.06)">
                            <div style="width:100%;height:150px;display:flex;align-items:center;justify-content:center;border-radius:12px;padding:18px;background:${/ncbr|ptak/i.test(partner.name) ? '#012A4F' : '#fff'}">
                                <img src="${partner.logo}" alt="${partner.name}" loading="lazy"
                                    style="max-height:100%;max-width:100%;width:auto;height:auto;object-fit:contain;filter:none"
                                    onerror="this.hidden=true">
                            </div>
                            <span style="color:#012A4F;font-size:14px;font-weight:700;text-align:center;line-height:1.5">${partner.name}</span>
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