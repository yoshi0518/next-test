import type { Database } from '@/features/todo/types/supabase';

export type TaskReadType = Database['public']['Tables']['t_task']['Row'];
export type TaskCreateType = Database['public']['Tables']['t_task']['Insert'];
export type TaskUpdateType = Database['public']['Tables']['t_task']['Update'];
