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
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: aurora-shift 12s ease infinite;
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
