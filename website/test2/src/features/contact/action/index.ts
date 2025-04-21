'use server';

import { redirect } from 'next/navigation';
import { wait } from '@/common/lib/utils';
import { formSchema } from '@/features/contact/types';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { entryClass, name, zipcode } = submission.value;
  // const { entryClass, name, zipcode, address, tel, email, serviceType, propertyType, area, contact } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ entryClass, name, zipcode });
  // console.log({ entryClass, name, zipcode, address, tel, email, serviceType, propertyType, area, contact });

  // DB処理
  await wait(2000);

  // 送信完了ページへ遷移
  redirect('/contact/complete');
};
