'use server';

import { redirect } from 'next/navigation';
import { wait } from '@/common/lib/utils';
import { formSchema } from '@/features/form10/types';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { zipcode, prefecture, city, suburb } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ zipcode, prefecture, city, suburb });

  // DB処理
  await wait(2000);

  // 送信完了ページへ遷移
  redirect('/form10/complete');
};

export const getAddressByZipcodeAction = async (zipcode: string) => {
  const response = await fetch(`https://postcode.teraren.com/postcodes/${zipcode.replaceAll('-', '')}.json`);

  if (!response.ok) return { status: false, message: '住所取得に失敗しました' };

  return {
    status: true,
    data: (await response.json()) as { new: string; prefecture: string; city: string; suburb: string },
  };
};
