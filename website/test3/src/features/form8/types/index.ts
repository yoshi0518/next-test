import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  switchValue: z.boolean().default(false),
});
