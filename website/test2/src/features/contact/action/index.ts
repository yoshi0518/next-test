'use server';

import type { ContactCreateType } from '@/features/contact/types';
import { redirect } from 'next/navigation';
import { env } from '@/common/env';
import { sendMail } from '@/common/lib/sendgrid';
import { getCurrentDt } from '@/common/lib/utils';
import { entryClassList, propertyTypeList, serviceTypeList } from '@/features/contact/constant';
import { supabase } from '@/features/contact/lib/supabase';
import { formSchema } from '@/features/contact/types';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { entryClass, name, zipcode, address, tel, email, serviceType, propertyType, area, contact } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ entryClass, name, zipcode, address, tel, email, serviceType, propertyType, area, contact });

  try {
    // === Supabaseデータ追加 Start ===
    const responseSupabase = await createContactAction({
      entry_class: entryClass,
      name,
      zipcode: zipcode ?? null,
      address: address ?? null,
      tel: tel ?? null,
      email,
      service_type: entryClass === 1 ? serviceType : null,
      property_type: entryClass === 1 ? propertyType : null,
      area: entryClass === 0 ? (area ?? null) : null,
      contact,
      created_at: getCurrentDt(),
    });

    if (!!responseSupabase.error)
      return submission.reply({
        formErrors: [responseSupabase.error.message],
      });
    // === Supabaseデータ追加 End ===

    // === Sendgridメール送信 Start ===
    const content = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■■　ご送信内容の確認　■■
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【お問い合わせ項目】
${entryClassList.find((item) => Number(item.id) === entryClass)?.value}
【氏名】
${name}
【住所】
${zipcode ?? ''}
${address ?? ''}
【電話番号】
${tel ?? ''}
【メールアドレス】
${email}
${
  serviceType === 0
    ? `【希望エリア】
${area ?? ''}`
    : serviceType === 1
      ? `【ご希望】
${serviceTypeList.find((item) => Number(item.id) === serviceType)?.value}
【物件種別】
${propertyTypeList.find((item) => Number(item.id) === propertyType)?.value}`
      : ''
}
【お問い合わせ内容】
${contact}`;

    // 利用者宛
    const responseSendMailUser = await sendMail({
      subject: `【N-asset】【問い合わせ】${name} 様`,
      from: {
        name: '株式会社エヌアセット',
        email: 'info@n-asset.com',
      },
      personalizations: [
        {
          to: [{ email }],
          bcc: [{ email: 'info@n-asset.com' }],
        },
      ],
      reply_to: {
        name: '株式会社エヌアセット',
        email: env.SENDGRID_TO,
      },
      content: [
        {
          type: 'text/plain',
          value: `※このメールは自動送信されていますので返信はご遠慮ください。

${name} 様
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

この度はお問い合わせいただきまして、ありがとうございます。
改めて担当者よりご連絡をさせていただきます。

${content}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※このメールにお心当たりのない方は、大変お手数ですが、
　下記連絡先までご連絡ください。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社エヌアセット（N-ASSET）
〒213-0011
神奈川県川崎市高津区久本1-1-3
TEL：044-873-7188
FAX：044-877-2879
営業時間：10:00～18:00（毎週水曜日定休）
アクセス：東急田園都市線 溝の口駅から徒歩1分
URL：https://www.n-asset.com/
MAIL：${env.SENDGRID_TO}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        },
      ],
    });

    console.log('=== responseSendMailUser ===');
    console.log(responseSendMailUser);
    console.log('-----');
    console.log(await responseSendMailUser.json());

    if (!responseSendMailUser.ok)
      return submission.reply({
        formErrors: ['メール送信に失敗しました'],
      });

    // 管理者宛
    const responseSendMailAdmin = await sendMail({
      subject: `【自社HP】【問い合わせ】${name} 様`,
      from: {
        name: '株式会社エヌアセット',
        email: 'info@n-asset.com',
      },
      personalizations: [
        {
          to: [{ email: env.SENDGRID_TO }],
          bcc: [{ email: 'info@n-asset.com' }],
        },
      ],
      reply_to: {
        name: '株式会社エヌアセット',
        email: env.SENDGRID_TO,
      },
      content: [
        {
          type: 'text/plain',
          value: `${name} 様より下記のお問い合わせを受け付けました。
担当者は対応をお願いします。

${content}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社エヌアセット（N-ASSET）
〒213-0011
神奈川県川崎市高津区久本1-1-3
TEL：044-873-7188
FAX：044-877-2879
営業時間：10:00～18:00（毎週水曜日定休）
アクセス：東急田園都市線 溝の口駅から徒歩1分
URL：https://www.n-asset.com/
MAIL：${env.SENDGRID_TO}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        },
      ],
    });

    console.log('=== responseSendMailAdmin ===');
    console.log(responseSendMailAdmin);
    console.log('-----');
    console.log(await responseSendMailAdmin.json());

    if (!responseSendMailAdmin.ok)
      return submission.reply({
        formErrors: ['メール送信に失敗しました'],
      });

    // === Sendgridメール送信 End ===

    // 送信完了ページへ遷移
    redirect('/contact/complete');
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
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
