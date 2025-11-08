import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <h2 class={classNames(displayClass, "page-title aurora-text")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 2.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

/* Aurora nur im Text sichtbar */
.aurora-text a {
  position: relative;
  display: inline-block;
  color: transparent;
  background: linear-gradient(90deg, #00c2ff, #33ff8c, #ffc640, #e54cff, #00c2ff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: aurora-shift 10s ease infinite;
  text-decoration: none;
}

/* Sanfte Bewegung */
@keyframes aurora-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
