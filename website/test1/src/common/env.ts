import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z
    .string()
    .default('true')
    .transform((value) => !!value),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
