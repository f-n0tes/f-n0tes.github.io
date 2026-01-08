// @ts-ignore
import accessibilityScript from "./scripts/accessibility.inline"
import styles from "./styles/accessibility.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const AccessibilityMenu: QuartzComponent = () => {
  return (
    <div class="accessibility-container">
      {/* Haupt-Button - Text Font Symbol */}
      <button class="accessibility-toggle" aria-label="Barrierefreiheit Menü öffnen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          width="24"
          height="24"
        >
          <title>Textgröße</title>
          <path
            fill="currentColor"
            d="M14.4381,5.89605978 C14.80719,5.89622199 15.142422,6.0991108 15.3158565,6.4176109 L15.3675,6.52794 L20.7106,20.0234 L21.0086,20.0234 C21.5609,20.0234 22.0086,20.4711 22.0086,21.0234 C22.0086,21.53625 21.622573,21.9590385 21.1252239,22.0168203 L21.0086,22.02355 L17.9999,22.0233 C17.4477,22.0233 17,21.5756 17,21.0233 C17,20.51045 17.386027,20.0877908 17.8833761,20.0300275 L18,20.0233 L18.5595,20.0233 L17.7584,17.9999 L11.1058,17.9999 L10.3026,20.0233 L11,20.0233 C11.5523,20.0233 12,20.471 12,21.0233 C12,21.53615 11.613973,21.9588092 11.1166239,22.0165725 L11,22.0233 L8,22.0233 C7.44772,22.0233 7,21.5756 7,21.0233 C7,20.51045 7.38603566,20.0877908 7.8833779,20.0300275 L8,20.0233 L8.15081,20.0233 L13.5082,6.52711 C13.6595,6.14601 14.0281,5.89587 14.4381,5.89605978 Z M14.4365,9.6095 L11.8997,15.9999 L16.9666,15.9999 L14.4365,9.6095 Z M7.00057,2 C7.42107,2 7.79664,2.2631 7.94033,2.65829 L10.822,10.5839 L9.71128,13.382 L9.2088,12 L4.79147,12 L3.93981,14.3418 C3.75105,14.8608 3.17727,15.1285 2.65825,14.9398 C2.13922,14.751 1.87149,14.1772 2.06025,13.6582 L6.06075,2.65822 C6.20447,2.26304 6.58006,2 7.00057,2 Z M7.00041,5.92618 L5.51883,10 L8.48162,10 L7.00041,5.92618 Z"
          />
        </svg>
      </button>

      {/* Erweitertes Menü */}
      <div class="accessibility-menu">
        {/* Schriftgröße verkleinern */}
        <button class="accessibility-btn font-decrease" aria-label="Schriftgröße verkleinern">
          <svg width="20" height="20" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-opacity="1" stroke-linejoin="round" d="M 45,25L 59,25L 59,29L 45,29L 45,25 Z M 52.1429,56L 45.4571,56L 42.283,46.7429L 28.4375,46.7429L 25.4,56L 18.7143,56L 32.1339,20L 38.8277,20L 52.1429,56 Z M 40.7402,42.1143L 35.8464,27.417C 35.7018,26.9455 35.5464,26.1875 35.3804,25.1429L 35.2759,25.1429C 35.1313,26.1018 34.9679,26.8598 34.7857,27.417L 29.9563,42.1143L 40.7402,42.1143 Z "/>
          </svg>
        </button>

        {/* Schriftgröße vergrößern */}
        <button class="accessibility-btn font-increase" aria-label="Schriftgröße vergrößern">
          <svg width="20" height="20" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 45.0001,25L 50,25L 50,20L 54,20L 54,25L 59.0001,25L 59.0001,29L 54,29L 54,34L 50,34L 50,29L 45.0001,29L 45.0001,25 Z M 52.1429,56L 45.4571,56L 42.283,46.7429L 28.4375,46.7429L 25.4,56L 18.7143,56L 32.1339,20L 38.8277,20L 52.1429,56 Z M 40.7402,42.1143L 35.8464,27.417C 35.7018,26.9455 35.5464,26.1875 35.3804,25.1429L 35.2759,25.1429C 35.1313,26.1018 34.9679,26.8598 34.7857,27.417L 29.9563,42.1143L 40.7402,42.1143 Z "/>
          </svg>
        </button>

        {/* Table of Contents Button */}
        <div class="toc-wrapper">
          <button class="accessibility-btn toc-btn" aria-label="Inhaltsverzeichnis anzeigen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width="20"
              height="20"
            >
              <title>Inhaltsverzeichnis</title>
              <path fill="currentColor" d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z" />
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
