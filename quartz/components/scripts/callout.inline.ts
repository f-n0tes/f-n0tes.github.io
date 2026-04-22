function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  outerBlock.classList.toggle("is-collapsed")
  const content = outerBlock.getElementsByClassName("callout-content")[0] as HTMLElement
  if (!content) return
  const collapsed = outerBlock.classList.contains("is-collapsed")
  if (collapsed) {
    content.style.height = "0"
  } else {
    content.style.height = content.scrollHeight + "px"
  }
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
    const title = div.getElementsByClassName("callout-title")[0] as HTMLElement
    const content = div.getElementsByClassName("callout-content")[0] as HTMLElement
    if (!title || !content) continue

    title.addEventListener("click", toggleCallout)
    window.addCleanup(() => title.removeEventListener("click", toggleCallout))

    const collapsed = div.classList.contains("is-collapsed")
    if (collapsed) {
      content.style.height = "0"
    } else {
      content.style.height = content.scrollHeight + "px"
    }
  }
}

document.addEventListener("nav", setupCallout)
