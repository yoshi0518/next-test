'use client';

import type { LoginFormData } from '@/common/action';
import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginAction } from '@/common/action';
import { Button, Input, Label } from '@/common/components/ui';

export const Login: React.FC = () => {
  const initialState = {
    errors: {},
    message: '',
  } satisfies LoginFormData;

  const [state, dispatch] = useActionState(loginAction, initialState);
  const expired = useSearchParams().get('expired');

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="text-sm text-red-500">{state.message}</div>
        <div className="text-sm text-red-500">{expired && 'ログイン有効期限切れです。'}</div>
        <form
          className="space-y-4"
          action={dispatch}
        >
          <div className="space-y-2">
            <Label htmlFor="id">ユーザーID</Label>
            <Input
              id="id"
              name="id"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              name="password"
              type="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">ログイン</Button>
            <Link
              href="/"
              className="text-sm text-blue-500 underline"
            >
              パスワードを忘れた方はこちら
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
