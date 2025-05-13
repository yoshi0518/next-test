'use server';

import type { NewsType } from '@/features/news/types';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import { env } from '@/common/env';
import { microcms } from '@/common/lib/microcms';

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const data = await microcms.getList<NewsType>({
    endpoint: 'news',
    queries,
  });

  if (env.DEBUG) {
    console.log('=== getNewsList ===');
    console.log({ data });
  }

  return data;
};

export const getNewsIds = async () => {
  const data = await microcms.getAllContentIds({ endpoint: 'news' });

  if (env.DEBUG) {
    console.log('=== getNewsIds ===');
    console.log({ data });
  }

  return data;
};

export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const data = await microcms.getListDetail<NewsType>({
    endpoint: 'news',
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  if (env.DEBUG) {
    console.log('=== getNewsDetail ===');
    console.log({ data });
  }

  return data;
};
