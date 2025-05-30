import type { PostType } from '@/features/table/types';
import { env } from '@/common/env';
import { Logger } from '@/common/lib/logger';

import { TableList } from './table-list';

const logger = new Logger(env.DEBUG);

export const TableContainer: React.FC = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!response.ok) return <div>データ取得失敗</div>;

  const data = (await response.json()) as PostType[];
  logger.debug('JSONPlaceholderレスポンス', data.slice(0, 10));

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Tanstack Table</h2>
      <TableList data={data} />
    </>
  );
};
