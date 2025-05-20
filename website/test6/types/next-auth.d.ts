import type { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  access_token: string;
  refresh_token: string;
  token_type: string;
  id: string;
  user_id: string;
  name: string;
  name_s: string;
  email: string;
  tanto_no: number;
  pc_name: string;
  password_status_no: number;
  emailVerified: Date | null; // 利用予定はないがsession.userのtype AdapterUserに合わせるため定義
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
