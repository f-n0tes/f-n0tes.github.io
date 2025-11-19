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
  line-height: 1.2;  /* Gibt mehr vertikalen Raum */
  padding-top: 0.05em;  /* Extra Platz oben */
}

@media all and (max-width: 800px) { /* Mobile Anpassung */
  .page-title {
    font-size: 1.5rem;
  }
}

/* Aurora Gradient Effekt */
.aurora-text {
  color: transparent;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: aurora-shift 300s ease infinite;
  padding-top: 0.05em;  /* Wichtig! */
  padding-bottom: 0.05em;  /* Wichtig! */
  display: inline-block;  /* Wichtig! */
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
  clip-path: polygon(0% 70%, 0% -10%, 110% -10%, 110% 45%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
  overflow: visible;
}

/* Aurora Linie oben beim Hover */
.split-link--top:after {
  content: "";
  position: absolute;
  top: 52%;
  left: -0.25em;
  width: 127%;
  height: 3%;
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
  clip-path: polygon(0% 68%, 100% 43%, 110% 43%, 110% 120%, 0% 120%);
  transition: background-position 0.1s ease 0.11s;
  text-decoration: none;
  position: relative;
  overflow: visible;
}

/* Aurora Unterstrich (standardmäßig sichtbar) */
.split-link--bottom:before {
  content: "";
  position: absolute;
  bottom: 0.125em;
  left: 0;
  width: 106%;
  height: 0.075em;
  background: linear-gradient(90deg, #eb6f92, #e54cff, #b860d1, #9c27b0, #00c2ff, #40e0d0, #f5d625, #f7b733, #ea9d34, #cc66c1, #eb6f92);
  background-size: 400% 400%;
  animation: aurora-line-shift 300s ease infinite;
  transform: rotateZ(-2deg) scaleX(100%);
  transform-origin: left;
  transition: transform 0.1s ease;
  clip-path: polygon(
    0 50%, 
    88% 0, 92% 0, 96% 5%, 100% 15%,  /* obere Rundung - sehr stark */
    100% 85%, 96% 95%, 92% 100%, 88% 100%,  /* untere Rundung - sehr stark */
    0 50%
  );
  filter: blur(0.3px);
}

/* Aurora Linie unten beim Hover */
.split-link--bottom:after {
  content: "";
  position: absolute;
  top: 10%;
  left: 0;
  width: 125%;
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
  top: 70%;
  transform-origin: left top;
  transform: rotateZ(-4.2deg) scaleX(100%);
}

.split-link:hover .split-link--bottom:after {
  top: 65%;
  transform-origin: left top;
  transform: rotateZ(-4.4deg) scaleX(100%);
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