import { GlobalConfig } from 'payload/types';

const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'text',
    },
  ],
}

export default Header;