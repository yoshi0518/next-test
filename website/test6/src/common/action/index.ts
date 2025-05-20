'use server';

import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/common/auth';
import { env } from '@/common/env';
import { AuthError } from 'next-auth';

export type LoginFormData = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  value?: {
    name?: string;
    email?: string;
    password?: string;
  };
  message?: string;
};

export const loginAction = async (_state: LoginFormData, formData: FormData) => {
  try {
    await signIn('credentials', formData);
    return { message: 'success' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.error('Signin error:', error);
          return { message: 'ユーザーIDまたはパスワードが間違っています' };
      }
    }

    // リダイレクトエラーの場合はリダイレクト
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      redirect('/login');
    }
    return {
      message: 'An unexpected error occurred during signin',
    };
  }
};

export const logoutAction = async () => await signOut({ redirectTo: '/login' });

export const fetchLoginAction = async ({ id, password }: { id: string; password: string }) => {
  const response = await fetch(`${env.BASE_URL_API}/auth/v1/login/`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${id}&password=${password}`,
  });

  return response;
};

export const fetchUpdateAccessTokenAction = async (refresh_token: string) => {
  const response = await fetch(`${env.BASE_URL_API}/auth/v1/login/${refresh_token}/`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
    },
  });

  return response;
};
