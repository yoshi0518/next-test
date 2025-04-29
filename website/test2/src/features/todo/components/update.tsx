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
import { updateTodoAction } from '@/features/todo/action';
import { updateTodoSchema } from '@/features/todo/types';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { format } from 'date-fns';
import { FaRegPenToSquare, FaSpinner } from 'react-icons/fa6';

export const TodoUpdate: React.FC<{ id: number; name: string; closingDate: string; isDone: number }> = ({
  id,
  name,
  closingDate,
  isDone,
}) => {
  const [lastResult, dispatch] = useActionState(updateTodoAction, null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      id,
      name,
      closingDate: closingDate ? format(new Date(closingDate), 'yyyy-MM-dd') : '',
      isDone: isDone === 0 ? false : true,
    },
    // action実行後の値
    lastResult,
    // バリデーションスキーマ
    onValidate: ({ formData }) => parseWithZod(formData, { schema: updateTodoSchema }),
    // 初回のバリデーション実行タイミング
    shouldValidate: 'onBlur',
    // 2回目以降のバリデーション実行タイミング
    shouldRevalidate: 'onInput',
    // Zodスキーマをもとに各フィールドのバリデーション属性を自動設定
    constraint: getZodConstraint(updateTodoSchema),
    // Submit処理
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      startTransition(() => {
        dispatch(formData);
        setIsOpen(false);
        toast.success('更新完了', {
          position: 'top-right',
          style: {
            background: 'oklch(54.6% 0.245 262.881)',
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
        className="bg-blue-600 hover:bg-blue-500"
      >
        <FaRegPenToSquare />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetContent>
          <SheetHeader className="bg-gray-200">
            <SheetTitle>タスク変更</SheetTitle>
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
                className="data-[state=checked]:bg-blue-500"
              />
              <p
                id={fields.isDone.errorId}
                className="text-sm text-red-500"
              >
                {fields.isDone.errors}
              </p>
            </div>

            <Input
              {...getInputProps(fields.id, { type: 'hidden' })}
              key={fields.id.key}
              defaultValue={(lastResult?.initialValue?.id as string) ?? form.initialValue?.id}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!form.valid || isPending}
                className="w-[120px] bg-blue-500 hover:bg-blue-400"
              >
                {isPending && <FaSpinner className="animate-spin" />}
                変更
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};
