import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/scroll-observer.inline"

const ScrollObserver: QuartzComponent = () => {
  return null
}

ScrollObserver.beforeDOMLoaded = script

export default (() => ScrollObserver) satisfies QuartzComponentConstructor