'use client';

import { useActionState, useState } from 'react';
import { Button, Label, Textarea } from '@/common/components/ui';
import { cn } from '@/common/lib/utils';
import { action } from '@/features/form4/action';
import { formSchema } from '@/features/form4/types';
import { getFormProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const Form4Input: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      text1: 'あいうえお\nかきくけこ',
      text2: 'さしすせそ\nたちつてと',
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
  const [count, setCount] = useState<number>(
    (fields.text2.value ?? fields.text2.initialValue ?? '').replaceAll('\n', '').length,
  );

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Textarea</h2>
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn('w-[460px] space-y-2', isConfirm && 'hidden')}>
          <div className="space-y-1.5">
            <Label htmlFor={fields.text1.id}>基本</Label>
            <Textarea
              {...getTextareaProps(fields.text1)}
              key={fields.text1.key}
              defaultValue={(lastResult?.initialValue?.text1 as string) ?? form.initialValue?.text1}
            />
            <p
              id={fields.text1.errorId}
              className="text-sm text-red-500"
            >
              {fields.text1.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label htmlFor={fields.text2.id}>文字数カウント</Label>
              <p className="text-sm text-gray-600">{count}/100</p>
            </div>
            <Textarea
              {...getTextareaProps(fields.text2)}
              key={fields.text2.key}
              defaultValue={(lastResult?.initialValue?.text2 as string) ?? form.initialValue?.text2}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCount(e.target.value.replaceAll('\n', '').length)
              }
            />
            <p
              id={fields.text2.errorId}
              className="text-sm text-red-500"
            >
              {fields.text2.errors}
            </p>
          </div>

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

              setIsConfirm(true);
            }}
          >
            確認
          </Button>
        </div>
        {/* === Input End === */}

        {/* === Confirm Start === */}
        <div className={cn('w-[460px] space-y-2', !isConfirm && 'hidden')}>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">基本</Label>
            <p>{fields.text1.value}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">文字数カウント</Label>
            <p>{fields.text2.value}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-36 cursor-pointer"
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => setIsConfirm(false)}
            >
              修正
            </Button>

            <Button
              className="w-36 cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending && <FaSpinner className="animate-spin" />}
              送信
            </Button>
          </div>
        </div>
        {/* === Confirm End === */}
      </form>
    </>
  );
};
