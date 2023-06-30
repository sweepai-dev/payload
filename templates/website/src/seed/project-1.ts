import type { Project } from '../payload-types'

export const project1: Partial<Project> = {
  title: 'Project 1',
  slug: 'project-1',
  _status: 'published',
  publishedDate: '2023-06-30T18:24:15.312Z',
  author: '{{USER}}',
  hero: {
    type: 'lowImpact',
    richText: [
      {
        children: [
          {
            text: 'Project 1',
          },
        ],
        type: 'h1',
      },
    ],
    links: [],
    media: '',
  },
  layout: [
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
                  text: 'Add more layout building blocks for Project 1 below here',
                },
              ],
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
    title: 'Project 1',
    description: 'Project 1 for the Next.js Website with Payload CMS',
    image: '',
  },
}
