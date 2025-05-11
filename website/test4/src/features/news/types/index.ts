import type { MicroCMSListContent } from 'microcms-js-sdk';

export type NewsType = {
  title: string;
  body: string;
  category: string[];
} & MicroCMSListContent;
