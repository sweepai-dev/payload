import { CollectionConfig } from '../../../src/collections/config/types';

export const pagesSlug = 'pages';

const Pages: CollectionConfig = {
  slug: pagesSlug,
  admin: {
    useAsTitle: 'title',
    livePreviewURL: 'http://localhost:3001',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
            },
          ],
        },
        {
          slug: 'media',
          graphQL: {
            singularName: 'MediaBlock',
          },
          labels: {
            singular: 'Media Block',
            plural: 'Media Blocks',
          },
          fields: [
            {
              name: 'media',
              label: 'Media',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
              },
            },
            {
              name: 'size',
              label: 'Size',
              type: 'radio',
              defaultValue: 'normal',
              options: [
                {
                  label: 'Normal',
                  value: 'normal',
                },
                {
                  label: 'Wide',
                  value: 'wide',
                },
                {
                  label: 'Fullscreen',
                  value: 'fullscreen',
                },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'richText',
              admin: {
                elements: [
                  'link',
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Pages;
