import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  persons: z.array(
    z.object({
      no: z.number(),
      name: z.string().min(1).max(100),
      gender: z.enum(['male', 'female']),
    }),
  ),
});
