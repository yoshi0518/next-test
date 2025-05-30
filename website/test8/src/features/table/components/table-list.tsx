'use client';

import type { PostType } from '@/features/table/types';
import { useState } from 'react';
import { cn } from '@/common/lib/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const TableList: React.FC<{ data: PostType[] }> = ({ data }) => {
  const columnHelper = createColumnHelper<PostType>();
  const columns = [
    columnHelper.accessor('userId', {
      header: 'UserID',
    }),
    columnHelper.accessor('id', {
      header: () => 'ID',
    }),
    columnHelper.accessor((row) => `${row.userId}-${row.id}`, { id: 'ConcatID' }),
    columnHelper.accessor('title', {
      header: () => 'Title',
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor('body', {
      header: () => 'Body',
    }),
    columnHelper.display({
      id: 'update',
      header: '更新',
      cell: (props) => <button onClick={() => updateRow(props.row.original.id)}>更新</button>,
    }),
    columnHelper.display({
      id: 'delete',
      header: '削除',
      cell: (props) => <button onClick={() => deleteRow(props.row.original.id)}>削除</button>,
    }),
  ];

  const updateRow = (id: number) => console.log('update', id);
  const deleteRow = (id: number) => console.log('delete', id);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
  });

  const [pageSize, setPageSize] = useState(30);

  return (
    <>
      <div>
        PageSize
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      {/* <div>Page Count：{table.getPageCount()}</div> */}
      <div className="mb-1 flex space-x-2">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className={cn(table.getCanPreviousPage() ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300')}
        >
          Privious
        </button>
        {Array.from({ length: table.getPageCount() }, (_, i) => i).map((index) => (
          <div
            key={index}
            className={cn('mr-2 cursor-pointer', { 'font-extrabold': table.getState().pagination.pageIndex === index })}
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </div>
        ))}
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className={cn(table.getCanNextPage() ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300')}
        >
          Next
        </button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Rows Number：{table.getRowModel().rows.length}</div>
    </>
  );
};
