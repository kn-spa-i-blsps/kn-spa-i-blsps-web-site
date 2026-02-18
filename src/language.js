// language.js

window.currentLang = localStorage.getItem('siteLang') || 'pl';

window.toggleLanguage = function() {
    window.currentLang = window.currentLang === 'pl' ? 'en' : 'pl';
    localStorage.setItem('siteLang', window.currentLang);
    location.reload();
};

window.t = function(obj) {
    if (!obj) return "";
    // Jeśli to zwykły string, zwróć go. Jeśli obiekt, wybierz język.
    if (typeof obj === 'string') return obj;
    return obj[window.currentLang] || obj['pl'] || "";
};

function updateStaticTranslations() {
    const elements = document.querySelectorAll('.t-translate');
    
    elements.forEach(el => {
        const text = el.getAttribute(`data-${window.currentLang}`);
        if (text) {
            // Używamy innerHTML, żeby obsłużyć tagi typu <br> lub <span> w tłumaczeniach
            el.innerHTML = text;
        }
    });
}

function updateLangUI() {
    const flagEl = document.getElementById('lang-flag');
    const labelEl = document.getElementById('lang-label');
    
    if (flagEl && labelEl) {
        flagEl.innerText = window.currentLang === 'pl' ? '🇵🇱' : '🇺🇸';
        labelEl.innerText = window.currentLang === 'pl' ? 'PL' : 'EN';
    }

    // Wywołujemy tłumaczenie statycznych tekstów
    updateStaticTranslations();
}

document.addEventListener('DOMContentLoaded', updateLangUI);