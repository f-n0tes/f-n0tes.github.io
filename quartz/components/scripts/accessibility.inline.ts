document.addEventListener("nav", () => {
  const container = document.querySelector(".accessibility-container")
  const toggleBtn = document.querySelector(".accessibility-toggle")
  const fontIncrease = document.querySelector(".font-increase")
  const fontDecrease = document.querySelector(".font-decrease")
  const ttsBtn = document.querySelector(".tts-btn")
  const ttsTooltip = document.querySelector(".tts-tooltip")

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

  // Haupt-Button Toggle
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    container.classList.toggle("open")

    // Tooltip ausblenden wenn Menü geschlossen wird
    if (!container.classList.contains("open")) {
      ttsTooltip?.classList.remove("show")
    }
  })

  // Außerhalb klicken schließt das Menü
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target as Node)) {
      container.classList.remove("open")
      ttsTooltip?.classList.remove("show")
    }
  })

  // Escape-Taste schließt das Menü
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      container.classList.remove("open")
      ttsTooltip?.classList.remove("show")
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

  // TTS Button - zeigt Tooltip
  let tooltipTimeout: ReturnType<typeof setTimeout> | null = null

  ttsBtn?.addEventListener("click", (e) => {
    e.stopPropagation()

    // Tooltip anzeigen
    ttsTooltip?.classList.add("show")

    // Vorherigen Timeout löschen falls vorhanden
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout)
    }

    // Tooltip nach 4 Sekunden ausblenden
    tooltipTimeout = setTimeout(() => {
      ttsTooltip?.classList.remove("show")
    }, 4000)
  })
})
