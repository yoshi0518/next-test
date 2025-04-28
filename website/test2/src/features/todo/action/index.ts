'use server';

import type { TaskCreateType, TaskUpdateType } from '@/features/todo/types';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/features/todo/lib/supabase';

export const readTaskAllAction = async () => await supabase.schema('public').from('t_task').select('*');

export const readTaskAction = async (id: number) =>
  await supabase.schema('public').from('t_task').select('*').eq('id', id);

export const createTaskAction = async (data: TaskCreateType) =>
  await supabase.schema('public').from('t_task').insert(data);

export const updateTaskAction = async (id: number, data: TaskUpdateType) =>
  await supabase.schema('public').from('t_task').update(data).eq('id', id);

export const deleteTaskAction = async (id: number) =>
  await supabase.schema('public').from('t_task').delete().eq('id', id);

export const updateTaskListAction = async () => revalidatePath('/todo');
