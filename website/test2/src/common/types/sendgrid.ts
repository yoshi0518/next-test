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

type MailAddressType = {
  name?: string;
  email: string;
};

export type SendMailType2 = {
  subject: string;
  from: MailAddressType;
  personalizations: {
    to: MailAddressType[];
    bcc: MailAddressType[];
  }[];
  reply_to?: MailAddressType;
  content: {
    type: string;
    value: string;
  }[];
};
