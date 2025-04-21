import type { Database } from '@/common/types/supabase';

export type taskType = Database['public']['Tables']['t_task']['Row'];
