type MailAddressType = {
  name?: string;
  email: string;
};

export type SendMailType = {
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
