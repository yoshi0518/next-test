import type { Database } from '@/features/todo/types/supabase';
import { env } from '@/common/env';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
