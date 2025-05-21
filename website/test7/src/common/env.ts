import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z.string().transform((value) => !!value),
  NEON_DATABASE_URL: z.string(),
  NEON_SCHEMA: z.string(),
  SENDGRID_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  NEON_SCHEMA: process.env.NEON_SCHEMA,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
