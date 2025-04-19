'use server';

import type { taskType } from '@/features/task/types';
import { supabase } from '@/common/lib/supabase';

export const getTaskAllAction = async () => await supabase.schema('public').from('t_task').select('*');

export const getTaskAction = async (id: number) =>
  await supabase.schema('public').from('t_task').select('*').eq('id', id);

export const createTaskAction = async (data: Omit<taskType, 'id'>) =>
  await supabase.schema('public').from('t_task').insert(data);

export const updateTaskAction = async (id: number, data: Omit<taskType, 'id'>) =>
  await supabase.schema('public').from('t_task').update(data).eq('id', id);

export const deleteTaskAction = async (id: number) =>
  await supabase.schema('public').from('t_task').delete().eq('id', id);
