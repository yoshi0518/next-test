import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z
    .string()
    .default('true')
    .transform((value) => !!value),
  MICROCMS_SERVICE_DOMAIN: z.string(),
  MICROCMS_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
  MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
