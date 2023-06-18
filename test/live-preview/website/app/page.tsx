import classes from './page.module.scss'
import { Footer, Header } from './payload-types'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers';
import { Blocks } from './_components/Blocks';
import { Fragment } from 'react';
import { Gutter } from './_components/Gutter';

export default async function Home() {
  const { isEnabled: isDraftMode } = draftMode();
  const query = new URLSearchParams('')
  if (isDraftMode || process.env.VERCEL_ENV === 'preview') query.set('encodeSourceMaps', 'true')
  const queryString = query.toString()

  const home = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=home&${queryString}`).then((res) => res.json()).then((res) => res?.docs?.[0])

  if (!home) {
    return notFound()
  }

  const header: Header = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/header${queryString ? `?${queryString}` : ''}`).then((res) => res.json())
  const footer: Footer = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/footer${queryString ? `?${queryString}` : ''}`).then((res) => res.json())

  return (
    <Fragment>
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
    </Fragment>
  )
}
