'use server';

import type { CompanyInfoType } from '@/features/company/types';
import { microcms } from '@/common/lib/microcms';

export const getCompanyInfo = async () => {
  const data = await microcms.getObject<CompanyInfoType>({
    endpoint: 'nasset',
  });

  console.log('=== microCMS nasset ===');
  console.log({ data });

  return data;
};
