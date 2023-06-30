import type { Page } from '../payload-types'

export const contact: Partial<Page> = {
  title: 'Contact',
  slug: 'contact',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: [
      {
        children: [
          {
            text: 'Contact',
          },
        ],
        type: 'h1',
      },
    ],
    links: [],
    media: '{{DESERT_IMAGE}}',
  },
  layout: [
    {
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
            },
          ],
        },
      ],
      blockType: 'content',
    },
    {
      mediaBlockBackgroundColor: 'white',
      position: 'default',
      media: '{{DESERT_IMAGE}}',
      blockName: 'Media Block',
      blockType: 'mediaBlock',
    },
    {
      ctaBackgroundColor: 'white',
      richText: [
        {
          children: [
            {
              text: 'This is the Call to Action layout building block. It is configurable in the CMS.',
            },
          ],
          type: 'h4',
        },
      ],
      links: [],
      blockType: 'cta',
    },
  ],
  meta: {
    title: 'Contact',
    description: 'Contact page for the Next.js Website with Payload CMS',
    image: '{{DESERT_IMAGE}}',
  },
}
