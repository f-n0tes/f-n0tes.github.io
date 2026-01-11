import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import Slugger from "github-slugger"

export interface Options {
  maxDepth: 1 | 2 | 3 | 4 | 5 | 6
  minEntries: number
  showByDefault: boolean
  collapseByDefault: boolean
}

const defaultOptions: Options = {
  maxDepth: 3,
  minEntries: 1,
  showByDefault: true,
  collapseByDefault: false,
}

export interface TocEntry {
  depth: number
  text: string
  slug: string // this is just the anchor (#some-slug), not the canonical slug
}

const slugAnchor = new Slugger()
export const TableOfContents: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "TableOfContents",
    markdownPlugins() {
      return [
        () => {
          return async (tree: Root, file) => {
            const display = file.data.frontmatter?.enableToc ?? opts.showByDefault
            if (display) {
              slugAnchor.reset()
              const toc: TocEntry[] = []
              const tocFull: TocEntry[] = []
              let highestDepth: number = opts.maxDepth
              let highestDepthFull: number = 6
              
              visit(tree, "heading", (node) => {
                const text = toString(node)
                const slug = slugAnchor.slug(text)
                
                // Vollständiges TOC (alle Tiefen bis 6)
                highestDepthFull = Math.min(highestDepthFull, node.depth)
                tocFull.push({
                  depth: node.depth,
                  text,
                  slug,
                })
                
                // Sidebar TOC (begrenzt durch maxDepth)
                if (node.depth <= opts.maxDepth) {
                  highestDepth = Math.min(highestDepth, node.depth)
                  toc.push({
                    depth: node.depth,
                    text,
                    slug,
                  })
                }
              })

              if (toc.length > 0 && toc.length > opts.minEntries) {
                file.data.toc = toc.map((entry) => ({
                  ...entry,
                  depth: entry.depth - highestDepth,
                }))
                file.data.collapseToc = opts.collapseByDefault
              }
              
              // Vollständiges TOC für Inline-Anzeige (wenn enableInlineToc im Frontmatter)
              if (tocFull.length > 0 && file.data.frontmatter?.enableInlineToc) {
                file.data.tocFull = tocFull.map((entry) => ({
                  ...entry,
                  depth: entry.depth - highestDepthFull,
                }))
              }
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    toc: TocEntry[]
    tocFull: TocEntry[]
    collapseToc: boolean
  }
}
