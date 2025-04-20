'use client';

import { useActionState, useState } from 'react';
import { Button, Checkbox, Label } from '@/common/components/ui';
import { getCheckboxProps } from '@/common/lib/shadcn';
import { cn } from '@/common/lib/utils';
import { action } from '@/features/form6/action';
import { formSchema } from '@/features/form6/types';
import { getFormProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

const items = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'orange', label: 'オレンジ' },
];

export const Form6Input: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      checkbox1: 'on',
      checkbox2: ['banana'],
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
      <h2 className="mb-2 text-xl font-bold">Checkbox</h2>
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn('w-[460px] space-y-2', isConfirm && 'hidden')}>
          <div className="space-y-1.5">
            <Label htmlFor={fields.checkbox1.id}>Checkbox</Label>
            <div className="flex items-center">
              <Label className="text-sm">
                <Checkbox
                  {...getCheckboxProps(fields.checkbox1)}
                  className="mr-1"
                  defaultChecked={fields.checkbox1.value === 'on' || fields.checkbox1.initialValue === 'on'}
                />
                Check
              </Label>
            </div>

            <p
              id={fields.checkbox1.errorId}
              className="text-sm text-red-500"
            >
              {fields.checkbox1.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.checkbox2.id}>Checkbox Group</Label>
            {items.map((item) => (
              <div
                key={item.value}
                className="flex items-center"
              >
                <Label className="text-sm">
                  <Checkbox
                    {...getCheckboxProps(fields.checkbox2)}
                    key={item.value}
                    value={item.value}
                    onCheckedChange={() => form.validate()}
                    defaultChecked={
                      Array.isArray(fields.checkbox2.value)
                        ? fields.checkbox2.value.includes(item.value)
                        : Array.isArray(fields.checkbox2.initialValue)
                          ? fields.checkbox2.initialValue.includes(item.value)
                          : false
                    }
                    className="mr-1"
                  />
                  {item.label}
                </Label>
              </div>
            ))}
            <p
              id={fields.checkbox2.errorId}
              className="text-sm text-red-500"
            >
              {fields.checkbox2.errors}
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
            <Label className="text-sm font-semibold">Checkbox</Label>
            <p>{fields.checkbox1.value ? 'on' : 'off'}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Checkbox Group</Label>
            <p>{JSON.stringify(fields.checkbox2.value)}</p>
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
