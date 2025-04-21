'use client';

import { useActionState, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/common/components/ui';
import { getSelectProps, getSelectTriggerProps } from '@/common/lib/shadcn';
import { cn } from '@/common/lib/utils';
import { action } from '@/features/contact/action';
import { config } from '@/features/contact/constant';
import { formSchema } from '@/features/contact/types';
import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const ContactInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      entryClass: '',
      name: '',
      zipcode: '',
      address: '',
      tel: '',
      email: '',
      serviceType: '0',
      propertyType: '0',
      area: '',
      contact: '',
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
      <h2 className="mb-2 text-xl font-bold">問合せフォーム</h2>
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn('w-[460px] space-y-2', isConfirm && 'hidden')}>
          <div className="space-y-1.5">
            <Label htmlFor={fields.entryClass.id}>お問い合わせ項目</Label>

            <Select
              {...getSelectProps(fields.entryClass)}
              key={fields.entryClass.key}
              defaultValue={fields.entryClass.value ?? fields.entryClass.initialValue}
              onValueChange={(value) => form.update({ name: fields.entryClass.name, value })}
            >
              <SelectTrigger
                {...getSelectTriggerProps(fields.entryClass)}
                key="entry-class-trigger"
                className="w-[240px]"
              >
                <SelectValue placeholder="-- 選択してください --" />
              </SelectTrigger>
              <SelectContent
                key="entry-class-content"
                className="w-[240px]"
              >
                {config.entryClassList.map((entryClass) => (
                  <SelectItem
                    value={entryClass.id}
                    key={entryClass.id}
                  >
                    {entryClass.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p
              id={fields.entryClass.errorId}
              className="text-sm text-red-500"
            >
              {fields.entryClass.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.name.id}>氏名</Label>
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

          <div className="space-y-1.5">
            <Label htmlFor={fields.zipcode.id}>郵便番号</Label>
            <div className="flex gap-2">
              <Input
                {...getInputProps(fields.zipcode, { type: 'text' })}
                key={fields.zipcode.key}
                defaultValue={(lastResult?.initialValue?.zipcode as string) ?? form.initialValue?.zipcode}
              />
              <Button
                variant="outline"
                onClick={() => {
                  form.validate();
                  if (!!fields.zipcode.errors) return;

                  alert('住所取得');
                }}
                disabled={!!fields.zipcode.errors || !fields.zipcode.value} // 郵便番号
              >
                住所取得
              </Button>
            </div>
            <p
              id={fields.zipcode.errorId}
              className="text-sm text-red-500"
            >
              {fields.zipcode.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.address.id}>住所</Label>
            <Input
              {...getInputProps(fields.address, { type: 'text' })}
              key={fields.address.key}
              defaultValue={(lastResult?.initialValue?.address as string) ?? form.initialValue?.address}
            />
            <p
              id={fields.address.errorId}
              className="text-sm text-red-500"
            >
              {fields.address.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.tel.id}>電話番号</Label>
            <Input
              {...getInputProps(fields.tel, { type: 'tel' })}
              key={fields.tel.key}
              defaultValue={(lastResult?.initialValue?.tel as string) ?? form.initialValue?.tel}
            />
            <p
              id={fields.tel.errorId}
              className="text-sm text-red-500"
            >
              {fields.tel.errors}
            </p>
          </div>

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

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClass.value ?? fields.entryClass.initialValue) !== '0' ? 'hidden' : '',
            )}
          >
            <Label htmlFor={fields.area.id}>希望エリア</Label>
            <Input
              {...getInputProps(fields.area, { type: 'text' })}
              key={fields.area.key}
              defaultValue={(lastResult?.initialValue?.area as string) ?? form.initialValue?.area}
            />
            <p
              id={fields.area.errorId}
              className="text-sm text-red-500"
            >
              {fields.area.errors}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.contact.id}>お問い合わせ内容</Label>
            <Textarea
              {...getTextareaProps(fields.contact)}
              key={fields.contact.key}
              defaultValue={(lastResult?.initialValue?.contact as string) ?? form.initialValue?.contact}
            />
            <p
              id={fields.contact.errorId}
              className="text-sm text-red-500"
            >
              {fields.contact.errors}
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
            <Label className="text-sm font-semibold">お問い合わせ項目</Label>
            <p>{fields.entryClass.value}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">氏名</Label>
            <p>{fields.name.value}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">郵便番号</Label>
            <p>{fields.zipcode.value ?? '　'}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">住所</Label>
            <p>{fields.address.value ?? '　'}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">電話番号</Label>
            <p>{fields.tel.value}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">メールアドレス(email)</Label>
            <p>{fields.email.value}</p>
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClass.value ?? fields.entryClass.initialValue) !== '0' ? 'hidden' : '',
            )}
          >
            <Label className="text-sm font-semibold">希望エリア</Label>
            <p>{fields.area.value ?? '　'}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">お問い合わせ内容</Label>
            <p>{fields.contact.value}</p>
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
