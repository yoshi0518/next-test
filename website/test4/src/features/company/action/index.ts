'use server';

import type { CompanyInfoType } from '@/features/company/types';
import { env } from '@/common/env';
import { microcms } from '@/common/lib/microcms';

export const getCompanyInfo = async () => {
  const data = await microcms.getObject<CompanyInfoType>({
    endpoint: 'nasset',
  });

  if (env.DEBUG) {
    console.log('=== getCompanyInfo ===');
    console.log({ data });
  }

  return data;
};
