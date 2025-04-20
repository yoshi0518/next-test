import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  select: z.string(),
});
