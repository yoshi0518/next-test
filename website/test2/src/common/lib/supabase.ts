import type { Database } from '@/common/types/supabase';
import { env } from '@/common/env';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export const currentDt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
