import path from 'path'
import type { Payload } from 'payload'

import { contact } from './contact-page'
import { desertImage } from './desert-image'
import { home } from './home'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { posts } from './posts-page'
import { project1 } from './project-1'
import { project2 } from './project-2'
import { project3 } from './project-3'
import { projects } from './projects-page'
import { sandImage } from './sand-image'

export const seed = async (payload: Payload): Promise<void> => {
  const { id: userID } = await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      name: 'Payload Dev',
      password: 'test',
      roles: ['admin'],
    },
  })

  const { id: desertDocID } = await payload.create({
    collection: 'media',
    filePath: path.resolve(__dirname, 'desert.jpg'),
    data: desertImage,
  })

  const { id: sandDocID } = await payload.create({
    collection: 'media',
    filePath: path.resolve(__dirname, 'sand.jpg'),
    data: sandImage,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: postOneID } = await payload.create({
    collection: 'posts',
    data: JSON.parse(JSON.stringify(post1)),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: postTwoID } = await payload.create({
    collection: 'posts',
    data: JSON.parse(JSON.stringify(post2)),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: postThreeID } = await payload.create({
    collection: 'posts',
    data: JSON.parse(JSON.stringify(post3)),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: projectOneID } = await payload.create({
    collection: 'projects',
    data: JSON.parse(JSON.stringify(project1).replace(/{{USER}}/g, userID)),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: projectTwoID } = await payload.create({
    collection: 'projects',
    data: JSON.parse(JSON.stringify(project2).replace(/{{USER}}/g, userID)),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: projectThreeID } = await payload.create({
    collection: 'projects',
    data: JSON.parse(JSON.stringify(project3).replace(/{{USER}}/g, userID)),
  })

  const contactPageJSON = JSON.parse(
    JSON.stringify(contact).replace(/{{DESERT_IMAGE}}/g, desertDocID),
  )

  const { id: contactPageID } = await payload.create({
    collection: 'pages',
    data: contactPageJSON,
  })

  const postsPageJSON = JSON.parse(
    JSON.stringify(posts)
      .replace(/{{SAND_IMAGE}}/g, sandDocID)
      .replace(/{{POST_ONE}}/g, postOneID)
      .replace(/{{POST_TWO}}/g, postTwoID)
      .replace(/{{POST_THREE}}/g, postThreeID),
  )

  const { id: postsPageID } = await payload.create({
    collection: 'pages',
    data: postsPageJSON,
  })

  const projectsPageJSON = JSON.parse(
    JSON.stringify(projects)
      .replace(/{{DESERT_IMAGE}}/g, desertDocID)
      .replace(/{{PROJECT_ONE}}/g, projectOneID)
      .replace(/{{PROJECT_TWO}}/g, projectTwoID)
      .replace(/{{PROJECT_THREE}}/g, projectThreeID),
  )

  const { id: projectsPageID } = await payload.create({
    collection: 'pages',
    data: projectsPageJSON,
  })

  const homePageJSON = JSON.parse(
    JSON.stringify(home)
      .replace(/{{SAND_IMAGE}}/g, sandDocID)
      .replace(/{{DESERT_IMAGE}}/g, desertDocID)
      .replace(/{{CONTACT_PAGE}}/g, contactPageID)
      .replace(/{{POSTS_PAGE}}/g, postsPageID)
      .replace(/{{PROJECTS_PAGE}}/g, projectsPageID),
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: homePageID } = await payload.create({
    collection: 'pages',
    data: homePageJSON,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: postsPageID,
            },
            label: 'Posts',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: projectsPageID,
            },
            label: 'Projects',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: contactPageID,
            },
            label: 'Contact',
          },
        },
      ],
    },
  })
}
