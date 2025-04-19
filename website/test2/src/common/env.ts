import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z
    .string()
    .default('true')
    .transform((value) => !!value),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
