let isReaderMode = false;
let lastScrollTop = 0;

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  });
  document.dispatchEvent(event);
};

const setReaderMode = (mode: "on" | "off") => {
  isReaderMode = mode === "on";
  document.documentElement.setAttribute("reader-mode", mode);
  emitReaderModeChangeEvent(mode);
};

document.addEventListener("nav", () => {
  // Button-Logik bleibt erhalten
  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", () => {
      const newMode = isReaderMode ? "off" : "on";
      setReaderMode(newMode);
    });
    window.addCleanup(() => readerModeButton.removeEventListener("click", () => {}));
  }

  // Klicks auf die Accessibility-UI deaktivieren direkt den Reader Mode
  const accessibilityContainer = document.querySelector(".accessibility-container");
  const onAccessibilityClick = () => {
    if (isReaderMode) {
      setReaderMode("off");
    }
  };
  accessibilityContainer?.addEventListener("click", onAccessibilityClick, { capture: true });
  window.addCleanup(() =>
    accessibilityContainer?.removeEventListener("click", onAccessibilityClick, true)
  );

  // Scroll-Logik
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (window.innerWidth <= 800) {
      if (currentScroll > lastScrollTop + 10) {
        setReaderMode("on"); // Runterscrollen → ReaderMode aktiv
      } else if (currentScroll < lastScrollTop - 10) {
        setReaderMode("off"); // Hochscrollen → ReaderMode deaktiviert
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Initialzustand setzen
  setReaderMode(isReaderMode ? "on" : "off");
});
