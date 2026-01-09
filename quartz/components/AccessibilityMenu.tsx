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
          <title>Barrierefreiheit</title>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.3535 8.75H4C3.58579 8.75 3.25 8.41421 3.25 8C3.25 7.58579 3.58579 7.25 4 7.25H13.3535C13.68 6.09575 14.7412 5.25 16 5.25C17.2588 5.25 18.32 6.09575 18.6465 7.25H20C20.4142 7.25 20.75 7.58579 20.75 8C20.75 8.41421 20.4142 8.75 20 8.75H18.6465C18.32 9.90425 17.2588 10.75 16 10.75C14.7412 10.75 13.68 9.90425 13.3535 8.75ZM14.75 8C14.75 7.30964 15.3096 6.75 16 6.75C16.6904 6.75 17.25 7.30964 17.25 8C17.25 8.69036 16.6904 9.25 16 9.25C15.3096 9.25 14.75 8.69036 14.75 8Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.6465 16.75H20C20.4142 16.75 20.75 16.4142 20.75 16C20.75 15.5858 20.4142 15.25 20 15.25H10.6465C10.32 14.0957 9.25878 13.25 8 13.25C6.74122 13.25 5.67998 14.0957 5.35352 15.25H4C3.58579 15.25 3.25 15.5858 3.25 16C3.25 16.4142 3.58579 16.75 4 16.75H5.35352C5.67998 17.9043 6.74122 18.75 8 18.75C9.25878 18.75 10.32 17.9043 10.6465 16.75ZM6.75 16C6.75 15.3096 7.30964 14.75 8 14.75C8.69036 14.75 9.25 15.3096 9.25 16C9.25 16.6904 8.69036 17.25 8 17.25C7.30964 17.25 6.75 16.6904 6.75 16Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Erweitertes Menü */}
      <div class="accessibility-menu">
        {/* Scroll to Top Button */}
        <button class="accessibility-btn scroll-to-top" aria-label="Nach oben scrollen" title="Nach oben scrollen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="18"
            height="18"
          >
            <title>Nach oben</title>
            <path d="M12 5l8 10H4z" />
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <button class="accessibility-btn theme-toggle" aria-label="Design ändern">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="20"
            height="20"
            class="sun-icon"
          >
            <title>Zum dunklen Modus wechseln</title>
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="20"
            height="20"
            class="moon-icon"
            style="display: none;"
          >
            <title>Zum hellen Modus wechseln</title>
            <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Schriftgröße verkleinern */}
        <button class="accessibility-btn font-decrease" aria-label="Schriftgröße verkleinern" title="Schriftgröße verkleinern">
          <svg width="20" height="20" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-opacity="1" stroke-linejoin="round" d="M 45,25L 59,25L 59,29L 45,29L 45,25 Z M 52.1429,56L 45.4571,56L 42.283,46.7429L 28.4375,46.7429L 25.4,56L 18.7143,56L 32.1339,20L 38.8277,20L 52.1429,56 Z M 40.7402,42.1143L 35.8464,27.417C 35.7018,26.9455 35.5464,26.1875 35.3804,25.1429L 35.2759,25.1429C 35.1313,26.1018 34.9679,26.8598 34.7857,27.417L 29.9563,42.1143L 40.7402,42.1143 Z "/>
          </svg>
        </button>

        {/* Schriftgröße vergrößern */}
        <button class="accessibility-btn font-increase" aria-label="Schriftgröße vergrößern" title="Schriftgröße vergrößern">
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
