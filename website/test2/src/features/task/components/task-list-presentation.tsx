import type { taskType } from '@/features/task/types';

export const TaskListPresentation: React.FC<{ data: taskType[]; className?: string }> = ({ data, className }) => {
  return (
    <div className={className}>
      <h1 className="mb-4 text-3xl font-bold underline">タスク一覧</h1>
      {data && data.length > 0 ? (
        <>
          {data.map((d) => (
            <div key={d.id}>
              <p>{d.name}</p>
              <p>{d.is_done}</p>
              <p>{d.created_at}</p>
              <p>{d.updated_at}</p>
            </div>
          ))}
        </>
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
};
