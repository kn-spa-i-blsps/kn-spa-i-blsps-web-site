const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const data = new FormData(form);
    
    const btnText = form.querySelector('button span');
    const originalText = btnText.innerText;
    
    // Sprawdzamy aktualny język (zakładając, że trzymasz go w localStorage lub klasie html)
    const isEn = document.documentElement.lang === 'en' || localStorage.getItem('language') === 'en';

    btnText.innerText = isEn ? "TRANSMITTING..." : "TRANSMISJA...";

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.style.color = "#038DAE";
            status.innerText = isEn 
                ? "PROTOCOL INITIATED SUCCESSFULLY. THANK YOU." 
                : "PROTOKÓŁ ZAKOŃCZONY POMYŚLNIE. DZIĘKUJEMY.";
            form.reset(); 
        } else {
            status.style.color = "#ff4444";
            status.innerText = isEn 
                ? "SERVER ERROR. PLEASE TRY AGAIN." 
                : "BŁĄD SERWERA. SPRÓBUJ PONOWNIE.";
        }
    } catch (error) {
        status.style.color = "#ff4444";
        status.innerText = isEn 
            ? "CRITICAL TRANSMISSION FAILURE." 
            : "BŁĄD KRYTYCZNY TRANSMISJI.";
    } finally {
        btnText.innerText = originalText;
    }
});