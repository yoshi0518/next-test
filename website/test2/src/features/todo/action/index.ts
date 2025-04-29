'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentDt } from '@/common/lib/utils';
import { supabase } from '@/features/todo/lib/supabase';
import { createTodoSchema, updateTodoSchema } from '@/features/todo/types';
import { parseWithZod } from '@conform-to/zod';

export const readTodoAllAction = async () => await supabase.schema('public').from('t_todo').select('*').order('id');

export const readTodoAction = async (id: number) =>
  await supabase.schema('public').from('t_todo').select('*').eq('id', id);

export const createTodoAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: createTodoSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { name, closingDate, isDone } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ name, closingDate, isDone });

  // Supabaseデータ追加
  const currentDt = getCurrentDt();
  const data = {
    name,
    closing_date: closingDate,
    is_done: isDone,
    created_at: currentDt,
    updated_at: currentDt,
  };
  console.log('=== Insert Data ===');
  console.log({ data });
  await supabase.schema('public').from('t_todo').insert(data);

  // データ再取得
  await updateTodoListAction();
};

export const updateTodoAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: updateTodoSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { id, name, closingDate, isDone } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ id, name, closingDate, isDone });

  // Supabaseデータ更新
  const data = {
    name,
    closing_date: closingDate,
    is_done: isDone,
    updated_at: getCurrentDt(),
  };
  console.log('=== Update Data ===');
  console.log({ id, data });
  await supabase.schema('public').from('t_todo').update(data).eq('id', id);

  // データ再取得
  await updateTodoListAction();
};

export const deleteTodoAction = async (id: number) => {
  // Supabaseデータ削除
  console.log('=== Delete Data ===');
  console.log({ id });
  await supabase.schema('public').from('t_todo').delete().eq('id', id);

  // データ再取得
  await updateTodoListAction();
};

export const updateTodoListAction = async () => revalidatePath('/todo');
