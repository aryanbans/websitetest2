import { CollectionConfig } from 'payload/types';
import { Type as MediaType } from './Media';

import slug from '../fields/slug';
import meta, { Type as MetaType } from '../fields/meta';

import { Content, Type as ContentType } from '../blocks/Content';
import { Media, Type as MediaBlockType } from '../blocks/Media';
import Statistics, { Type as StatisticsType } from '../blocks/Statistics';
import Spacer, { Type as SpacerType } from '../blocks/Spacer';
import CallToAction, { Type as CallToActionType } from '../blocks/CallToAction';
import MediaContentCollage, { Type as ImageContentCollageType } from '../blocks/MediaContentCollage';
import MediaStatCollage, { Type as MediaStatCollageType } from '../blocks/MediaStatCollage';
import MediaGrid, { Type as MediaGridType } from '../blocks/MediaGrid';
import MediaCollage, { Type as MediaCollageType } from '../blocks/MediaCollage';
import CTAGrid, { Type as CTAGridType } from '../blocks/CTAGrid';
import { slateEditor } from '@payloadcms/richtext-slate';

export type Layout =
  CallToActionType
  | ContentType
  | CTAGridType
  | MediaBlockType
  | MediaCollageType
  | ImageContentCollageType
  | MediaGridType
  | MediaStatCollageType
  | SpacerType
  | StatisticsType;

export type HeroType = 'minimal' | 'contentAboveMedia' | 'contentLeftOfMedia';

export type Type = {
  title: string;
  heroType: 'minimal' | 'contentAboveMedia' | 'contentLeftOfMedia';
  heroContent: unknown;
  heroMedia?: MediaType;
  slug: string;
  image?: MediaType;
  layout: Layout[];
  meta: MetaType;
};

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: (): boolean => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: [],
        }
      }),
    },
    {
      type: 'radio',
      name: 'heroType',
      label: 'Hero Type',
      required: true,
      defaultValue: 'minimal',
      options: [
        {
          label: 'Minimal',
          value: 'minimal',
        },
        {
          label: 'Content Above Media',
          value: 'contentAboveMedia',
        },
        {
          label: 'Content Left of Media',
          value: 'contentLeftOfMedia',
        },
      ],
    },
    {
      name: 'heroContent',
      label: 'Hero Content',
      type: 'richText',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.heroType === 'contentAboveMedia' || siblingData?.heroType === 'contentLeftOfMedia',
      },
    },
    {
      name: 'heroMedia',
      label: 'Hero Media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.heroType === 'contentAboveMedia' || siblingData?.heroType === 'contentLeftOfMedia',
      },
    },
    meta,
    slug,
  ],
};

export default Page;
