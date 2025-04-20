import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  checkbox1: z.string().default('off'),
  checkbox2: z.array(z.string()).refine((value) => value.some((item) => item), { message: '1つ以上選択してください' }),
});
