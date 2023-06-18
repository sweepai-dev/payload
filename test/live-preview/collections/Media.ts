import path from 'path';
import { CollectionConfig } from '../../../src/collections/config/types';

export const mediaSlug = 'media';

const Media: CollectionConfig = {
  slug: mediaSlug,
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Uploads are set to read-only for this demo.',
  },
  upload: {
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../media'),
    mimeTypes: ['image/png', 'image/jpeg'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
