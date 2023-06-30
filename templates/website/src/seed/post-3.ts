import type { Post } from '../payload-types'

export const post3: Partial<Post> = {
  title: 'Post 3',
  slug: 'post-3',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: [
      {
        children: [
          {
            text: 'Post 3',
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
                  text: 'Add more layout building blocks for Post 3 below here',
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
    title: 'Post 3',
    description: 'Post 3 for the Next.js Website with Payload CMS',
    image: '',
  },
}
