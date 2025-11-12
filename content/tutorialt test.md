# 📜 Quartz Scroll-Fadeout-Effekt: Finales Tutorial

Dieses Tutorial verwendet die Overlay-Methode (position: fixed und z-index), die in Ihrem komplexen Grid-Layout am stabilsten funktioniert, und stellt sicher, dass die JavaScript-Klasse korrekt mit den CSS-Regeln verknüpft wird.

Dieses Tutorial zeigt, wie Sie einen eleganten Fadeout-Schatten am unteren Bildschirmrand implementieren, der sichtbar wird, sobald der Seiteninhalt scrollbar ist, und verschwindet, sobald das Ende der Seite erreicht ist.

## 1. JavaScript/TypeScript-Logik (scroll-fade.inline.ts) 💻

Wir verwenden ein Inline-Skript, um die Klasse scrolled-down basierend auf der Scroll-Position dynamisch dem `<body>`-Tag hinzuzufügen und zu entfernen.

Ziel: Fügen Sie die Klasse scrolled-down zum `<body>` hinzu, solange der Benutzer nicht am Ende der Seite ist.

scroll-fade.inline.ts

Ersetzen Sie den Inhalt Ihrer Skriptdatei durch diesen Code:

```TypeScript

// scroll-fade.inline.ts

// Wichtig: Wir verwenden document.body, da der Body der Haupt-Scroll-Container ist.

const contentWrapper = document.body;

if (contentWrapper) {

    const toggleScrollClass = () => {

        // Die Höhe des gesamten Dokuments (inkl. unsichtbarem Teil)

        const scrollHeight = document.documentElement.scrollHeight;

        // Die aktuelle Scroll-Position von oben

        const scrollTop = window.scrollY;

        // Die sichtbare Höhe des Viewports

        const clientHeight = document.documentElement.clientHeight;

        // Toleranz (z.B. 10 Pixel), um den Effekt nicht zu abrupt verschwinden zu lassen

        const tolerance = 10;

        // Ist die aktuelle Position + sichtbare Höhe kleiner als die Gesamthöhe minus Toleranz?

        // -> Ja: Wir sind NICHT am unteren Ende.

        const isNotAtBottom = (scrollTop + clientHeight) < (scrollHeight - tolerance);

        if (isNotAtBottom) {

            contentWrapper.classList.add('scrolled-down');

        } else {

            contentWrapper.classList.remove('scrolled-down');

        }

    };

    // Events hinzufügen, um die Klasse zu aktualisieren

    window.addEventListener('scroll', toggleScrollClass);

    window.addEventListener('resize', toggleScrollClass);

    // Initialen Check beim Laden ausführen

    toggleScrollClass();

}

export default "";

```

## 2. SCSS/Sass-Styles (base.scss) 🎨

Der Effekt wird durch ein fixiertes Pseudo-Element (::after) auf dem .page-Container erzeugt, das einen transparenten Gradienten aufweist.

### A. Overlay-Definition (.page::after)

Fügen Sie diesen Block ans Ende Ihrer base.scss hinzu, außerhalb jeder Verschachtelung.

```SCSS
/\* --- 1. Fixiertes Overlay definieren (MUSS AUSSERHALB DER VERSCHACHTELUNG) --- \*/
.page::after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    /\* Optional: An die Breite des .page-Containers anpassen \*/
    right: 0;
    height: 100px; /\* Höhe des Fading-Bereichs \*/
    pointer-events: none; /\* Wichtig: Lässt Klicks auf den darunterliegenden Inhalt durch \*/
    z-index: 9999; /\* Sehr hoch, um über Header, Sidebar etc. zu liegen \*/
    /\* Der Gradient verblasst von der Hintergrundfarbe zu transparent \*/
    background: linear-gradient(
        to top,
        var(--light) 0%,
        transparent 100%
    );

    opacity: 0; /\* Standardmäßig unsichtbar \*/
    transition: opacity 0.3s ease-out; /\* Weicher Übergang \*/
}
```

### B. Aktivierung durch die JS-Klasse

Definieren Sie den Selektor, der das Overlay sichtbar macht, wenn das `<body>` die Klasse scrolled-down hat:

```SCSS

/\* --- 2. Sichtbarkeit durch die JS-Klasse steuern --- \*/

/\* Wenn der body scrollt, wird das Overlay auf der .page sichtbar \*/

body.scrolled-down .page::after {

    opacity: 1;

}

```

### C. (Optional) Farbverlauf im Body (falls gewünscht)

Wenn Sie den leichten Farbverlauf im `<body>` behalten möchten, stellen Sie sicher, dass die Farbe im Overlay (.page::after) mit der unteren Farbe des Body-Verlaufs übereinstimmt:

````md
```css
/\* Beispiel für body-Verlauf \*/
body {
    /\* ... \*/
    background: linear-gradient(180deg, var(--light), var(--lightgraysoft));
}

/\* Im Overlay anpassen, falls body-Verlauf aktiv \*/

.page::after {

    /\* ... \*/

    background: linear-gradient(

        to top,

        var(--lightgraysoft) 0%, /\* Hier MUSS die UNTERE FARBE des body-Verlaufs hin \*/

        transparent 100%

    );

    /\* ... \*/

}

```
````

## 3. Abschließende Schritte 🚀

Speichern: Speichern Sie scroll-fade.inline.ts und base.scss.

Kompilieren: Starten Sie Ihr Quartz-Build-System neu (z. B. npm run dev), um die SCSS in CSS und die TypeScript-Datei zu kompilieren.

Testen: Führen Sie einen Hard-Reload der Seite (Strg+F5 / Cmd+Shift+R) durch und scrollen Sie nach unten, um den Fadeout-Effekt zu sehen.
