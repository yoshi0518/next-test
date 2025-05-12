import Link from 'next/link';
import { Table, TableBody, TableCell, TableRow } from '@/common/components/ui';
import { getJstDt } from '@/common/lib/utils';
import { getNewsDetail } from '@/features/news/action';

export const NewsDetailComponent: React.FC<{ id: string }> = async ({ id }) => {
  const data = await getNewsDetail(id, {
    fields: 'id,publishedAt,title,body,category',
  });
  const category = data.category.join(',');

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">お知らせ(詳細)</h2>
      <div className="w-[500px]">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">公開日時</TableCell>
              <TableCell>{data.publishedAt ? getJstDt(new Date(data.publishedAt), 'yy/MM/dd HH:mm') : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">タイトル</TableCell>
              <TableCell>{data.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">カテゴリ</TableCell>
              <TableCell>
                <Link
                  href={`/news/category/${category}`}
                  className="text-blue-500 underline underline-offset-4"
                >
                  {category}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">本文</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: data.body }} />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <Link
          href="/news"
          className="text-blue-500 underline underline-offset-2"
        >
          戻る
        </Link>
      </div>
    </>
  );
};
