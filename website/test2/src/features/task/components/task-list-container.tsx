import { getTaskAllAction } from '@/features/task/action';
import { TaskListPresentation } from '@/features/task/components/task-list-presentation';

export const TaskListContainer: React.FC = async () => {
  const { data, error } = await getTaskAllAction();
  console.log({ data, error });

  if (error) throw new Error(error.message);

  return (
    <>
      <TaskListPresentation
        data={data ?? []}
        className="mb-6"
      />

      <p>タスク追加</p>
    </>
  );
};
