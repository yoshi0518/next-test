import { z } from '@/common/lib/zod';

export const formSchema = z.object({
  entryClass: z.enum(['0', '1', '2']),
  name: z.string().min(1).max(100),
  zipcode: z.optional(
    z
      .string()
      .regex(/^\d{3}-\d{4}$|^\d{7}$/, { message: '郵便番号の書式に誤りがあります' })
      .transform((value) => (!!value ? value.replaceAll('-', '') : '')),
  ),
  address: z.optional(z.string().max(100)),
  tel: z.optional(
    z
      .string()
      .regex(/^\d{2,5}-\d{1,4}-\d{3,4}$|^\d{10,11}$/, { message: '電話番号の書式に誤りがあります' })
      .transform((value) => value.replaceAll('-', '')),
  ),
  email: z.string().email().max(100),
  serviceType: z.enum(['0', '1', '2']),
  propertyType: z.enum(['0', '1', '2', '3']),
  area: z.optional(z.string().max(100)),
  contact: z.string().max(500),
});
