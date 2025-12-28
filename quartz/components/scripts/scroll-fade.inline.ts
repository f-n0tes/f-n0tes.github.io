// C:\...\scroll-fade.inline.ts

function initScrollFade() {
    // Wichtig: document.body MUSS verwendet werden
    const contentWrapper = document.body; 

    if (contentWrapper) {
        const toggleScrollClass = () => {
            // Wenn das Explorer-Menü geöffnet ist, scrolled-down NICHT anwenden
            const explorer = document.querySelector(".explorer");
            if (explorer && !explorer.classList.contains("collapsed")) {
                contentWrapper.classList.remove('scrolled-down');
                return;
            }
            
            // Nur auf Mobile aktivieren
            if (window.innerWidth > 800) {
                return;
            }
            
            // ... (Logik zur Berechnung der Scroll-Position)
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = document.documentElement.clientHeight;
            const tolerance = 50; 
            
            const isNotAtBottom = (scrollTop + clientHeight) < (scrollHeight - tolerance);

            if (isNotAtBottom) {
                // Klasse HINZUFÜGEN
                contentWrapper.classList.add('scrolled-down');
            } else {
                // Klasse ENTFERNEN
                contentWrapper.classList.remove('scrolled-down');
            }
        };

        window.addEventListener('scroll', toggleScrollClass);
        window.addEventListener('resize', toggleScrollClass); 
        toggleScrollClass();
        
        window.addCleanup(() => {
            window.removeEventListener('scroll', toggleScrollClass);
            window.removeEventListener('resize', toggleScrollClass);
        });
    }
}

document.addEventListener("nav", initScrollFade);

export default "";