'use client';

import type { TodoReadType } from '@/features/todo/types';
import { useTransition } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from '@/common/components/ui';
import { updateTodoListAction } from '@/features/todo/action';
import { TodoCreate } from '@/features/todo/components/create';
import { TodoDelete } from '@/features/todo/components/delete';
import { TodoUpdate } from '@/features/todo/components/update';
import { format } from 'date-fns';
import { FaArrowsRotate } from 'react-icons/fa6';

export const TodoList: React.FC<{ data: TodoReadType[] }> = ({ data }) => {
  const [isPending, startTransition] = useTransition();

  const updateTodoList = async () => {
    startTransition(async () => {
      await updateTodoListAction();
    });
    toast.success('更新完了', {
      position: 'top-right',
      style: {
        background: 'oklch(62.7% 0.194 149.214)',
        color: '#fff',
      },
    });
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Todo</h2>
          <Button
            onClick={updateTodoList}
            disabled={isPending}
            className="bg-green-600 hover:bg-green-500"
          >
            <FaArrowsRotate className={isPending ? 'animate-spin' : ''} />
            更新
          </Button>
        </div>
        <TodoCreate />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">操作</TableHead>
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>タスク名</TableHead>
            <TableHead className="w-[100px] text-center">状況</TableHead>
            <TableHead className="w-[140px] text-center">締切日</TableHead>
            <TableHead className="w-[140px] text-center">作成日時</TableHead>
            <TableHead className="w-[140px] text-center">更新日時</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="flex justify-center gap-0.5">
                  <TodoUpdate
                    id={d.id}
                    name={d.name ?? ''}
                    closingDate={d.closing_date ?? ''}
                    isDone={d.is_done ?? 0}
                  />
                  <TodoDelete
                    id={d.id}
                    name={d.name ?? ''}
                  />
                </TableCell>
                <TableCell className="text-center">{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell className="text-center">{d.is_done === 0 ? '未完了' : '完了'}</TableCell>
                <TableCell className="text-center">
                  {d.closing_date ? format(d.closing_date, 'yy-MM-dd') : '未選択'}
                </TableCell>
                <TableCell className="text-center">{format(d.created_at, 'yy-MM-dd HH:mm')}</TableCell>
                <TableCell className="text-center">{format(d.updated_at, 'yy-MM-dd HH:mm')}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center"
              >
                データがありません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
