import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Blocks } from '../../../../components/Blocks'
import { Hero } from '../../../../components/Hero'
import { fetchProject, fetchProjects } from '../../../../graphql'
import { mergeOpenGraph } from '../../../../seo/mergeOpenGraph'

const Project = async ({ params: { slug } }) => {
  const project = await fetchProject(slug)

  if (!project) return notFound()

  return (
    <React.Fragment>
      <Hero page={project} />
      <Blocks
        blocks={project.layout}
        disableTopPadding={project.hero.type === 'none' || project.hero.type === 'lowImpact'}
      />
    </React.Fragment>
  )
}

export default Project

export async function generateStaticParams() {
  const projects = await fetchProjects()

  return projects.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const project = await fetchProject(slug)

  const ogImage =
    typeof project?.meta?.image === 'object' &&
    project?.meta?.image !== null &&
    'url' in project?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${project.meta.image.url}`

  return {
    title: project?.meta?.title || 'Website Template',
    description: project?.meta?.description,
    openGraph: mergeOpenGraph({
      title: project?.meta?.title || 'Website Template',
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
