export type SendMailType = {
  subject: string;
  from: {
    name: string;
    email: string;
  };
  to: string;
  bcc: string;
  replyTo?: string;
  text: string;
};
