import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}

@media screen and (max-width: 350px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  header h1 {
    width: 100%;
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
