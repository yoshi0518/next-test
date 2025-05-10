import type { MicroCMSImage, MicroCMSObjectContent } from 'microcms-js-sdk';

type GroupCompanyType = {
  fieldId: string;
  name: string;
  description: string;
  image: MicroCMSImage;
  url: string;
};

export type CompanyInfoType = {
  name: string;
  post: string;
  address: string;
  tel: string;
  fax: string;
  birthday: Date;
  business_contents: string;
  capital: number;
  licence: string;
  representative: string;
  bank: string;
  employee: string;
  qualifications: string;
  group_companies: GroupCompanyType[];
} & MicroCMSObjectContent;
