/**
 * BACKUP der EFFECT_NOTES_REVEAL_REPEL_GROW Animation
 * Erstellt am: 29. Dezember 2025
 * 
 * Diese Datei enthält die gesicherte Version der Repel-Grow Animation,
 * falls sie später wieder benötigt wird.
 * 
 * Zum Wiederverwenden:
 * 1. Kopiere den EFFECT_NOTES_REVEAL_REPEL_GROW Export in PageTitleEffects.ts
 * 2. Oder importiere direkt aus dieser Datei
 */

interface LogoEffect {
  name: string
  description: string
  css: string
  js: string
}

const BASE_CSS = `
.page-title {
  font-size: 3rem;
  margin: 0;
  font-family: var(--titleFont);
  overflow: visible;
  line-height: 1.2;
  padding-top: 0.05em;
}

@media all and (max-width: 800px) {
  .page-title { font-size: 2rem; }
}

@media all and (max-width: 370px) {
  .page-title { font-size: 1.75rem; line-height: 1.1; }
}

.icon-link {
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  text-decoration: none;
  overflow: visible;
  line-height: 1em;
}

/* Desktop: Logo anzeigen, Aurora verstecken */
.desktop-logo {
  display: inline-block;
}

.mobile-logo-image {
  display: none;
}

/* Mobile: Logo-Bild anzeigen, Desktop-Logo verstecken */
@media all and (max-width: 800px) {
  .desktop-logo {
    display: none !important;
  }
  
  .mobile-logo-image {
    height: 48px;
    width: auto;
    object-fit: contain;
  }
  
  /* Light Mode: Light-Logo anzeigen, Dark-Logo verstecken */
  .mobile-logo-light {
    display: inline-block;
  }
  .mobile-logo-dark {
    display: none;
  }
  
  /* Dark Mode: Dark-Logo anzeigen, Light-Logo verstecken */
  :root[saved-theme="dark"] .mobile-logo-light {
    display: none;
  }
  :root[saved-theme="dark"] .mobile-logo-dark {
    display: inline-block;
  }
}

@media all and (max-width: 370px) {
  .mobile-logo-image {
    height: 32px;
  }
}

.page-icon {
  height: 8rem;
  width: auto;
  display: inline-block;
  overflow: visible;
  transition: transform 0.1s ease;
}

.page-icon:active {
  transform: scale(1.05);
}

@media all and (max-width: 800px) {
  .page-icon { height: 5rem; }
}

@media all and (max-width: 370px) {
  .page-icon { height: 4rem; }
}
`

export const EFFECT_NOTES_REVEAL_REPEL_GROW_BACKUP: LogoEffect = {
  name: "Notes Reveal - Repel Grow",
  description: "Rechtecke werden abgestoßen und wachsen",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
}

#interactive-logo {
  overflow: visible;
  position: relative;
}

.notes-letter-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.notes-letter {
  position: absolute;
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  transform: scale(0.9);
  opacity: 0;
  transition: none;
}

.notes-letter img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(48%) sepia(75%) saturate(1057%) hue-rotate(307deg) brightness(101%) contrast(93%);
}

:root[saved-theme="dark"] .notes-letter img {
  filter: brightness(0) saturate(100%) invert(48%) sepia(75%) saturate(1057%) hue-rotate(307deg) brightness(101%) contrast(93%);
}

.logo-rect.inner-f {
  transition: opacity 0.3s ease-out;
}

.logo-rect.inner-f.hidden {
  opacity: 0 !important;
}

.notes-full-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.notes-full {
  position: absolute;
  width: 135%;
  height: auto;
  bottom: 10%;
  left: -5%;
  opacity: 0;
  transition: opacity 0.6s ease-out;
  pointer-events: none;
}

.notes-full.visible {
  opacity: 1;
}

.notes-full.fade-out {
  opacity: 0;
  transition: opacity 1.8s ease-out;
}

.notes-full img {
  width: 100%;
  height: auto;
  display: block;
}

#interactive-logo {
  position: relative;
  z-index: 5;
}

.notes-letter .letter-light,
.notes-full .letter-light {
  display: block;
}
.notes-letter .letter-dark,
.notes-full .letter-dark {
  display: none;
}
:root[saved-theme="dark"] .notes-letter .letter-light,
:root[saved-theme="dark"] .notes-full .letter-light {
  display: none;
}
:root[saved-theme="dark"] .notes-letter .letter-dark,
:root[saved-theme="dark"] .notes-full .letter-dark {
  display: block;
}

