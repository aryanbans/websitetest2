import path from 'path';
import dotenv from 'dotenv';

import { buildConfig } from 'payload/config';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

import Users from './collections/Users';
import Page from './collections/Page';
import Media from './collections/Media';
import FormSubmission from './collections/FormSubmission';
//import Study from './collections/Study';
//import Category from './collections/Category';
//import MegaMenu from './globals/MegaMenu';
//import SocialMedia from './globals/SocialMedia';
//import Footer from './globals/Footer';

dotenv.config();

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Page,
    //Study,
    Media,
    FormSubmission,
    //Category,
  ],
  globals: [
   // MegaMenu,
   // SocialMedia,
   // Footer,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
});
