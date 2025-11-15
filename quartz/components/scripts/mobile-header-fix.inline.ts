// Mobile Header Fix - Aus dem gemaskten Container rausziehen
function setupMobileHeader() {
  if (window.innerWidth <= 800) {
    // Prüfe ob bereits ein geklonter Header existiert
    const existingClone = document.querySelector('.mobile-fixed-header');
    if (existingClone) {
      existingClone.remove();
    }
    
    const sidebar = document.querySelector('.page > #quartz-body > .sidebar.left');
    const page = document.querySelector('.page');
    
    if (sidebar && page) {
      // Klone die Sidebar
      const clonedSidebar = sidebar.cloneNode(true) as HTMLElement;
      clonedSidebar.classList.add('mobile-fixed-header');
      
      // Original verstecken
      (sidebar as HTMLElement).style.display = 'none';
      
      // Geklonte Sidebar DIREKT in .page einfügen (vor #quartz-body)
      page.insertBefore(clonedSidebar, page.firstChild);
      
      // Event-Listener für Darkmode neu binden
      const originalDarkmode = sidebar.querySelector('.darkmode');
      const clonedDarkmode = clonedSidebar.querySelector('.darkmode');
      if (originalDarkmode && clonedDarkmode) {
        clonedDarkmode.addEventListener('click', (e) => {
          e.preventDefault();
          (originalDarkmode as HTMLElement).click();
        });
      }
      
      // Event-Listener für ReaderMode neu binden
      const originalReaderMode = sidebar.querySelector('.reader-mode');
      const clonedReaderMode = clonedSidebar.querySelector('.reader-mode');
      if (originalReaderMode && clonedReaderMode) {
        clonedReaderMode.addEventListener('click', (e) => {
          e.preventDefault();
          (originalReaderMode as HTMLElement).click();
        });
      }
      
      // Event-Listener für Explorer (Hamburger Menü) neu binden
      const originalExplorer = sidebar.querySelector('.explorer');
      const clonedExplorer = clonedSidebar.querySelector('.explorer');
      if (originalExplorer && clonedExplorer) {
        clonedExplorer.addEventListener('click', (e) => {
          e.preventDefault();
          (originalExplorer as HTMLElement).click();
        });
      }
      
      console.log('Mobile header moved outside masked container with event listeners');
    }
  }
}

// Initial setup
setupMobileHeader();

// Bei jeder Navigation erneut ausführen
document.addEventListener('nav', () => {
  console.log('Navigation detected, re-setup mobile header');
  setTimeout(() => setupMobileHeader(), 100); // Kleine Verzögerung für DOM-Update
});

// Fallback: Bei Content-Änderungen
const observer = new MutationObserver(() => {
  const sidebar = document.querySelector('.page > #quartz-body > .sidebar.left');
  const clone = document.querySelector('.mobile-fixed-header');
  
  if (sidebar && !clone && window.innerWidth <= 800) {
    console.log('Sidebar appeared, setting up mobile header');
    setupMobileHeader();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

export default "";
