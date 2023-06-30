import type { Page } from '../payload-types'

export const posts: Partial<Page> = {
  title: 'Posts',
  slug: 'posts',
  _status: 'published',
  hero: {
    type: 'highImpact',
    richText: [
      {
        children: [
          {
            text: 'All Posts',
          },
        ],
        type: 'h1',
      },
    ],
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'secondary',
          reference: null,
          label: 'View on GitHub',
          url: 'https://github.com/payloadcms/template-website',
          newTab: true,
        },
      },
    ],
    media: '{{SAND_IMAGE}}',
  },
  layout: [
    {
      introContent: [
        {
          children: [
            {
              text: 'Here are your posts:',
            },
          ],
          type: 'h3',
        },
      ],
      populateBy: 'collection',
      relationTo: 'posts',
      limit: 10,
      blockType: 'archive',
      populatedDocsTotal: 3,
      populatedDocs: [
        {
          relationTo: 'posts',
          value: '{{POST_ONE}}',
        },
        {
          relationTo: 'posts',
          value: '{{POST_TWO}}',
        },
        {
          relationTo: 'posts',
          value: '{{POST_THREE}}',
        },
      ],
    },
    {
      blockName: 'Content Block',
      blockType: 'content',
      backgroundColor: 'white',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Add more layout building blocks below here',
                },
              ],
              type: 'h3',
            },
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages',
            },
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  meta: {
    title: 'Posts Page - Website ABC',
    description: 'This is the posts page of the Next.js Website with Payload CMS',
    image: '{{SAND_IMAGE}}',
  },
}
