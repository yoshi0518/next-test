import type { SendMailType } from '@/features/contact/types/sendgrid';
import { env } from '@/common/env';

export const sendMail = async (data: SendMailType) => {
  return await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(data),
  });
};
