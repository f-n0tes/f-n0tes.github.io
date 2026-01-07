// @ts-ignore
import accessibilityScript from "./scripts/accessibility.inline"
import styles from "./styles/accessibility.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const AccessibilityMenu: QuartzComponent = () => {
  return (
    <div class="accessibility-container">
      {/* Haupt-Button - Textgrößen-Symbol */}
      <button class="accessibility-toggle" aria-label="Barrierefreiheit Menü öffnen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <title>Textgröße</title>
          {/* Großes A */}
          <path d="M10.5 19H8l-1.2-3.5H2.7L1.5 19H-1L4 5h3l5 14h-1.5zm-2-5.5L7 9l-1.5 4.5h3z" />
          {/* Kleineres A (subscript) */}
          <path d="M22 19h-1.8l-0.8-2.2h-3.3L15.3 19H13.5l3.8-10h1.9l3.8 10h-1zm-3-3.8l-1.2-3.4-1.2 3.4h2.4z" />
        </svg>
      </button>

      {/* Erweitertes Menü */}
      <div class="accessibility-menu">
        {/* Schriftgröße verkleinern */}
        <button class="accessibility-btn font-decrease" aria-label="Schriftgröße verkleinern">
          <span>A-</span>
        </button>

        {/* Schriftgröße vergrößern */}
        <button class="accessibility-btn font-increase" aria-label="Schriftgröße vergrößern">
          <span>A+</span>
        </button>

        {/* Table of Contents Button */}
        <div class="toc-wrapper">
          <button class="accessibility-btn toc-btn" aria-label="Inhaltsverzeichnis anzeigen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <title>Inhaltsverzeichnis</title>
              <path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2zm14-5h4v2h-4v-2z" />
              <rect x="3" y="4" width="2" height="2" />
              <rect x="3" y="11" width="2" height="2" />
              <rect x="3" y="18" width="2" height="2" />
            </svg>
          </button>
          {/* TOC Popup */}
          <div class="toc-popup">
            <div class="toc-popup-header">
              <span>Inhaltsverzeichnis</span>
              <button class="toc-popup-close" aria-label="Schließen">×</button>
            </div>
            <div class="toc-popup-content">
              {/* Wird via JavaScript befüllt */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AccessibilityMenu.afterDOMLoaded = accessibilityScript
AccessibilityMenu.css = styles
AccessibilityMenu.displayName = "AccessibilityMenu"

export default (() => AccessibilityMenu) satisfies QuartzComponentConstructor
