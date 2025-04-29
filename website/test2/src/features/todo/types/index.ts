import type { Database } from '@/features/todo/types/supabase';
import { z } from '@/common/lib/zod';
import { format } from 'date-fns';

export type TodoReadType = Database['public']['Tables']['t_todo']['Row'];
export type TodoCreateType = Database['public']['Tables']['t_todo']['Insert'];
export type TodoUpdateType = Database['public']['Tables']['t_todo']['Update'];

export const createTodoSchema = z.object({
  name: z.string().max(255),
  closingDate: z.optional(z.date().transform((value) => format(value, 'yyyy-MM-dd'))),
  isDone: z
    .boolean()
    .default(false)
    .transform((value) => (value ? 1 : 0)),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  closingDate: z.optional(z.date().transform((value) => format(value, 'yyyy-MM-dd'))),
  isDone: z
    .boolean()
    .default(false)
    .transform((value) => (value ? 1 : 0)),
});
