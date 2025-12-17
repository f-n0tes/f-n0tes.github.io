/**
 * Logo-Effekt-Bibliothek für PageTitle
 * 
 * ANLEITUNG: 
 * In PageTitle.tsx den gewünschten Effekt importieren:
 * import { EFFECT_NAME } from "./PageTitleEffects"
 * 
 * Dann CSS und JS zuweisen:
 * PageTitle.css = EFFECT_NAME.css
 * PageTitle.afterDOMLoaded = EFFECT_NAME.js
 */

interface LogoEffect {
  name: string
  description: string
  css: string
  js: string
}

// ============================================================================
// BASIS-CSS (wird von allen Effekten genutzt)
// ============================================================================
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

// ============================================================================
// EFFEKT 1: CRAZY (Original)
// Wilde Skalierung und Rotation
// ============================================================================
export const EFFECT_CRAZY: LogoEffect = {
  name: "Crazy",
  description: "Wilde Skalierung und Rotation mit Glow-Effekt",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.logo-rect.active {
  animation: crazy 0.5s ease-in-out forwards;
}

@keyframes crazy {
  0% { transform: scale(1) rotate(0deg); filter: none; }
  20% { transform: scale(1.3) rotate(10deg); filter: drop-shadow(0 0 3px #f35a86); }
  40% { transform: scale(0.7) rotate(-15deg); filter: drop-shadow(0 0 8px #f35a86); }
  60% { transform: scale(1.4) rotate(12deg); filter: brightness(1.3); }
  80% { transform: scale(0.85) rotate(-8deg); filter: drop-shadow(0 0 5px #fff); }
  100% { transform: scale(1) rotate(0deg); filter: none; }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 60);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 2: WAVE
// Sanfte Wellen-Animation
// ============================================================================
export const EFFECT_WAVE: LogoEffect = {
  name: "Wave",
  description: "Sanfte Wellen, die sich vom Cursor ausbreiten",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transform-origin: center;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.logo-rect.active {
  animation: wave 0.8s ease-out forwards;
}

@keyframes wave {
  0% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-15px) scale(1.1); }
  50% { transform: translateY(5px) scale(0.95); }
  75% { transform: translateY(-5px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      if (dist < 80 && !rect.classList.contains('active')) {
        rect.classList.add('active');
        setTimeout(() => rect.classList.remove('active'), 800);
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 3: GLITCH
// Digitaler Glitch-Effekt
// ============================================================================
export const EFFECT_GLITCH: LogoEffect = {
  name: "Glitch",
  description: "Digitaler Glitch mit Farbverschiebung",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: all 0.1s ease;
}

.logo-rect.active {
  animation: glitch 0.3s steps(5) infinite;
}

@keyframes glitch {
  0% { transform: translate(0); filter: none; }
  20% { transform: translate(-3px, 2px) skewX(5deg); filter: drop-shadow(2px 0 #00ffff) drop-shadow(-2px 0 #ff00ff); }
  40% { transform: translate(3px, -2px) skewX(-3deg); filter: drop-shadow(-2px 0 #00ffff) drop-shadow(2px 0 #ff00ff); }
  60% { transform: translate(-2px, 1px) skewX(2deg); filter: drop-shadow(1px 0 #ffff00); }
  80% { transform: translate(2px, -1px) skewX(-2deg); filter: drop-shadow(-1px 0 #00ff00); }
  100% { transform: translate(0); filter: none; }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 50);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 4: PULSE
// Pulsierender Glow
// ============================================================================
export const EFFECT_PULSE: LogoEffect = {
  name: "Pulse",
  description: "Sanftes Pulsieren mit Glow",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logo-rect.active {
  animation: pulse 0.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    filter: drop-shadow(0 0 2px #f35a86); 
  }
  50% { 
    transform: scale(1.15); 
    filter: drop-shadow(0 0 15px #f35a86) drop-shadow(0 0 30px #f35a86); 
  }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 70);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 5: EXPLODE
// Rechtecke fliegen auseinander
// ============================================================================
export const EFFECT_EXPLODE: LogoEffect = {
  name: "Explode",
  description: "Rechtecke fliegen vom Cursor weg",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    const svgRect = logo.getBoundingClientRect();
    
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const rectCX = bounds.left + bounds.width/2;
      const rectCY = bounds.top + bounds.height/2;
      const dist = Math.hypot(e.clientX - rectCX, e.clientY - rectCY);
      
      if (dist < 100) {
        const angle = Math.atan2(rectCY - e.clientY, rectCX - e.clientX);
        const force = (100 - dist) / 100;
        const moveX = Math.cos(angle) * force * 30;
        const moveY = Math.sin(angle) * force * 30;
        rect.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px) scale(' + (1 + force * 0.3) + ')';
        rect.style.filter = 'drop-shadow(0 0 ' + (force * 10) + 'px #f35a86)';
      } else {
        rect.style.transform = '';
        rect.style.filter = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { r.style.transform = ''; r.style.filter = ''; });
  });
})();
`
}

// ============================================================================
// EFFEKT 6: RAINBOW
// Regenbogen-Farbwechsel
// ============================================================================
export const EFFECT_RAINBOW: LogoEffect = {
  name: "Rainbow",
  description: "Regenbogen-Farbwechsel bei Hover",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logo-rect.active {
  animation: rainbow 1s linear infinite;
}

@keyframes rainbow {
  0% { filter: hue-rotate(0deg) brightness(1.2); }
  25% { filter: hue-rotate(90deg) brightness(1.3); }
  50% { filter: hue-rotate(180deg) brightness(1.2); }
  75% { filter: hue-rotate(270deg) brightness(1.3); }
  100% { filter: hue-rotate(360deg) brightness(1.2); }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 70);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 7: OUTLINE
// Wechsel zwischen Füllung und Kontur
// ============================================================================
export const EFFECT_OUTLINE: LogoEffect = {
  name: "Outline",
  description: "Wechsel von gefüllt zu Kontur mit Animation",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: #f35a86;
  stroke-width: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-rect.active {
  fill: transparent;
  stroke-width: 3;
  animation: outlinePulse 0.5s ease-in-out infinite alternate;
}

@keyframes outlinePulse {
  0% { stroke-width: 2; stroke-dasharray: none; }
  100% { stroke-width: 4; stroke-dasharray: 10 5; }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 60);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 8: MAGNETIC
// Rechtecke werden zur Maus gezogen
// ============================================================================
export const EFFECT_MAGNETIC: LogoEffect = {
  name: "Magnetic",
  description: "Rechtecke werden magnetisch zur Maus gezogen",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: transform 0.15s ease-out;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const rectCX = bounds.left + bounds.width/2;
      const rectCY = bounds.top + bounds.height/2;
      const dist = Math.hypot(e.clientX - rectCX, e.clientY - rectCY);
      
      if (dist < 120) {
        const angle = Math.atan2(e.clientY - rectCY, e.clientX - rectCX);
        const force = (120 - dist) / 120;
        const moveX = Math.cos(angle) * force * 20;
        const moveY = Math.sin(angle) * force * 20;
        rect.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px) scale(' + (1 + force * 0.2) + ')';
        rect.style.filter = 'brightness(' + (1 + force * 0.5) + ')';
      } else {
        rect.style.transform = '';
        rect.style.filter = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { r.style.transform = ''; r.style.filter = ''; });
  });
})();
`
}

// ============================================================================
// EFFEKT 9: SHAKE
// Schnelles Zittern
// ============================================================================
export const EFFECT_SHAKE: LogoEffect = {
  name: "Shake",
  description: "Intensives Zittern bei Hover",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
}

.logo-rect.active {
  animation: shake 0.1s linear infinite;
}

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-4px, 2px); }
  50% { transform: translate(4px, -2px); }
  75% { transform: translate(-2px, -4px); }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 50);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT 10: FADE
// Sanftes Ein-/Ausblenden
// ============================================================================
export const EFFECT_FADE: LogoEffect = {
  name: "Fade",
  description: "Distanz-basiertes Ausblenden",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      
      if (dist < 150) {
        const opacity = 0.3 + (dist / 150) * 0.7;
        const scale = 1.3 - (dist / 150) * 0.3;
        rect.style.opacity = opacity;
        rect.style.transform = 'scale(' + scale + ')';
      } else {
        rect.style.opacity = '1';
        rect.style.transform = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { r.style.opacity = '1'; r.style.transform = ''; });
  });
})();
`
}

// ============================================================================
// EFFEKT 11: RAINBOW_OUTLINE
// Kombination aus Outline und Rainbow
// ============================================================================
export const EFFECT_RAINBOW_OUTLINE: LogoEffect = {
  name: "Rainbow Outline",
  description: "Regenbogen-Kontur mit pulsierender Animation",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: #f35a86;
  stroke-width: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-rect.active {
  fill: transparent;
  stroke-width: 3;
  animation: rainbowOutline 1s linear infinite;
}

@keyframes rainbowOutline {
  0% { 
    stroke-width: 120; 
    filter: hue-rotate(0deg) drop-shadow(0 0 300px currentColor); 
    stroke-dasharray: none;
  }
  25% { 
    stroke-width: 40; 
    filter: hue-rotate(90deg) drop-shadow(0 0 80px currentColor); 
    stroke-dasharray: 15 5;
  }
  50% { 
    stroke-width: 3; 
    filter: hue-rotate(180deg) drop-shadow(0 0 115px currentColor); 
    stroke-dasharray: 10 10;
  }
  75% { 
    stroke-width: 55; 
    filter: hue-rotate(270deg) drop-shadow(0 0 10px currentColor); 
    stroke-dasharray: 5 15;
  }
  100% { 
    stroke-width: 25; 
    filter: hue-rotate(360deg) drop-shadow(0 0 3px currentColor); 
    stroke-dasharray: none;
  }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      rect.classList.toggle('active', dist < 70);
    });
  });
  
  logo.addEventListener('mouseleave', () => rects.forEach(r => r.classList.remove('active')));
})();
`
}

// ============================================================================
// EFFEKT: NONE
// Kein Effekt - nur statisches Logo
// ============================================================================
export const EFFECT_NONE: LogoEffect = {
  name: "None",
  description: "Kein Effekt - statisches Logo",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
}
`,
  js: ``
}

// ============================================================================
// EFFEKT: EXPLODING_RAINBOW
// Dezentere Version von Explode mit Regenbogenfarben
// ============================================================================
export const EFFECT_EXPLODING_RAINBOW: LogoEffect = {
  name: "Exploding Rainbow",
  description: "Sanftes Abstoßen mit Regenbogen-Farbverlauf",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: transform 0.4s ease-out, filter 0.4s ease-out, fill 0.4s ease;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  const colors = ['#eb6f92', '#e54cff', '#b860d1', '#9c27b0', '#00c2ff', '#40e0d0', '#f5d625', '#f7b733', '#ea9d34', '#cc66c1'];
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect, index) => {
      const bounds = rect.getBoundingClientRect();
      const rectCX = bounds.left + bounds.width/2;
      const rectCY = bounds.top + bounds.height/2;
      const dist = Math.hypot(e.clientX - rectCX, e.clientY - rectCY);
      
      if (dist < 120) {
        const angle = Math.atan2(rectCY - e.clientY, rectCX - e.clientX);
        const force = (120 - dist) / 120;
        const moveX = Math.cos(angle) * force * 15;
        const moveY = Math.sin(angle) * force * 15;
        const colorIndex = (index + Math.floor(Date.now() / 200)) % colors.length;
        
        rect.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px) scale(' + (1 + force * 0.15) + ')';
        rect.style.fill = colors[colorIndex];
        rect.style.filter = 'drop-shadow(0 0 ' + (force * 8) + 'px ' + colors[colorIndex] + ')';
      } else {
        rect.style.transform = '';
        rect.style.fill = '';
        rect.style.filter = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { 
      r.style.transform = ''; 
      r.style.fill = ''; 
      r.style.filter = ''; 
    });
  });
})();
`
}

// ============================================================================
// EFFEKT: GRAFFITI
// Spray-Paint / Graffiti Effekt
// ============================================================================
export const EFFECT_GRAFFITI: LogoEffect = {
  name: "Graffiti",
  description: "Graffiti-Spray-Effekt mit Farbspritzern",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logo-rect.sprayed {
  animation: spray 0.6s ease-out forwards;
}

@keyframes spray {
  0% { 
    filter: blur(0px); 
    opacity: 1;
  }
  30% { 
    filter: blur(3px) drop-shadow(2px 2px 0 #eb6f92) drop-shadow(-2px -1px 0 #00c2ff) drop-shadow(1px -2px 0 #f5d625);
    opacity: 0.8;
  }
  60% {
    filter: blur(1px) drop-shadow(4px 3px 2px #e54cff) drop-shadow(-3px 2px 2px #40e0d0);
    transform: scale(1.1);
  }
  100% { 
    filter: blur(0px) drop-shadow(0 0 5px currentColor); 
    opacity: 1;
    transform: scale(1);
  }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  const colors = ['#eb6f92', '#e54cff', '#b860d1', '#00c2ff', '#40e0d0', '#f5d625', '#f7b733'];
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      
      if (dist < 60 && !rect.classList.contains('sprayed')) {
        rect.classList.add('sprayed');
        rect.style.fill = colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => rect.classList.remove('sprayed'), 600);
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { 
      r.classList.remove('sprayed');
      r.style.fill = '';
    });
  });
})();
`
}

// ============================================================================
// EFFEKT: PIXELATE
// Pixel-Auflösungs-Effekt
// ============================================================================
export const EFFECT_PIXELATE: LogoEffect = {
  name: "Pixelate",
  description: "Retro-Pixel-Auflösungseffekt",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: all 0.15s steps(4);
}

.logo-rect.pixelated {
  animation: pixelate 0.4s steps(8) forwards;
}

@keyframes pixelate {
  0% { 
    transform: scale(1); 
    opacity: 1;
  }
  25% { 
    transform: scale(1.5) translate(2px, -2px); 
    opacity: 0.7;
  }
  50% { 
    transform: scale(0.5) translate(-4px, 4px); 
    opacity: 0.5;
  }
  75% { 
    transform: scale(1.2) translate(1px, 1px); 
    opacity: 0.8;
  }
  100% { 
    transform: scale(1); 
    opacity: 1;
  }
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  const colors = ['#eb6f92', '#9c27b0', '#00c2ff', '#f5d625'];
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect, i) => {
      const bounds = rect.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      
      if (dist < 70) {
        if (!rect.classList.contains('pixelated')) {
          rect.classList.add('pixelated');
          rect.style.fill = colors[i % colors.length];
          setTimeout(() => {
            rect.classList.remove('pixelated');
          }, 400);
        }
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { 
      r.classList.remove('pixelated');
      r.style.fill = '';
    });
  });
})();
`
}

// ============================================================================
// EFFEKT: BOOKSHELF
// Bücherregal - Rechtecke kippen wie Bücher
// ============================================================================
export const EFFECT_BOOKSHELF: LogoEffect = {
  name: "Bookshelf",
  description: "Rechtecke kippen wie Bücher im Regal",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transform-origin: bottom center;
  transition: transform 0.3s ease, fill 0.3s ease;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  const colors = ['#eb6f92', '#b860d1', '#9c27b0', '#00c2ff', '#40e0d0', '#ea9d34'];
  
  logo.addEventListener('mousemove', (e) => {
    rects.forEach((rect, i) => {
      const bounds = rect.getBoundingClientRect();
      const rectCX = bounds.left + bounds.width/2;
      const dist = Math.hypot(e.clientX - rectCX, e.clientY - (bounds.top + bounds.height/2));
      
      if (dist < 80) {
        const tiltDirection = e.clientX > rectCX ? 1 : -1;
        const force = (80 - dist) / 80;
        const tilt = tiltDirection * force * 25;
        rect.style.transform = 'perspective(200px) rotateY(' + tilt + 'deg) rotateX(' + (force * -5) + 'deg)';
        rect.style.fill = colors[i % colors.length];
        rect.style.filter = 'drop-shadow(' + (tilt/5) + 'px 2px 3px rgba(0,0,0,0.3))';
      } else {
        rect.style.transform = '';
        rect.style.fill = '';
        rect.style.filter = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    rects.forEach(r => { 
      r.style.transform = ''; 
      r.style.fill = '';
      r.style.filter = '';
    });
  });
})();
`
}

// ============================================================================
// EFFEKT: CONNECTING_LINES
// Verbindungslinien zwischen nahen Rechtecken
// ============================================================================
export const EFFECT_CONNECTING_LINES: LogoEffect = {
  name: "Connecting Lines",
  description: "Leuchtende Verbindungslinien zur Mausposition",
  css: BASE_CSS + `
.logo-rect {
  fill: #f35a86;
  stroke: none;
  cursor: pointer;
  transition: fill 0.2s ease, filter 0.2s ease;
}

.connection-line {
  stroke: url(#lineGradient);
  stroke-width: 2;
  fill: none;
  opacity: 0.7;
  pointer-events: none;
}

#interactive-logo {
  overflow: visible;
}
`,
  js: `
(function() {
  const logo = document.getElementById('interactive-logo');
  if (!logo) return;
  const rects = Array.from(logo.querySelectorAll('.logo-rect'));
  
  // Gradient für Linien erstellen
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = '<linearGradient id="lineGradient"><stop offset="0%" stop-color="#eb6f92"/><stop offset="50%" stop-color="#00c2ff"/><stop offset="100%" stop-color="#f5d625"/></linearGradient>';
  logo.insertBefore(defs, logo.firstChild);
  
  // Container für Linien
  const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  linesGroup.id = 'connection-lines';
  logo.appendChild(linesGroup);
  
  const colors = ['#eb6f92', '#5a3164ff'];
  
  logo.addEventListener('mousemove', (e) => {
    const svgRect = logo.getBoundingClientRect();
    const scaleX = 800 / svgRect.width;
    const scaleY = 800 / svgRect.height;
    const mouseX = (e.clientX - svgRect.left) * scaleX;
    const mouseY = (e.clientY - svgRect.top) * scaleY;
    
    // Alte Linien entfernen
    linesGroup.innerHTML = '';
    
    rects.forEach((rect, i) => {
      const bounds = rect.getBoundingClientRect();
      const rectCX = ((bounds.left - svgRect.left) + bounds.width/2) * scaleX;
      const rectCY = ((bounds.top - svgRect.top) + bounds.height/2) * scaleY;
      const dist = Math.hypot(e.clientX - (bounds.left + bounds.width/2), e.clientY - (bounds.top + bounds.height/2));
      
      if (dist < 100) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', mouseX);
        line.setAttribute('y1', mouseY);
        line.setAttribute('x2', rectCX);
        line.setAttribute('y2', rectCY);
        line.setAttribute('class', 'connection-line');
        line.style.stroke = colors[i % colors.length];
        line.style.opacity = (100 - dist) / 100;
        linesGroup.appendChild(line);
        
        rect.style.fill = colors[i % colors.length];
        rect.style.filter = 'drop-shadow(0 0 5px ' + colors[i % colors.length] + ')';
      } else {
        rect.style.fill = '';
        rect.style.filter = '';
      }
    });
  });
  
  logo.addEventListener('mouseleave', () => {
    linesGroup.innerHTML = '';
    rects.forEach(r => { 
      r.style.fill = ''; 
      r.style.filter = '';
    });
  });
})();
`
}

// ============================================================================
// ALLE EFFEKTE ALS ARRAY (für einfache Iteration)
// ============================================================================
export const ALL_EFFECTS: LogoEffect[] = [
  EFFECT_CRAZY,
  EFFECT_WAVE,
  EFFECT_GLITCH,
  EFFECT_PULSE,
  EFFECT_EXPLODE,
  EFFECT_RAINBOW,
  EFFECT_OUTLINE,
  EFFECT_MAGNETIC,
  EFFECT_SHAKE,
  EFFECT_FADE,
  EFFECT_RAINBOW_OUTLINE,
  EFFECT_NONE,
  EFFECT_EXPLODING_RAINBOW,
  EFFECT_GRAFFITI,
  EFFECT_PIXELATE,
  EFFECT_BOOKSHELF,
  EFFECT_CONNECTING_LINES,
]

// ============================================================================
// STANDARD-EXPORT (aktuell aktiver Effekt)
// Ändere hier, welcher Effekt standardmäßig verwendet wird!
// ============================================================================
export const ACTIVE_EFFECT = EFFECT_CRAZY
