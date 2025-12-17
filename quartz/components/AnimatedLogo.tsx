import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const AnimatedLogo: QuartzComponentConstructor = () => {
  const AnimatedLogoComponent: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    
    return (
      <a href={baseDir} class="animated-logo-link" id="animated-logo">
        <svg id="f-logo" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
          <defs>
            <style>{`.st0 { stroke: #eb6f92; stroke-miterlimit: 10; }`}</style>
          </defs>
          <g id="logo-content">
            <rect class="st0" x="244.2" y="433.8" width="30" height="218.1"/>
            <rect class="st0" x="227.2" y="226.5" width="30" height="218.1"/>
            <rect class="st0" x="301.5" y="302.9" width="30" height="178.6" transform="translate(708.6 75.7) rotate(90)"/>
            <rect class="st0" x="283.6" y="170.1" width="30" height="142.8" transform="translate(540.1 -57.1) rotate(90)"/>
            <rect class="st0" x="404.8" y="160.2" width="30" height="123.6" transform="translate(641.8 -197.8) rotate(90)"/>
            <rect class="st0" x="88.9" y="451.8" width="30" height="294.6"/>
            <rect class="st0" x="73.9" y="149.5" width="30" height="315"/>
            <rect class="st0" x="660.2" y="415.4" width="30" height="292.8"/>
            <rect class="st0" x="698" y="434.1" width="30" height="294.2"/>
            <rect class="st0" x="641.1" y="131.3" width="30" height="293.9"/>
            <rect class="st0" x="678.9" y="149.5" width="30" height="295.1"/>
            <rect class="st0" x="660" y="263.2" width="30" height="67.8" transform="translate(972.1 -377.9) rotate(90)"/>
            <rect class="st0" x="241.7" y="564.4" width="30" height="335.5" transform="translate(988.9 475.5) rotate(90)"/>
            <rect class="st0" x="471.2" y="473.3" width="30" height="483.6" transform="translate(1201.3 228.9) rotate(90)"/>
            <rect class="st0" x="612.6" y="596.9" width="30" height="200.9" transform="translate(1324.9 69.8) rotate(90)"/>
            <rect class="st0" x="206.1" y="17.3" width="30" height="294.4" transform="translate(385.7 -56.6) rotate(90)"/>
            <rect class="st0" x="518.5" y="-29.2" width="30" height="350.9" transform="translate(679.7 -387.2) rotate(90)"/>
          </g>
        </svg>
      </a>
    )
  }
  
  AnimatedLogoComponent.displayName = "AnimatedLogo"
  
  return AnimatedLogoComponent
}

export default AnimatedLogo



AnimatedLogo.css = `
.animated-logo-link {
  display: block;
  text-decoration: none;
  width: 144px;
  height: 144px;
  flex-shrink: 0;
  cursor: pointer;
}

.animated-logo-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.animated-logo-container svg {
  width: 100%;
  height: 100%;
  background: transparent;
}

.st0 {
  stroke: #eb6f92;
  stroke-miterlimit: 10;
}

/* Mobile Optimierung */
@media all and (max-width: 800px) {
  .animated-logo-link {
    width: 120px;
    height: 120px;
  }
}

@media all and (max-width: 370px) {
  .animated-logo-link {
    width: 108px;
    height: 108px;
  }
}
`

AnimatedLogo.displayName = "AnimatedLogo"
