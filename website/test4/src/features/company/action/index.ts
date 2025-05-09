'use server';

import type { NassetObjectContentType } from '@/features/company/types';
import { microcms } from '@/common/lib/microcms';

export const getNasset = async () => {
  const data = await microcms.getObject<NassetObjectContentType>({
    endpoint: 'nasset',
  });

  console.log('=== microCMS nasset ===');
  console.log({ data });

  return data;
};
