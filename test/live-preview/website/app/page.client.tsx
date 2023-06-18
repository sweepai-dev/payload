'use client'

import { Blocks } from "./_components/Blocks"
import { Gutter } from "./_components/Gutter"
import { Footer, Header, Page as PageType } from "./payload-types"
import classes from './page.module.scss'
import { useLivePreview } from "./useLivePreview"

export const Page: React.FC<{
  header: Header,
  footer: Footer,
  data: PageType
}> = ({
  header,
  footer,
  data,
}) => {

  const [previewData] = useLivePreview()

  const home = previewData || data

  return (
    <main className={classes.main}>
      <Gutter>
        <header className={classes.header}>
          <a href="https://payloadcms.com" target="_blank" rel="noopener noreferrer" className={classes.logoLink}>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/payloadcms/payload/master/src/admin/assets/images/payload-logo-light.svg" />
              <img className={classes.logo} alt="payload cms logo" src="https://raw.githubusercontent.com/payloadcms/payload/master/src/admin/assets/images/payload-logo-dark.svg" />
            </picture>
          </a>
        </header>
        <div className={classes.body}>
          <Blocks blocks={home.layout} />
        </div>
        <footer className={classes.footer}>
          {footer.content}
        </footer>
      </Gutter>
    </main>
  )
}
