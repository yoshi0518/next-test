'use client';

import { useActionState, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  Label,
} from '@/common/components/ui';
import { action } from '@/features/form2/action';
import { formSchema } from '@/features/form2/types';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const Form2Input: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isAlert, setIsAlert] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      email: 'test@example.com',
      password: 'password',
      privacy: 'privacy data',
    },
    // action実行後の値
    lastResult,
    // バリデーションスキーマ
    onValidate: ({ formData }) => parseWithZod(formData, { schema: formSchema }),
    // 初回のバリデーション実行タイミング
    shouldValidate: 'onBlur',
    // 2回目以降のバリデーション実行タイミング
    shouldRevalidate: 'onInput',
    // Zodスキーマをもとに各フィールドのバリデーション属性を自動設定
    constraint: getZodConstraint(formSchema),
  });

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">確認ダイアログあり</h2>
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className="w-[460px] space-y-2">
          <div className="space-y-1.5">
            <Label htmlFor={fields.email.id}>メールアドレス</Label>
            <Input
              {...getInputProps(fields.email, { type: 'email' })}
              key={fields.email.key}
              defaultValue={(lastResult?.initialValue?.email as string) ?? form.initialValue?.email}
            />
            <p
              id={fields.email.errorId}
              className="text-sm text-red-500"
            >
              {fields.email.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.password.id}>パスワード</Label>
            <Input
              {...getInputProps(fields.password, { type: 'password' })}
              key={fields.password.key}
              defaultValue={(lastResult?.initialValue?.password as string) ?? form.initialValue?.password}
            />
            <p
              id={fields.password.errorId}
              className="text-sm text-red-500"
            >
              {fields.password.errors}
            </p>
          </div>

          <Input
            {...getInputProps(fields.privacy, { type: 'hidden' })}
            key={fields.privacy.key}
            defaultValue={(lastResult?.initialValue?.privacy as string) ?? form.initialValue?.privacy}
          />

          {form.errors?.map((error, index) => (
            <p
              className="text-sm text-red-500"
              key={index}
            >
              {error}
            </p>
          ))}

          <Button
            className="w-full cursor-pointer"
            type="button"
            disabled={!form.valid}
            onClick={() => {
              form.validate();
              if (!form.valid) return;

              setIsAlert(true);
            }}
          >
            確認
          </Button>
        </div>

        {/* === Input End === */}

        {/* === AlertDialog Start === */}
        <AlertDialog open={isAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>登録確認</AlertDialogTitle>
              <AlertDialogDescription>登録します。よろしいですか？</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                disabled={isPending}
                className="w-30"
                onClick={() => setIsAlert(false)}
              >
                修正
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                form={form.id}
                disabled={isPending}
                className="w-30"
              >
                {isPending && <FaSpinner className="animate-spin" />}
                登録
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* === AlertDialog End === */}
      </form>
    </>
  );
};
