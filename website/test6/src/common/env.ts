import { z } from 'zod';

const envSchema = z.object({
  ENV: z.enum(['prod', 'dev']).default('dev'),
  DEBUG: z.string().default('true'),
  BASE_URL_APP: z.string().default('http://localhost:3000'),
  BASE_URL_API: z.string().default('http://localhost:8000'),
  AUTH_SECRET: z.string().default(''),
});

const parsedEnv = envSchema.safeParse({
  ENV: process.env.ENV,
  DEBUG: process.env.DEBUG,
  BASE_URL_APP: process.env.BASE_URL_APP,
  BASE_URL_API: process.env.BASE_URL_API,
  AUTH_SECRET: process.env.AUTH_SECRET,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
