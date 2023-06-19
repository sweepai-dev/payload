import { GlobalConfig } from '../../../src/globals/config/types';

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
};

export default Header;
