import { defineConfig } from 'drizzle-kit';

import { env } from './src/common/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  breakpoints: true,
  dbCredentials: {
    url: env.NEON_DATABASE_URL,
  },
  migrations: {
    schema: env.NEON_SCHEMA,
  },
});
