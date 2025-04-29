'use client';

import { useActionState, useState, useTransition } from 'react';
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Switch,
  toast,
} from '@/common/components/ui';
import { getSwitchProps } from '@/common/lib/shadcn';
import { createTodoAction } from '@/features/todo/action';
import { createTodoSchema } from '@/features/todo/types';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaPlus, FaSpinner } from 'react-icons/fa6';

export const TodoCreate: React.FC = () => {
  const [lastResult, dispatch] = useActionState(createTodoAction, null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      name: '',
      closingDate: '',
      isDone: false,
    },
    // action実行後の値
    lastResult,
    // バリデーションスキーマ
    onValidate: ({ formData }) => parseWithZod(formData, { schema: createTodoSchema }),
    // 初回のバリデーション実行タイミング
    shouldValidate: 'onBlur',
    // 2回目以降のバリデーション実行タイミング
    shouldRevalidate: 'onInput',
    // Zodスキーマをもとに各フィールドのバリデーション属性を自動設定
    constraint: getZodConstraint(createTodoSchema),
    // Submit処理
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      startTransition(() => {
        dispatch(formData);
        setIsOpen(false);
        toast.success('追加完了', {
          position: 'top-right',
          style: {
            background: 'oklch(76.9% 0.188 70.08)',
            color: '#fff',
          },
        });
      });
    },
  });
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-amber-500 hover:bg-amber-400"
      >
        <FaPlus />
        追加
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetContent>
          <SheetHeader className="bg-gray-200">
            <SheetTitle>タスク追加</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <form
            {...getFormProps(form)}
            className="space-y-6 px-4"
          >
            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>タスク名</Label>
              <Input
                {...getInputProps(fields.name, { type: 'text' })}
                key={fields.name.key}
                defaultValue={(lastResult?.initialValue?.name as string) ?? form.initialValue?.name}
              />
              <p
                id={fields.name.errorId}
                className="text-sm text-red-500"
              >
                {fields.name.errors}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.closingDate.id}>締切日</Label>
              <Input
                {...getInputProps(fields.closingDate, { type: 'date' })}
                key={fields.closingDate.key}
                defaultValue={(lastResult?.initialValue?.closingDate as string) ?? form.initialValue?.closingDate}
                className="w-min"
              />
              <p
                id={fields.closingDate.errorId}
                className="text-sm text-red-500"
              >
                {fields.closingDate.errors}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.isDone.id}>完了</Label>
              <Switch
                {...getSwitchProps(fields.isDone)}
                key={fields.isDone.id}
                className="data-[state=checked]:bg-amber-500"
              />
              <p
                id={fields.isDone.errorId}
                className="text-sm text-red-500"
              >
                {fields.isDone.errors}
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!form.valid || isPending}
                className="w-[120px] bg-amber-500 hover:bg-amber-400"
              >
                {isPending && <FaSpinner className="animate-spin" />}
                追加
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};
