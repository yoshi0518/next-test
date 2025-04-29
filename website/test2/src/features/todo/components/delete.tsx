'use client';

import { useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  toast,
} from '@/common/components/ui';
import { deleteTodoAction } from '@/features/todo/action';
import { FaRegTrashCan, FaSpinner } from 'react-icons/fa6';

export const TodoDelete: React.FC<{ id: number; name: string }> = ({ id, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const deleteTodo = async () => {
    startTransition(async () => {
      await deleteTodoAction(id);
      setIsOpen(false);
      toast.success('削除完了', {
        position: 'top-right',
        style: {
          background: 'oklch(57.7% 0.245 27.325)',
          color: '#fff',
        },
      });
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-500"
      >
        <FaRegTrashCan />
      </Button>
      <AlertDialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>削除確認</AlertDialogTitle>
            <AlertDialogDescription>
              『{id}：{name}』を削除します。よろしいですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isPending}
              className="w-[100px]"
            >
              キャンセル
            </AlertDialogCancel>
            <Button
              onClick={deleteTodo}
              disabled={isPending}
              className="w-[100px] bg-red-600 hover:bg-red-500"
            >
              {isPending && <FaSpinner className="animate-spin" />}
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
