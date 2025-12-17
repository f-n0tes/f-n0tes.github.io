import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

// ============================================================================
// EFFEKT-AUSWAHL - Ändere hier den aktiven Effekt!
// ============================================================================
// Verfügbare Effekte:
//   EFFECT_CRAZY    - Wilde Skalierung und Rotation (Original)
//   EFFECT_WAVE     - Sanfte Wellen-Animation
//   EFFECT_GLITCH   - Digitaler Glitch mit Farbverschiebung
//   EFFECT_PULSE    - Sanftes Pulsieren mit Glow
//   EFFECT_EXPLODE  - Rechtecke fliegen vom Cursor weg
//   EFFECT_RAINBOW  - Regenbogen-Farbwechsel
//   EFFECT_OUTLINE  - Wechsel von gefüllt zu Kontur
//   EFFECT_MAGNETIC - Rechtecke werden zur Maus gezogen
//   EFFECT_SHAKE    - Intensives Zittern
//   EFFECT_FADE     - Distanz-basiertes Ausblenden
//   EFFECT_RAINBOW_OUTLINE - Kombination aus Outline und Regenbogen-Glow
//   EFFECT_NONE     - Kein Effekt
//   EFFECT_GRAFFITI  - Graffiti-Spray-Effekt
//   EFFECT_PIXELATE   - Pixel-Effekt
//   EFFECT_BOOKSHELF   - Bücherregal-Effekt
//   EFFECT_CONNECTING_LINES - Verbindungslinien-Effekt
//   EFFECT_EXPANDING_CIRCLES - Expandierende Kreiseffekt
//   EFFECT_EXPLODING_RAINBOW - Explodierender Regenbogen-Effekt
// ============================================================================
import { EFFECT_CONNECTING_LINES as CURRENT_EFFECT } from "./PageTitleEffects"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="icon-link">
        <svg 
          class="page-icon" 
          id="interactive-logo"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 800 800"
        >
          <rect class="logo-rect" x="244.2" y="433.8" width="30" height="218.1"/>
          <rect class="logo-rect" x="227.2" y="226.5" width="30" height="218.1"/>
          <rect class="logo-rect" x="301.5" y="302.9" width="30" height="178.6" transform="translate(708.6 75.7) rotate(90)"/>
          <rect class="logo-rect" x="283.6" y="170.1" width="30" height="142.8" transform="translate(540.1 -57.1) rotate(90)"/>
          <rect class="logo-rect" x="404.8" y="160.2" width="30" height="123.6" transform="translate(641.8 -197.8) rotate(90)"/>
          <rect class="logo-rect" x="88.9" y="451.8" width="30" height="294.6"/>
          <rect class="logo-rect" x="73.9" y="149.5" width="30" height="315"/>
          <rect class="logo-rect" x="660.2" y="415.4" width="30" height="292.8"/>
          <rect class="logo-rect" x="698" y="434.1" width="30" height="294.2"/>
          <rect class="logo-rect" x="641.1" y="131.3" width="30" height="293.9"/>
          <rect class="logo-rect" x="678.9" y="149.5" width="30" height="295.1"/>
          <rect class="logo-rect" x="660" y="263.2" width="30" height="67.8" transform="translate(972.1 -377.9) rotate(90)"/>
          <rect class="logo-rect" x="241.7" y="564.4" width="30" height="335.5" transform="translate(988.9 475.5) rotate(90)"/>
          <rect class="logo-rect" x="471.2" y="473.3" width="30" height="483.6" transform="translate(1201.3 228.9) rotate(90)"/>
          <rect class="logo-rect" x="612.6" y="596.9" width="30" height="200.9" transform="translate(1324.9 69.8) rotate(90)"/>
          <rect class="logo-rect" x="206.1" y="17.3" width="30" height="294.4" transform="translate(385.7 -56.6) rotate(90)"/>
          <rect class="logo-rect" x="518.5" y="-29.2" width="30" height="350.9" transform="translate(679.7 -387.2) rotate(90)"/>
        </svg>
        {/* 
        Auskommentierter ursprünglicher Titel (Aurora-Text):
        <span class="split-link--top aurora-text">{title}</span>
        <span class="split-link--bottom aurora-text">{title}</span>
        */}
      </a>
    </h2>
  )
}

// CSS und JavaScript aus der Effekt-Bibliothek verwenden
PageTitle.css = CURRENT_EFFECT.css
PageTitle.afterDOMLoaded = CURRENT_EFFECT.js

export default (() => PageTitle) satisfies QuartzComponentConstructor
