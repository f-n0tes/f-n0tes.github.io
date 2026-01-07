// @ts-ignore
import accessibilityScript from "./scripts/accessibility.inline"
import styles from "./styles/accessibility.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const AccessibilityMenu: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class="accessibility-container">
      {/* Haupt-Button */}
      <button class="accessibility-toggle" aria-label="Barrierefreiheit Menü öffnen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <title>Barrierefreiheit</title>
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z" />
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

        {/* Text-to-Speech (WIP) */}
        <button class="accessibility-btn tts-btn" aria-label="Text vorlesen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <title>Text vorlesen</title>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
      </div>

      {/* TTS Tooltip/Meldung */}
      <div class="tts-tooltip">
        🚧 Die Text-to-Speech Funktion befindet sich noch in Entwicklung.
      </div>
    </div>
  )
}

AccessibilityMenu.afterDOMLoaded = accessibilityScript
AccessibilityMenu.css = styles

export default (() => AccessibilityMenu) satisfies QuartzComponentConstructor
