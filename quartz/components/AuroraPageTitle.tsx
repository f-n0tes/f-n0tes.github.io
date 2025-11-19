import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const AuroraPageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title", "aurora-title")}>
      <a href={baseDir}>
        {title}
        <div class="aurora">
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
        </div>
      </a>
    </h2>
  )
}

AuroraPageTitle.css = `
.aurora-title {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  position: relative;
  overflow: hidden;
  background: var(--light);
  margin: 0;
  font-family: var(--titleFont);
}

@media screen and (max-width: 800px) {
  .aurora-title {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 370px) {
  .aurora-title {
    font-size: 1.25rem;
    letter-spacing: -0.3px;
  }
}

.aurora-title a {
  color: var(--dark);
  text-decoration: none;
  position: relative;
  display: block;
}

.aurora {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  mix-blend-mode: darken;
  pointer-events: none;
}

.aurora__item {
  overflow: hidden;
  position: absolute;
  width: 60vw;
  height: 60vw;
  background-color: var(--clr-1);
  border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  filter: blur(1rem);
  mix-blend-mode: overlay;
}

.aurora__item:nth-of-type(1) {
  top: -50%;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-1 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(2) {
  background-color: var(--clr-3);
  right: 0;
  top: 0;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-2 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(3) {
  background-color: var(--clr-2);
  left: 0;
  bottom: 0;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-3 8s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(4) {
  background-color: var(--clr-4);
  right: 0;
  bottom: -50%;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-4 24s ease-in-out infinite alternate;
}

@keyframes aurora-1 {
  0% {
    top: 0;
    right: 0;
  }
  50% {
    top: 100%;
    right: 75%;
  }
  75% {
    top: 100%;
    right: 25%;
  }
  100% {
    top: 0;
    right: 0;
  }
}

@keyframes aurora-2 {
  0% {
    top: -50%;
    left: 0%;
  }
  60% {
    top: 100%;
    left: 75%;
  }
  85% {
    top: 100%;
    left: 25%;
  }
  100% {
    top: -50%;
    left: 0%;
  }
}

@keyframes aurora-3 {
  0% {
    bottom: 0;
    left: 0;
  }
  40% {
    bottom: 100%;
    left: 75%;
  }
  65% {
    bottom: 40%;
    left: 50%;
  }
  100% {
    bottom: 0;
    left: 0;
  }
}

@keyframes aurora-4 {
  0% {
    bottom: -50%;
    right: 0;
  }
  50% {
    bottom: 0%;
    right: 40%;
  }
  90% {
    bottom: 50%;
    right: 25%;
  }
  100% {
    bottom: -50%;
    right: 0;
  }
}

@keyframes aurora-border {
  0% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }
  25% {
    border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
  }
  50% {
    border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
  }
  75% {
    border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
  }
  100% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }
}
`

export default (() => AuroraPageTitle) satisfies QuartzComponentConstructor
