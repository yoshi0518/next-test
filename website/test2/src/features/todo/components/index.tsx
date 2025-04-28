import { readTaskAllAction } from '@/features/todo/action';

import { TodoList } from './list';

export const TodoContainer: React.FC = async () => {
  const { data, error } = await readTaskAllAction();
  console.log({ data, error });

  return <TodoList data={data ?? []} />;
};
