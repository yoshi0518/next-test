import { readTodoAllAction } from '@/features/todo/action';

import { TodoList } from './list';

export const TodoContainer: React.FC = async () => {
  const { data, error } = await readTodoAllAction();
  console.log('=== データ取得 ===');
  console.log({ data, error });

  return <TodoList data={data ?? []} />;
};
