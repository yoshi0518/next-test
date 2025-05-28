'use server';

import type { ContactInsertType } from '@/features/contact/types';
import { redirect } from 'next/navigation';
import { env } from '@/common/env';
import { Logger } from '@/common/lib/logger';
import { getCurrentDt } from '@/common/lib/utils';
import { contactTable } from '@/db/schema';
import { sendMail } from '@/features/contact/lib/sendgrid';
import { formSchema } from '@/features/contact/types';
import { parseWithZod } from '@conform-to/zod';
import { drizzle } from 'drizzle-orm/neon-http';

const logger = new Logger('info', false);

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const {
    entryClassNo,
    entryClassName,
    name,
    zipCode,
    address,
    tel,
    email,
    serviceTypeNo,
    serviceTypeName,
    propertyTypeNo,
    propertyTypeName,
    area,
    contact,
  } = submission.value;
  // console.log('=== Submission Data ===');
  // console.log({
  //   entryClassNo,
  //   entryClassName,
  //   name,
  //   zipCode,
  //   address,
  //   tel,
  //   email,
  //   serviceTypeNo,
  //   serviceTypeName,
  //   propertyTypeNo,
  //   propertyTypeName,
  //   area,
  //   contact,
  // });

  try {
    // === Supabaseデータ追加 Start ===
    const responseSupabase = await createContactAction({
      entryClass: entryClassNo,
      name,
      zipCode: zipCode ?? null,
      address: address ?? null,
      tel: tel ?? null,
      email,
      serviceType: entryClassNo === 1 ? serviceTypeNo : null,
      propertyType: entryClassNo === 1 ? propertyTypeNo : null,
      area: entryClassNo === 0 ? (area ?? null) : null,
      contact,
      createdAt: getCurrentDt(),
    });

    if (responseSupabase.length === 0) {
      return submission.reply({
        formErrors: ['登録失敗'],
      });
    }
    // === Supabaseデータ追加 End ===

    // === Sendgridメール送信 Start ===
    const dynamicTemplateData = {
      entry_class: entryClassName,
      name,
      zipcode: zipCode ?? '　',
      address: address ?? '　',
      tel: tel ?? '　',
      email,
      service_type: serviceTypeName,
      property_type: propertyTypeName,
      area: area ?? '　',
      contact: contact.split('\r\n'),
    };
    const data = {
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
          to: [{ email: 'oshirase@n-asset.com' }],
          bcc: [{ email: 'info@n-asset.com' }],
          dynamic_template_data: { ...dynamicTemplateData, send_type: 'admin' },
        },
      ],
      reply_to: {
        name: '株式会社エヌアセット',
        email: 'oshirase@n-asset.com',
      },
    };
    const responseSendMail = await sendMail(data);

    logger.info('SendMail(data)', { func: 'action', data });
    logger.info('SendMail(response)', { func: 'action', responseSendMail });

    if (!responseSendMail.ok)
      return submission.reply({
        formErrors: ['メール送信に失敗しました'],
      });

    // === Sendgridメール送信 End ===
  } catch (error) {
    logger.error('Error', { func: 'action', error });
  }

  // 送信完了ページへ遷移
  redirect('/contact/complete');
};

export const getAddressAction = async (zipcode: string) => {
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

export const createContactAction = async (data: ContactInsertType) => {
  const db = drizzle(env.NEON_DATABASE_URL);
  return await db.insert(contactTable).values(data).returning({ id: contactTable.id });
};
