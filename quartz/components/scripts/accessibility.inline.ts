document.addEventListener("nav", () => {
  const container = document.querySelector(".accessibility-container")
  const toggleBtn = document.querySelector(".accessibility-toggle")
  const fontIncrease = document.querySelector(".font-increase")
  const fontDecrease = document.querySelector(".font-decrease")
  const tocBtn = document.querySelector(".toc-btn")
  const tocPopup = document.querySelector(".toc-popup")
  const tocPopupClose = document.querySelector(".toc-popup-close")
  const tocPopupContent = document.querySelector(".toc-popup-content")

  if (!container || !toggleBtn) return

  // Aktuelle Schriftgröße aus localStorage oder Standard
  const STORAGE_KEY = "accessibility-font-size"
  const MIN_SIZE = 0.8
  const MAX_SIZE = 1.6
  const STEP = 0.1

  let currentSize = parseFloat(localStorage.getItem(STORAGE_KEY) || "1")

  // Schriftgröße auf alle <p> Elemente anwenden
  function applyFontSize() {
    const paragraphs = document.querySelectorAll("article p, .content p, #quartz-body p")
    paragraphs.forEach((p) => {
      ;(p as HTMLElement).style.fontSize = `${currentSize}em`
    })
  }

  // Schriftgröße beim Laden anwenden
  applyFontSize()

  // TOC Popup befüllen
  function populateTocPopup() {
    if (!tocPopupContent) return
    
    // Versuche das existierende TOC zu finden
    const existingToc = document.querySelector(".toc-content ul, .toc ul, #toc ul")
    
    if (existingToc) {
      // Kopiere das existierende TOC
      tocPopupContent.innerHTML = existingToc.outerHTML
    } else {
      // Fallback: Generiere TOC aus Überschriften
      const headings = document.querySelectorAll("article h1, article h2, article h3, article h4")
      
      if (headings.length === 0) {
        tocPopupContent.innerHTML = "<p class='toc-empty'>Kein Inhaltsverzeichnis verfügbar</p>"
        return
      }
      
      const ul = document.createElement("ul")
      headings.forEach((heading) => {
        const li = document.createElement("li")
        const level = parseInt(heading.tagName.charAt(1))
        li.className = `depth-${level}`
        
        const link = document.createElement("a")
        link.href = `#${heading.id}`
        link.textContent = heading.textContent || ""
        link.addEventListener("click", () => {
          tocPopup?.classList.remove("show")
        })
        
        li.appendChild(link)
        ul.appendChild(li)
      })
      
      tocPopupContent.innerHTML = ""
      tocPopupContent.appendChild(ul)
    }
    
    // Event-Listener für Links im Popup hinzufügen
    tocPopupContent.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        tocPopup?.classList.remove("show")
      })
    })
  }

  // Haupt-Button Toggle
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    container.classList.toggle("open")

    // TOC Popup ausblenden wenn Menü geschlossen wird
    if (!container.classList.contains("open")) {
      tocPopup?.classList.remove("show")
    }
  })

  // Außerhalb klicken schließt das Menü
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target as Node)) {
      container.classList.remove("open")
      tocPopup?.classList.remove("show")
    }
  })

  // Escape-Taste schließt das Menü
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      container.classList.remove("open")
      tocPopup?.classList.remove("show")
    }
  })

  // Schriftgröße vergrößern
  fontIncrease?.addEventListener("click", (e) => {
    e.stopPropagation()
    if (currentSize < MAX_SIZE) {
      currentSize = Math.min(MAX_SIZE, currentSize + STEP)
      currentSize = Math.round(currentSize * 10) / 10 // Rundung auf eine Dezimalstelle
      localStorage.setItem(STORAGE_KEY, currentSize.toString())
      applyFontSize()
    }
  })

  // Schriftgröße verkleinern
  fontDecrease?.addEventListener("click", (e) => {
    e.stopPropagation()
    if (currentSize > MIN_SIZE) {
      currentSize = Math.max(MIN_SIZE, currentSize - STEP)
      currentSize = Math.round(currentSize * 10) / 10 // Rundung auf eine Dezimalstelle
      localStorage.setItem(STORAGE_KEY, currentSize.toString())
      applyFontSize()
    }
  })

  // TOC Button - zeigt Popup
  tocBtn?.addEventListener("click", (e) => {
    e.stopPropagation()
    
    // Popup befüllen
    populateTocPopup()
    
    // Popup toggle
    tocPopup?.classList.toggle("show")
  })

  // TOC Popup schließen Button
  tocPopupClose?.addEventListener("click", (e) => {
    e.stopPropagation()
    tocPopup?.classList.remove("show")
  })
})
