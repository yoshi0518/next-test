import type { contactTable } from '@/db/schema';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { z } from '@/common/lib/zod';
import { entryClassList, propertyTypeList, serviceTypeList } from '@/features/contact/constant';

export const formSchema = z.object({
  entryClassNo: z
    .enum(entryClassList.map((item) => item.id) as [string, ...string[]])
    .transform((value) => Number(value)),
  entryClassName: z.string(),
  name: z.string().max(100),
  zipCode: z.optional(
    z
      .string()
      .regex(/^\d{3}-\d{4}$|^\d{7}$/, { message: '郵便番号の書式に誤りがあります' })
      .transform((value) => value.replaceAll('-', '')),
  ),
  address: z.optional(z.string().max(100)),
  tel: z.optional(
    z
      .string()
      .regex(/^\d{2,5}-\d{1,4}-\d{3,4}$|^\d{10,11}$/, { message: '電話番号の書式に誤りがあります' })
      .transform((value) => value.replaceAll('-', '')),
  ),
  email: z.string().email().max(100),
  serviceTypeNo: z.enum(Object.keys(serviceTypeList) as [string, ...string[]]).transform((value) => Number(value)),
  serviceTypeName: z.string(),
  propertyTypeNo: z
    .enum(propertyTypeList.map((item) => item.id) as [string, ...string[]])
    .transform((value) => Number(value)),
  propertyTypeName: z.string(),
  area: z.optional(z.string().max(100)),
  contact: z.string().max(500),
});

export type ContactSelectType = InferSelectModel<typeof contactTable>;
export type ContactInsertType = InferInsertModel<typeof contactTable>;
