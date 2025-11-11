import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="split-link">
        <span class="split-link--top aurora-text">{title}</span>
        <span class="split-link--bottom aurora-text">{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 3rem;
  margin: 0;
  font-family: var(--titleFont);
  overflow: visible;
}

/* Aurora Gradient Effekt */
.aurora-text {
  color: transparent;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: aurora-shift 300s ease infinite;
}

@keyframes aurora-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Aurora Gradient für die Linien */
@keyframes aurora-line-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Split Link Container */
.split-link {
  position: relative;
  display: inline-block;
  padding: 0;
  line-height: 1em;
  margin: 0;
  text-decoration: none;
  overflow: visible;
}

/* Oberer Teil des Split-Textes */
.split-link--top {
  position: absolute;
  top: 0;
  display: inline-block;
  clip-path: polygon(0% 66%, 0% 0%, 110% 0%, 110% 40%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

/* Aurora Linie oben beim Hover */
.split-link--top:after {
  content: "";
  position: absolute;
  top: 52%;
  left: -0.25em;
  width: 95%;
  height: 4%;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  animation: aurora-line-shift 300s ease infinite;
  transform: rotateZ(-2.2deg) scaleX(0%);
  transform-origin: right top;
  transition: transform 0.1s ease 0.11s;
}

/* Unterer Teil des Split-Textes */
.split-link--bottom {
  display: inline-block;
  clip-path: polygon(0% 65%, 100% 40%, 110% 40%, 110% 120%, 0% 120%);
  transition: background-position 0.1s ease 0.11s;
  text-decoration: none;
  position: relative;
  overflow: visible;
}

/* Aurora Unterstrich (standardmäßig sichtbar) */
.split-link--bottom:before {
  content: "";
  position: absolute;
  bottom: 0em;
  left: 0;
  width: 106%;
  height: 0.05em;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  animation: aurora-line-shift 300s ease infinite;
  transform: rotateZ(-2deg) scaleX(100%);
  transform-origin: left;
  transition: transform 0.1s ease;
  border-radius: 0.15em;
}

/* Aurora Linie unten beim Hover */
.split-link--bottom:after {
  content: "";
  position: absolute;
  top: 10%;
  left: 0;
  width: 115%;
  height: 4%;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  animation: aurora-line-shift 300s ease infinite;
  transform: rotateZ(-6deg) scaleX(0%);
  transform-origin: right top;
  transition: transform 0.1s ease 0.11s;
}

/* Hover Animationen */
.split-link:hover .split-link--top {
  transform: translateY(-0.2em) rotateZ(-1.4deg);
  transition: transform 0.25s cubic-bezier(.12,.8,.57,1.00) 0.21s;
}

.split-link:hover .split-link--bottom:before {
  transform: rotateZ(-6deg) scaleX(0%);
  transition: transform 0.3s ease 0.22s;
}

.split-link:hover .split-link--top:after {
  top: 62%;
  transform-origin: left top;
  transform: rotateZ(-2.2deg) scaleX(100%);
}

.split-link:hover .split-link--bottom:after {
  top: 65%;
  transform-origin: left top;
  transform: rotateZ(-4.4deg) scaleX(100%);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor