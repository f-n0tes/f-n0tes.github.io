function initScrollObserver() {
  const body = document.body;
  let lastScroll = 0;
  
  // HIER WURDE DIE ZEILE GELÖSCHT (const sidebar = ...)

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    
    // Optional: Nur auf Mobile aktivieren
    if (window.innerWidth > 850) { 
        body.classList.remove("scrolled-down");
        return;
    }
    
    // Wenn das Explorer-Menü geöffnet ist, scrolled-down NICHT anwenden
    const explorer = document.querySelector(".explorer");
    if (explorer && !explorer.classList.contains("collapsed")) {
      body.classList.remove("scrolled-down");
      lastScroll = currentScroll;
      return;
    }

    if (currentScroll <= 50) {
      body.classList.remove("scrolled-down");
    } 
    else if (currentScroll > lastScroll && !body.classList.contains("scrolled-down")) {
      body.classList.add("scrolled-down");
    } 
    else if (currentScroll < lastScroll && body.classList.contains("scrolled-down")) {
      body.classList.remove("scrolled-down");
    }
    
    lastScroll = currentScroll;
  });
}

document.addEventListener("nav", initScrollObserver);