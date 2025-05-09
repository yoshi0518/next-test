import type { MicroCMSImage, MicroCMSListResponse, MicroCMSObjectContent } from 'microcms-js-sdk';

type GroupCompanyListResponseType = MicroCMSListResponse<{
  name: string;
  description: string;
  image: MicroCMSImage;
  url: string;
}>;

export type NassetObjectContentType = {
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
  group_companies: GroupCompanyListResponseType;
} & MicroCMSObjectContent;
