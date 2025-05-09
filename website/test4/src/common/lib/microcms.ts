import { env } from '@/common/env';
import { createClient } from 'microcms-js-sdk';

export const microcms = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});
