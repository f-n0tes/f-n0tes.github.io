import { QuartzConfig } from "./quartz/cfg"
import * as Tooltip from "./quartz/components/Tooltip"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  // Das ist deine Basiskonfiguration (z.B. die URL der Website)
  baseUrl: "https://fredxgit.github.io/f_notes/",
  theme: {
    // Hier kannst du das Standard-Layout anpassen
    // Wir lassen es für die Explorer-Anpassung unverändert,
    // aber du kannst Farben und Schriftarten hier definieren
    typography: {
      header: "Schibsted Grotesk",
      body: "Source Sans Pro",
      code: "IBM Plex Mono",
    },
    colors: {
      light: {
        // ... (Deine bestehenden Farben beibehalten)
        // Beispiel:
        light: "#faf8f8",
        lightgray: "#e5e5e5",
        gray: "#b8b8b8",
        darkgray: "#4e4e4e",
        dark: "#2b2b2b",
        secondary: "#284b63",
        tertiary: "#84a59d",
        highlight: "rgba(143, 159, 169, 0.15)",
      },
      dark: {
        // ... (Deine bestehenden Farben beibehalten)
        // Beispiel:
        light: "#161618",
        lightgray: "#393639",
        gray: "#646464",
        darkgray: "#d4d4d4",
        dark: "#ebebec",
        secondary: "#7b97aa",
        tertiary: "#84a59d",
        highlight: "rgba(143, 159, 169, 0.15)",
      },
    },
  },

  // Anpassungen für den Seitenbaum/Explorer
  pageTree: {
    // 1. Umbenennung des Explorers: Das Feature heißt "enable_fold"
    // Das erste Element in diesem Array ist das Top-Level-Element, 
    // das den Namen "Explorer" ersetzt.
    enable_fold: [
      {
        // 1. UMBENENNEN DES EXPLORERS
        // Der Standard-Name "Explorer" wird durch den Namen des ersten Elements ersetzt.
        // Wir nennen ihn "Notizen"
        name: "Notizen",
        // Der Pfad ist '/' weil es das Stammverzeichnis ist
        path: "/",
        // Wir wollen, dass dieses Top-Level-Element standardmäßig ausgeklappt ist
        is_open: true,
        // Optional: Du kannst die maximale Tiefe der Ordner festlegen, die angezeigt werden
        // max_depth: 3 
      },
      // 2. NEUE OBERGEORDNETE DROP-DOWN MENÜS ERSTELLEN
      // Hier fügen wir deine spezifischen Top-Level-Kategorien hinzu,
      // vorausgesetzt, die Ordner existieren im 'content/' Verzeichnis.
      // (z.B. content/Belletristik, content/Theorie)

      {
        name: "Belletristik",
        path: "Belletristik", // MUSS zum Ordnernamen in 'content/' passen
        is_open: false,
      },
      {
        name: "Theorie",
        path: "Theorie", // MUSS zum Ordnernamen in 'content/' passen
        is_open: false,
      },
      {
        name: "Projekte",
        path: "Projekte", // MUSS zum Ordnernamen in 'content/' passen
        is_open: false,
      },
      // HINWEIS: Dateien, die nicht in diesen Top-Level-Ordnern liegen,
      // werden automatisch unter dem ersten Element ("Notizen") angezeigt.
    ]
  }

}

export default config