import type { SendMailType } from '@/common/types/sendgrid';
import { env } from '@/common/env';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendMail = async (data: SendMailType) => await sgMail.send(data);
