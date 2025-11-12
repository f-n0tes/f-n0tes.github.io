// C:\...\scroll-fade.inline.ts

// Wichtig: document.body MUSS verwendet werden
const contentWrapper = document.body; 

if (contentWrapper) {
    const toggleScrollClass = () => {
        // ... (Logik zur Berechnung der Scroll-Position)
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = document.documentElement.clientHeight;
        const tolerance = 10; 
        
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
}

export default "";