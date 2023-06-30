import type { Footer, Header, Page, Post, Project } from '../payload-types'
import { GLOBALS } from './globals'
import { PAGE, PAGES } from './pages'
import { POST, POST_SLUGS } from './posts'
import { PROJECT, PROJECT_SLUGS } from './projects'

const next: { revalidate: false } = {
  revalidate: false,
}

export const fetchGlobals = async (): Promise<{
  header: Header
  footer: Footer
}> => {
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?globals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: GLOBALS,
    }),
  }).then(res => res.json())

  return {
    header: data.Header,
    footer: data.Footer,
  }
}

export const fetchPages = async (): Promise<
  Array<{ breadcrumbs: Page['breadcrumbs']; slug: string }>
> => {
  const { data, errors } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: PAGES,
    }),
  }).then(res => res.json())

  if (errors) {
    console.error(JSON.stringify(errors)) // eslint-disable-line no-console
    throw new Error()
  }

  return data.Pages.docs
}

export const fetchPage = async (incomingSlugSegments?: string[]): Promise<Page | null> => {
  const slugSegments = incomingSlugSegments || ['home']
  const slug = slugSegments.at(-1)
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?page=${slug}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        query: PAGE,
        variables: {
          slug,
        },
      }),
    },
  ).then(res => res.json())

  if (errors) {
    console.error(JSON.stringify(errors)) // eslint-disable-line no-console
    throw new Error()
  }

  const pagePath = `/${slugSegments.join('/')}`

  const page = data.Pages?.docs.find(({ breadcrumbs }: Page) => {
    if (!breadcrumbs) return false
    const { url } = breadcrumbs[breadcrumbs.length - 1]
    return url === pagePath
  })

  if (page) {
    return page
  }

  return null
}

export const fetchPosts = async (): Promise<Array<{ slug: string }>> => {
  const { data, errors } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: POST_SLUGS,
    }),
  }).then(res => res.json())

  if (errors) {
    console.error(JSON.stringify(errors)) // eslint-disable-line no-console
    throw new Error()
  }

  return data?.Posts?.docs
}

export const fetchPost = async (slug: string): Promise<Post> => {
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?post=${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: POST,
      variables: {
        slug,
      },
    }),
  }).then(res => res.json())

  return data?.Posts?.docs[0]
}

export const fetchProjects = async (): Promise<Array<{ slug: string }>> => {
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?projects`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        query: PROJECT_SLUGS,
      }),
    },
  ).then(res => res.json())

  if (errors) {
    console.error(JSON.stringify(errors)) // eslint-disable-line no-console
    throw new Error()
  }

  return data?.Projects?.docs
}

export const fetchProject = async (slug: string): Promise<Project> => {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql?project=${slug}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        query: PROJECT,
        variables: {
          slug,
        },
      }),
    },
  ).then(res => res.json())

  return data?.Projects?.docs[0]
}
