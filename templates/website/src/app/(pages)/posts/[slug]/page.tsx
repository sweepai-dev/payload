import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Blocks } from '../../../../components/Blocks'
import { Hero } from '../../../../components/Hero'
import { fetchPost, fetchPosts } from '../../../../graphql'
import { mergeOpenGraph } from '../../../../seo/mergeOpenGraph'

const Post = async ({ params: { slug } }) => {
  const post = await fetchPost(slug)

  if (!post) return notFound()

  return (
    <React.Fragment>
      <Hero page={post} />
      <Blocks
        blocks={post.layout}
        disableTopPadding={post.hero.type === 'none' || post.hero.type === 'lowImpact'}
      />
    </React.Fragment>
  )
}

export default Post

export async function generateStaticParams() {
  const posts = await fetchPosts()

  return posts.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await fetchPost(slug)

  const ogImage =
    typeof post?.meta?.image === 'object' &&
    post?.meta?.image !== null &&
    'url' in post?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${post.meta.image.url}`

  return {
    title: post?.meta?.title || 'Website Template',
    description: post?.meta?.description,
    openGraph: mergeOpenGraph({
      title: post?.meta?.title || 'Website Template',
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
