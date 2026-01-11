import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

// @ts-ignore
import inlineTocStyle from "./styles/inlineToc.scss"

interface Options {
  title?: string
  collapseByDefault?: boolean
}

const defaultOptions: Options = {
  collapseByDefault: false,
}

export default ((opts?: Partial<Options>) => {
  const options = { ...defaultOptions, ...opts }
  
  const InlineTableOfContents: QuartzComponent = ({
    fileData,
    cfg,
  }: QuartzComponentProps) => {
    // Nur anzeigen wenn tocFull vorhanden (wird nur generiert wenn enableInlineToc: true)
    if (!fileData.tocFull || fileData.tocFull.length === 0) {
      return null
    }

    const title = options.title ?? i18n(cfg.locale).components.tableOfContents.title

    return (
      <details class="inline-toc" open={!options.collapseByDefault}>
        <summary>
          <h2>{title}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold-icon"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </summary>
        <nav class="inline-toc-content">
          <ul>
            {fileData.tocFull.map((tocEntry) => (
              <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
                <a href={`#${tocEntry.slug}`}>
                  {tocEntry.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    )
  }

  InlineTableOfContents.css = inlineTocStyle

  return InlineTableOfContents
}) satisfies QuartzComponentConstructor
