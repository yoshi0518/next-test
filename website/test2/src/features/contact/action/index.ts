'use server';

import type { ContactCreateType } from '@/features/contact/types';
import { redirect } from 'next/navigation';
import { env } from '@/common/env';
import { getCurrentDt } from '@/common/lib/utils';
import { propertyTypeList, serviceTypeList } from '@/features/contact/constant';
import { sendMail } from '@/features/contact/lib/sendgrid';
import { supabase } from '@/features/contact/lib/supabase';
import { formSchema } from '@/features/contact/types';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { entryClassNo, entryClassName, name, zipcode, address, tel, email, serviceType, propertyType, area, contact } =
    submission.value;
  console.log('=== Submission Data ===');
  console.log({
    entryClassNo,
    entryClassName,
    name,
    zipcode,
    address,
    tel,
    email,
    serviceType,
    propertyType,
    area,
    contact,
  });

  try {
    // === Supabaseデータ追加 Start ===
    const responseSupabase = await createContactAction({
      entry_class: entryClassNo,
      name,
      zipcode: zipcode ?? null,
      address: address ?? null,
      tel: tel ?? null,
      email,
      service_type: entryClassNo === 1 ? serviceType : null,
      property_type: entryClassNo === 1 ? propertyType : null,
      area: entryClassNo === 0 ? (area ?? null) : null,
      contact,
      created_at: getCurrentDt(),
    });

    if (!!responseSupabase.error)
      return submission.reply({
        formErrors: [responseSupabase.error.message],
      });
    // === Supabaseデータ追加 End ===

    // === Sendgridメール送信 Start ===
    const dynamicTemplateData = {
      entry_class: entryClassName,
      name,
      zipcode: zipcode ?? '　',
      address: address ?? '　',
      tel: tel ?? '　',
      email,
      service_type: serviceTypeList.find((item) => Number(item.id) === serviceType)?.value ?? '',
      property_type: propertyTypeList.find((item) => Number(item.id) === propertyType)?.value ?? '',
      area: area ?? '　',
      contact: contact.split('\n'),
    };

    const responseSendMail = await sendMail({
      template_id: 'd-8673fa79d39d4cc2b11b68ce9a186d11',
      from: {
        name: '株式会社エヌアセット',
        email: 'info@n-asset.com',
      },
      personalizations: [
        // 利用者宛
        {
          to: [{ email }],
          bcc: [{ email: 'info@n-asset.com' }],
          dynamic_template_data: { ...dynamicTemplateData, send_type: 'user' },
        },
        // 管理者宛
        {
          to: [{ email: env.SENDGRID_TO }],
          bcc: [{ email: 'info@n-asset.com' }],
          dynamic_template_data: { ...dynamicTemplateData, send_type: 'admin' },
        },
      ],
      reply_to: {
        name: '株式会社エヌアセット',
        email: env.SENDGRID_TO,
      },
    });

    if (!responseSendMail.ok)
      return submission.reply({
        formErrors: ['メール送信に失敗しました'],
      });

    // === Sendgridメール送信 End ===
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }

  // 送信完了ページへ遷移
  redirect('/contact/complete');
};

export const getAddressByZipcodeAction = async (zipcode: string) => {
  const response = await fetch(`https://postcode.teraren.com/postcodes/${zipcode.replaceAll('-', '')}.json`);

  if (!response.ok)
    return {
      status: false,
      message: '住所取得に失敗しました。お手数ですが直接入力をお願いします',
    };

  return {
    status: true,
    data: (await response.json()) as { new: string; prefecture: string; city: string; suburb: string },
  };
};

export const createContactAction = async (data: ContactCreateType) =>
  await supabase.schema('test').from('t_contact').insert(data);
