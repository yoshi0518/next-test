'use server';

import { redirect } from 'next/navigation';
import { wait } from '@/common/lib/utils';
import { formSchema } from '@/features/form9/types';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { persons } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ persons });

  // DB処理
  await wait(2000);

  // 送信完了ページへ遷移
  redirect('/form9/complete');
};
