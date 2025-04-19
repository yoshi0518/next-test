import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  privacy: z.string().min(1),
});
