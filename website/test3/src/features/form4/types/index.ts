import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  text1: z.string().min(10).max(100),
  text2: z.string().min(10).max(100),
});
