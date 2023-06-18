import { Footer, Header } from './payload-types'
import { notFound } from 'next/navigation'
import { Page } from './page.client';

export default async function Home() {
  const home = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug]`).then((res) => res.json()).then((res) => res?.docs?.[0])

  if (!home) {
    return notFound()
  }

  const header: Header = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/header`).then((res) => res.json())
  const footer: Footer = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/footer`).then((res) => res.json())

  return (
    <Page
      data={home}
      header={header}
      footer={footer}
    />
  )
}
