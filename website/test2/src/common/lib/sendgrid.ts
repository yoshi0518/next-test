import type { SendMailType, SendMailType2 } from '@/common/types/sendgrid';
import { env } from '@/common/env';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendMail = async (data: SendMailType) => await sgMail.send(data);

export const sendMail2 = async (data: SendMailType2) => {
  return await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(data),
  });
};
