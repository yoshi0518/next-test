import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z.string().transform((value) => !!value),
  SUPABASE_DATABASE_URL: z.string(),
  SUPABASE_SCHEMA: z.string(),
  SENDGRID_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL,
  SUPABASE_SCHEMA: process.env.SUPABASE_SCHEMA,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
