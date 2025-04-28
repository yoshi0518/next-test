'use client';

import { useActionState, useState } from 'react';
import {
  Badge,
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/common/components/ui';
import { getRadioGroupProps, getSelectProps, getSelectTriggerProps } from '@/common/lib/shadcn';
import { cn } from '@/common/lib/utils';
import { action, getAddressByZipcodeAction } from '@/features/contact/action';
import { entryClassList, propertyTypeList, serviceTypeList } from '@/features/contact/constant';
import { formSchema } from '@/features/contact/types';
import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'sonner';

export const ContactInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      entryClassNo: '',
      entryClassName: '',
      name: '',
      zipcode: '',
      address: '',
      tel: '',
      email: '',
      serviceTypeNo: '0',
      serviceTypeName: '購入',
      propertyTypeNo: '0',
      propertyTypeName: '土地',
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

  // 郵便番号から住所を取得
  const getAddressByZipcode = async (zipcode: string) => {
    form.update({ name: fields.address.name, value: '' });

    const response = await getAddressByZipcodeAction(zipcode);
    if (!response.status) {
      toast(response.message, {
        style: { background: '#dc2626', color: '#fff' },
      });
      return;
    }

    form.update({
      name: fields.address.name,
      value: `${response.data!.prefecture}${response.data!.city}${response.data!.suburb}`,
    });
  };

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">問合せフォーム</h2>
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn('w-[460px] space-y-4', isConfirm && 'hidden')}>
          <div className="space-y-1.5">
            <Label htmlFor={fields.entryClassNo.id}>
              <span>お問い合わせ項目</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>

            <Select
              {...getSelectProps(fields.entryClassNo)}
              key={fields.entryClassNo.key}
              defaultValue={fields.entryClassNo.value ?? fields.entryClassNo.initialValue}
              onValueChange={(value) => {
                form.update({ name: fields.entryClassNo.name, value });
                form.update({
                  name: fields.entryClassName.name,
                  value: entryClassList.find((entryClass) => entryClass.id === fields.entryClassNo.value)?.value,
                });
              }}
            >
              <SelectTrigger
                {...getSelectTriggerProps(fields.entryClassNo)}
                key="entry-class-trigger"
                className="w-[240px]"
              >
                <SelectValue placeholder="-- 選択してください --" />
              </SelectTrigger>
              <SelectContent
                key="entry-class-content"
                className="w-[240px]"
              >
                {entryClassList.map((entryClass) => (
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
              id={fields.entryClassNo.errorId}
              className="text-sm text-red-500"
            >
              {fields.entryClassNo.errors}
            </p>

            <Input
              {...getInputProps(fields.entryClassName, { type: 'text' })}
              key={fields.entryClassName.key}
              defaultValue={(lastResult?.initialValue?.entryClassName as string) ?? form.initialValue?.entryClassName}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={fields.name.id}>
              <span>氏名</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>
            <Input
              {...getInputProps(fields.name, { type: 'text' })}
              key={fields.name.key}
              placeholder="鈴木 太郎"
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
                placeholder="213-0011"
                defaultValue={(lastResult?.initialValue?.zipcode as string) ?? form.initialValue?.zipcode}
              />
              <Button
                variant="outline"
                onClick={async () => {
                  form.validate();
                  if (!!fields.zipcode.errors) return;

                  await getAddressByZipcode(fields.zipcode.value!);
                }}
                disabled={!!fields.zipcode.errors || !fields.zipcode.value}
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
              placeholder="神奈川県川崎市高津区久本1-1-3"
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
              placeholder="080-123-4567"
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
            <Label htmlFor={fields.email.id}>
              <span>メールアドレス</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>
            <Input
              {...getInputProps(fields.email, { type: 'email' })}
              key={fields.email.key}
              placeholder="contact@n-asset.com"
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
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '1' ? 'hidden' : '',
            )}
          >
            <Label htmlFor={fields.serviceTypeNo.id}>
              <span>ご希望</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>
            <RadioGroup
              {...getRadioGroupProps(fields.serviceTypeNo)}
              key={fields.serviceTypeNo.key}
              defaultValue={fields.serviceTypeNo.value ?? fields.serviceTypeNo.initialValue}
              className="flex items-center gap-6"
              onValueChange={(value) => {
                form.update({ name: fields.serviceTypeNo.name, value });
                form.update({
                  name: fields.serviceTypeName.name,
                  value: serviceTypeList.find((serviceType) => serviceType.id === fields.serviceTypeNo.value)?.value,
                });
              }}
            >
              {serviceTypeList.map((serviceType) => (
                <div
                  key={serviceType.value}
                  className="flex items-center"
                >
                  <Label className="text-sm">
                    <RadioGroupItem
                      key={serviceType.id}
                      value={serviceType.id}
                      className="mr-1"
                    />
                    {serviceType.value}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <p
              id={fields.serviceTypeNo.errorId}
              className="text-sm text-red-500"
            >
              {fields.serviceTypeNo.errors}
            </p>

            <Input
              {...getInputProps(fields.serviceTypeName, { type: 'text' })}
              key={fields.serviceTypeName.key}
              defaultValue={(lastResult?.initialValue?.serviceTypeName as string) ?? form.initialValue?.serviceTypeName}
            />
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '1' ? 'hidden' : '',
            )}
          >
            <Label htmlFor={fields.propertyTypeNo.id}>
              <span>物件種別</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>
            <RadioGroup
              {...getRadioGroupProps(fields.propertyTypeNo)}
              key={fields.propertyTypeNo.key}
              defaultValue={fields.propertyTypeNo.value ?? fields.propertyTypeNo.initialValue}
              className="flex items-center gap-6"
              onValueChange={(value) => {
                form.update({ name: fields.propertyTypeNo.name, value });
                form.update({
                  name: fields.propertyTypeName.name,
                  value: propertyTypeList.find((propertyType) => propertyType.id === fields.propertyTypeNo.value)
                    ?.value,
                });
              }}
            >
              {propertyTypeList.map((propertyType) => (
                <div
                  key={propertyType.value}
                  className="flex items-center"
                >
                  <Label className="text-sm">
                    <RadioGroupItem
                      key={propertyType.id}
                      value={propertyType.id}
                      className="mr-1"
                    />
                    {propertyType.value}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <p
              id={fields.propertyTypeNo.errorId}
              className="text-sm text-red-500"
            >
              {fields.propertyTypeNo.errors}
            </p>

            <Input
              {...getInputProps(fields.propertyTypeName, { type: 'text' })}
              key={fields.propertyTypeName.key}
              defaultValue={
                (lastResult?.initialValue?.propertyTypeName as string) ?? form.initialValue?.propertyTypeName
              }
            />
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '0' ? 'hidden' : '',
            )}
          >
            <Label htmlFor={fields.area.id}>希望エリア</Label>
            <Input
              {...getInputProps(fields.area, { type: 'text' })}
              key={fields.area.key}
              placeholder="溝の口近辺"
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
            <Label htmlFor={fields.contact.id}>
              <span>お問い合わせ内容</span>
              <Badge className="bg-blue-600">必須</Badge>
            </Label>
            <Textarea
              {...getTextareaProps(fields.contact)}
              key={fields.contact.key}
              placeholder="お問い合わせ内容をご記入ください"
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
            <p>{fields.entryClassName.value}</p>
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
            <p>{fields.tel.value ?? '　'}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">メールアドレス(email)</Label>
            <p>{fields.email.value}</p>
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '1' ? 'hidden' : '',
            )}
          >
            <Label className="text-sm font-semibold">ご希望</Label>
            <p>{fields.serviceTypeName.value}</p>
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '1' ? 'hidden' : '',
            )}
          >
            <Label className="text-sm font-semibold">物件種別</Label>
            <p>{fields.propertyTypeName.value}</p>
          </div>

          <div
            className={cn(
              'space-y-1.5',
              (fields.entryClassNo.value ?? fields.entryClassNo.initialValue) !== '0' ? 'hidden' : '',
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