@keyframes letterReveal {
  0% { opacity: 0; transform: scale(0.9); }
  40% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.98); }
}

.notes-letter.animate-n,
.notes-letter.animate-o,
.notes-letter.animate-t,
.notes-letter.animate-e,
.notes-letter.animate-s {
  animation: letterReveal 0.35s ease-out forwards;
}

.logo-rects-container .logo-rect {
  opacity: 1;
}
`,
  js: `
document.addEventListener("nav", function initNotesRevealRepelGrow() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  
  const oldLetterContainer = logo.parentElement?.querySelector('.notes-letter-container');
  const oldNotesFullContainer = logo.parentElement?.querySelector('.notes-full-container');
  const oldRectsContainer = logo.querySelector('.logo-rects-container');
  if (oldLetterContainer) oldLetterContainer.remove();
  if (oldNotesFullContainer) oldNotesFullContainer.remove();
  if (oldRectsContainer) {
    const oldRects = Array.from(oldRectsContainer.querySelectorAll('.logo-rect'));
    oldRects.forEach(rect => logo.appendChild(rect));
    oldRectsContainer.remove();
  }
  
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  const rectsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  rectsContainer.classList.add('logo-rects-container', 'visible');
  rects.forEach(rect => {
    const clone = rect.cloneNode(true);
    rectsContainer.appendChild(clone);
  });
  rects.forEach(rect => rect.remove());
  logo.appendChild(rectsContainer);
  
  const activeRects = Array.from(rectsContainer.querySelectorAll('.logo-rect'));
  const innerFRects = activeRects.slice(0, 5);
  innerFRects.forEach(rect => rect.classList.add('inner-f'));
  
  activeRects.forEach(rect => {
    rect.dataset.origX = rect.getAttribute('x') || '0';
    rect.dataset.origY = rect.getAttribute('y') || '0';
    rect.dataset.origW = rect.getAttribute('width') || '0';
    rect.dataset.origH = rect.getAttribute('height') || '0';
  });
  
  const letterContainer = document.createElement('div');
  letterContainer.className = 'notes-letter-container';
  logo.parentElement.style.position = 'relative';
  logo.parentElement.insertBefore(letterContainer, logo);
  
  const notesFullContainer = document.createElement('div');
  notesFullContainer.className = 'notes-full-container';
  logo.parentElement.appendChild(notesFullContainer);
  
  const mobileLogo = document.querySelector('.mobile-logo-light');
  let basePath = '';
  if (mobileLogo) {
    const src = mobileLogo.getAttribute('src');
    basePath = src.replace('/static/mobile-logo-light.png', '');
  }
  
  const letters = [
    { id: 'n', lightSrc: basePath + '/static/f-icon/1n-a-light.png', darkSrc: basePath + '/static/f-icon/1n-a-dark.png', class: 'animate-n' },
    { id: 'o', lightSrc: basePath + '/static/f-icon/2o-a-light.png', darkSrc: basePath + '/static/f-icon/2o-a-dark.png', class: 'animate-o' },
    { id: 't', lightSrc: basePath + '/static/f-icon/3t-a-light.png', darkSrc: basePath + '/static/f-icon/3t-a-dark.png', class: 'animate-t' },
    { id: 'e', lightSrc: basePath + '/static/f-icon/4e-a-light.png', darkSrc: basePath + '/static/f-icon/4e-a-dark.png', class: 'animate-e' },
    { id: 's', lightSrc: basePath + '/static/f-icon/5s-a-light.png', darkSrc: basePath + '/static/f-icon/5s-a-dark.png', class: 'animate-s' }
  ];
  
  const letterElements = letters.map(letter => {
    const div = document.createElement('div');
    div.className = 'notes-letter';
    div.id = 'letter-' + letter.id;
    div.innerHTML = '<img class="letter-light" src="' + letter.lightSrc + '" alt="' + letter.id.toUpperCase() + '"><img class="letter-dark" src="' + letter.darkSrc + '" alt="' + letter.id.toUpperCase() + '">';
    letterContainer.appendChild(div);
    return { el: div, animClass: letter.class };
  });
  
  const notesFullDiv = document.createElement('div');
  notesFullDiv.className = 'notes-full';
  notesFullDiv.innerHTML = '<img class="letter-light" src="' + basePath + '/static/f-icon/notes-full-light.png" alt="NOTES"><img class="letter-dark" src="' + basePath + '/static/f-icon/notes-full-dark.png" alt="NOTES">';
  notesFullContainer.appendChild(notesFullDiv);
  
  let isAnimating = false;
  let animationComplete = false;
  
  function startNotesAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    animationComplete = false;
    notesFullDiv.classList.remove('visible', 'fade-out');
    innerFRects.forEach(rect => rect.classList.add('hidden'));
    
    const delays = [0, 225, 450, 675, 900];
    letterElements.forEach((letter, index) => {
      setTimeout(() => {
        letter.el.classList.remove(letter.animClass);
        void letter.el.offsetWidth;
        letter.el.classList.add(letter.animClass);
      }, delays[index]);
    });
    
    setTimeout(() => {
      letterElements.forEach(letter => letter.el.classList.remove(letter.animClass));
      isAnimating = false;
      animationComplete = true;
      innerFRects.forEach(rect => rect.classList.remove('hidden'));
      notesFullDiv.classList.remove('fade-out');
      notesFullDiv.classList.add('visible');
    }, delays[delays.length - 1] + 400);
  }
  
  function handleMouseMove(e) {
    const svgRect = logo.getBoundingClientRect();
    const scaleX = 800 / svgRect.width;
    const scaleY = 800 / svgRect.height;
    const mouseX = (e.clientX - svgRect.left) * scaleX;
    const mouseY = (e.clientY - svgRect.top) * scaleY;
    
    activeRects.forEach((rect) => {
      if (rect.classList.contains('hidden')) return;
      
      const ox = parseFloat(rect.dataset.origX);
      const oy = parseFloat(rect.dataset.origY);
      const ow = parseFloat(rect.dataset.origW);
      const oh = parseFloat(rect.dataset.origH);
      const cx = ox + ow / 2;
      const cy = oy + oh / 2;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      
      if (dist < 130 && dist > 0) {
        const force = (130 - dist) / 130;
        const angle = Math.atan2(cy - mouseY, cx - mouseX);
        const moveX = Math.cos(angle) * force * 20;
        const moveY = Math.sin(angle) * force * 20;
        
        // Grow-Effekt: Rechteck wird größer
        const growFactor = 1 + force * 0.8; // Bis zu 80% größer
        const newW = ow * growFactor;
        const newH = oh * growFactor;
        // Position anpassen damit es zentriert wächst
        const offsetX = (newW - ow) / 2;
        const offsetY = (newH - oh) / 2;
        
        rect.setAttribute('x', (ox + moveX - offsetX).toString());
        rect.setAttribute('y', (oy + moveY - offsetY).toString());
        rect.setAttribute('width', newW.toString());
        rect.setAttribute('height', newH.toString());
        rect.style.filter = 'drop-shadow(0 0 ' + (force * 12) + 'px #f35a86)';
      } else {
        rect.setAttribute('x', rect.dataset.origX);
        rect.setAttribute('y', rect.dataset.origY);
        rect.setAttribute('width', rect.dataset.origW);
        rect.setAttribute('height', rect.dataset.origH);
        rect.style.filter = '';
      }
    });
  }
  
  function handleMouseEnter() {
    if (isAnimating || animationComplete) return;
    startNotesAnimation();
  }
  
  function handleMouseLeave() {
    activeRects.forEach(rect => {
      rect.setAttribute('x', rect.dataset.origX);
      rect.setAttribute('y', rect.dataset.origY);
      rect.setAttribute('width', rect.dataset.origW);
      rect.setAttribute('height', rect.dataset.origH);
      rect.style.filter = '';
    });
    if (notesFullDiv.classList.contains('visible')) {
      notesFullDiv.classList.add('fade-out');
      notesFullDiv.classList.remove('visible');
    }
    if (!isAnimating) animationComplete = false;
  }
  
  logo.addEventListener('mousemove', handleMouseMove);
  logo.addEventListener('mouseenter', handleMouseEnter);
  logo.addEventListener('mouseleave', handleMouseLeave);
  
  window.addCleanup(() => {
    logo.removeEventListener('mousemove', handleMouseMove);
    logo.removeEventListener('mouseenter', handleMouseEnter);
    logo.removeEventListener('mouseleave', handleMouseLeave);
  });
});
`
}
