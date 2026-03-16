function renderPartners() {
    const container = document.getElementById('partners-container');
    if (!container) return;

    // Sortowanie po ID
    const sortedPartners = [...partners].sort((a, b) => a.id - b.id);

    container.innerHTML = sortedPartners.map(partner => `
        <a href="${partner.url}" target="_blank" rel="noopener noreferrer" 
           class="group flex items-center justify-center px-8 h-20 md:h-28 transition-all">
            <img 
                src="${partner.logo}" 
                alt="${partner.name}" 
                class="h-12 md:h-16 w-auto object-contain transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                title="${partner.name}"
            >
        </a>
    `).join('');
}

// Uruchom funkcję po załadowaniu DOM
document.addEventListener('DOMContentLoaded', renderPartners);