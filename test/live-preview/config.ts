import path = require('path');
import { buildConfig } from '../buildConfig';
import { devUser } from '../credentials';
import Media, { mediaSlug } from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';
import Footer from './globals/Footer';
import Header from './globals/Header';
import removeFiles from '../helpers/removeFiles';
import getFileByPath from '../../src/uploads/getFileByPath';

const mockModulePath = path.resolve(__dirname, './mocks/mockFSModule.js');

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: mockModulePath,
        },
      },
    }),
  },
  collections: [
    Media,
    Pages,
    Users,
  ],
  globals: [
    Header,
    Footer,
  ],
  graphQL: {
    schemaOutputFile: './test/live-preview/schema.graphql',
  },
  onInit: async (payload) => {
    const uploadsDir = path.resolve(__dirname, './media');
    removeFiles(uploadsDir);

    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    // Create image
    const imageFilePath = path.resolve(__dirname, './payload.jpg');
    const imageFile = await getFileByPath(imageFilePath);

    const { id: uploadedImage } = await payload.create({
      collection: mediaSlug,
      data: {
        alt: 'Payload',
      },
      file: imageFile,
    });

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        layout: [
          {
            richText: [
              {
                children: [
                  {
                    text: 'Payload Live Preview',
                  },
                ],
                type: 'h1',
              },
              {
                children: [
                  {
                    text: 'This is a demo of Payload Live Preview. Edit any of the fields within the CMS to see the content immediately updated here. ',
                  },
                ],
              },
            ],
            id: '648b6fe96f2caa1d485e277f',
            blockType: 'content',
          },
          {
            media: uploadedImage,
            size: 'normal',
            caption: [
              {
                children: [
                  {
                    text: 'This is an image caption.',
                  },
                ],
              },
            ],
            blockType: 'media',
          },
        ],
        slug: 'home',
        _status: 'published',
      },
    });

    await payload.updateGlobal({
      slug: 'header',
      data: {
        content: 'This is a header.',
      },
    });

    await payload.updateGlobal({
      slug: 'footer',
      data: {
        content: 'This is a footer.',
      },
    });
  },
});
