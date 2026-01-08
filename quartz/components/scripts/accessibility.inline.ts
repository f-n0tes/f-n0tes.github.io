document.addEventListener("nav", () => {
  const container = document.querySelector(".accessibility-container") as HTMLElement | null
  if (!container) return

  // Scope all lookups to the container to avoid stale references across navigations
  const toggleBtn = container.querySelector(".accessibility-toggle") as HTMLElement | null
  const fontIncrease = container.querySelector(".font-increase") as HTMLElement | null
  const fontDecrease = container.querySelector(".font-decrease") as HTMLElement | null
  const scrollToTopBtn = container.querySelector(".scroll-to-top") as HTMLElement | null
  const themeToggleBtn = container.querySelector(".theme-toggle") as HTMLElement | null
  const sunIcon = container.querySelector(".sun-icon") as HTMLElement | null
  const moonIcon = container.querySelector(".moon-icon") as HTMLElement | null
  const tocBtn = container.querySelector(".toc-btn") as HTMLElement | null
  const tocPopup = container.querySelector(".toc-popup") as HTMLElement | null
  const tocPopupClose = container.querySelector(".toc-popup-close") as HTMLElement | null
  const tocPopupContent = container.querySelector(".toc-popup-content") as HTMLElement | null

  if (!toggleBtn) return

  // Ensure fresh state on navigation
  container.classList.remove("open")
  tocPopup?.classList.remove("show")

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
  const onToggleClick = (e: Event) => {
    e.stopPropagation()
    container.classList.toggle("open")
    if (!container.classList.contains("open")) {
      tocPopup?.classList.remove("show")
    }
  }
  toggleBtn.addEventListener("click", onToggleClick)
  window.addCleanup(() => toggleBtn.removeEventListener("click", onToggleClick))

  // Außerhalb klicken schließt das Menü
  const onDocumentClick = (e: Event) => {
    if (!container.contains(e.target as Node)) {
      container.classList.remove("open")
      tocPopup?.classList.remove("show")
    }
  }
  document.addEventListener("click", onDocumentClick)
  window.addCleanup(() => document.removeEventListener("click", onDocumentClick))

  // Escape-Taste schließt das Menü
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      container.classList.remove("open")
      tocPopup?.classList.remove("show")
    }
  }
  document.addEventListener("keydown", onKeyDown)
  window.addCleanup(() => document.removeEventListener("keydown", onKeyDown))

  // Schriftgröße vergrößern
  const onFontIncrease = (e: Event) => {
    e.stopPropagation()
    if (currentSize < MAX_SIZE) {
      currentSize = Math.min(MAX_SIZE, currentSize + STEP)
      currentSize = Math.round(currentSize * 10) / 10
      localStorage.setItem(STORAGE_KEY, currentSize.toString())
      applyFontSize()
    }
  }
  fontIncrease?.addEventListener("click", onFontIncrease)
  window.addCleanup(() => fontIncrease?.removeEventListener("click", onFontIncrease))

  // Schriftgröße verkleinern
  const onFontDecrease = (e: Event) => {
    e.stopPropagation()
    if (currentSize > MIN_SIZE) {
      currentSize = Math.max(MIN_SIZE, currentSize - STEP)
      currentSize = Math.round(currentSize * 10) / 10
      localStorage.setItem(STORAGE_KEY, currentSize.toString())
      applyFontSize()
    }
  }
  fontDecrease?.addEventListener("click", onFontDecrease)
  window.addCleanup(() => fontDecrease?.removeEventListener("click", onFontDecrease))

  // TOC Button - zeigt Popup
  const onTocBtnClick = (e: Event) => {
    e.stopPropagation()
    populateTocPopup()
    tocPopup?.classList.toggle("show")
  }
  tocBtn?.addEventListener("click", onTocBtnClick)
  window.addCleanup(() => tocBtn?.removeEventListener("click", onTocBtnClick))

  // TOC Popup schließen Button
  const onTocPopupClose = (e: Event) => {
    e.stopPropagation()
    tocPopup?.classList.remove("show")
  }
  tocPopupClose?.addEventListener("click", onTocPopupClose)
  window.addCleanup(() => tocPopupClose?.removeEventListener("click", onTocPopupClose))

  // Scroll to Top Button
  const onScrollToTop = (e: Event) => {
    e.stopPropagation()
    window.scrollTo({ top: 0, behavior: "smooth" })
    container.classList.remove("open")
  }
  scrollToTopBtn?.addEventListener("click", onScrollToTop)
  window.addCleanup(() => scrollToTopBtn?.removeEventListener("click", onScrollToTop))

  // Theme Toggle Button
  const updateThemeIcons = () => {
    const currentTheme = document.documentElement.getAttribute("saved-theme")
    if (currentTheme === "dark" && sunIcon && moonIcon) {
      sunIcon.style.display = "none"
      moonIcon.style.display = "inline"
    } else if (sunIcon && moonIcon) {
      sunIcon.style.display = "inline"
      moonIcon.style.display = "none"
    }
  }

  updateThemeIcons()

  const onThemeToggle = (e: Event) => {
    e.stopPropagation()
    const currentTheme = document.documentElement.getAttribute("saved-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcons()
    
    // Emit theme change event for other components
    const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
      detail: { theme: newTheme },
    })
    document.dispatchEvent(event)
  }
  themeToggleBtn?.addEventListener("click", onThemeToggle)
  window.addCleanup(() => themeToggleBtn?.removeEventListener("click", onThemeToggle))

  // Listen for theme changes from other sources
  document.addEventListener("themechange", () => {
    updateThemeIcons()
  })
  window.addCleanup(() => document.removeEventListener("themechange", updateThemeIcons))
})
