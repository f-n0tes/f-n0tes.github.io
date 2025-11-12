// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// KORREKTUR: Importiere OHNE die Endung .ts (Quartz fügt die Endung selbst hinzu)
import scrollFadeScript from "./scripts/scroll-fade.inline" 

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
    // ... (Hier bleibt die Komponenten-Logik ohne Hooks, wie zuvor besprochen) ...
    return (
        <div 
            id="quartz-body" 
        >
            {children}
        </div>
    )
}

// Hier injizierst du das neue Script
Body.afterDOMLoaded = `
    ${clipboardScript}
    ${scrollFadeScript}
`
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor