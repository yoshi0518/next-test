'use client';

import type { TaskReadType } from '@/features/todo/types';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/ui';
import { updateTaskListAction } from '@/features/todo/action';
import { format } from 'date-fns';
import { FaArrowsRotate, FaPlus, FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';

export const TodoList: React.FC<{ data: TaskReadType[] }> = ({ data }) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Todo</h2>
          <Button
            onClick={async () => {
              console.log('更新');
              await updateTaskListAction();
            }}
            className="bg-green-600 hover:bg-green-500"
          >
            <FaArrowsRotate />
            更新
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-400">
              <FaPlus />
              追加
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>タスク追加</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <div className="p-2">
              <div>
                <Input
                  type="text"
                  placeholder="タスク名"
                />
              </div>
              <div>
                <Input type="check" />
                完了
              </div>
              <Button>追加</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">操作</TableHead>
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>タスク名</TableHead>
            <TableHead className="w-[100px] text-center">状況</TableHead>
            <TableHead className="w-[140px] text-center">作成日時</TableHead>
            <TableHead className="w-[140px] text-center">更新日時</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="flex justify-center gap-0.5">
                  <Button className="bg-blue-600 hover:bg-blue-500">
                    <FaRegPenToSquare />
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-500">
                    <FaRegTrashCan />
                  </Button>
                </TableCell>
                <TableCell className="text-center">{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell className="text-center">{d.is_done === 0 ? '未完了' : '完了'}</TableCell>
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
