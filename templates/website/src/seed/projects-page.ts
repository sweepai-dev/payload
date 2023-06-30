import type { Page } from '../payload-types'

export const projects: Partial<Page> = {
  title: 'Projects',
  slug: 'projects',
  _status: 'published',
  hero: {
    type: 'highImpact',
    richText: [
      {
        children: [
          {
            text: 'All Projects',
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
    media: '{{DESERT_IMAGE}}',
  },
  layout: [
    {
      introContent: [
        {
          children: [
            {
              text: 'Here are your projects:',
            },
          ],
          type: 'h3',
        },
      ],
      populateBy: 'collection',
      relationTo: 'projects',
      limit: 10,
      blockType: 'archive',
      populatedDocsTotal: 3,
      populatedDocs: [
        {
          relationTo: 'projects',
          value: '{{PROJECT_ONE}}',
        },
        {
          relationTo: 'projects',
          value: '{{PROJECT_TWO}}',
        },
        {
          relationTo: 'projects',
          value: '{{PROJECT_THREE}}',
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
    title: 'Projects Page - Website ABC',
    description: 'This is the projects page of the Next.js Website with Payload CMS',
    image: '{{DESERT_IMAGE}}',
  },
}
