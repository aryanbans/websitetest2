import { Field } from 'payload/types';

const slug: Field = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
    ],
  },
};

export default slug;