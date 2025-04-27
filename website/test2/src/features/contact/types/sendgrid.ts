type MailAddressType = {
  name?: string;
  email: string;
};

export type SendMailType = {
  template_id: string;
  from: MailAddressType;
  personalizations: {
    to: MailAddressType[];
    bcc: MailAddressType[];
    dynamic_template_data: {
      send_type: string;
      entry_class: string;
      name: string;
      zipcode: string;
      address: string;
      tel: string;
      email: string;
      service_type: string;
      property_type: string;
      area: string;
      contact: string[];
    };
  }[];
  reply_to?: MailAddressType;
};
