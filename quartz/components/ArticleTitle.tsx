import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const subtitle = fileData.frontmatter?.subtitle as string | undefined
  if (title) {
    return (
      <header class={classNames(displayClass, "article-header")}>
        <h1 class="article-title">{title}</h1>
        {subtitle && <p class="article-subtitle">{subtitle}</p>}
      </header>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-header {
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.article-title {
  margin: 0;
  text-align: left;
}

.article-subtitle {
  margin: 0.1rem 0 0 0;
  font-size: 1.2rem !important;
  color: var(--dark);
  font-style: italic;
  text-align: left;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
