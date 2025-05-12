import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components/ui';
import { getJstDt } from '@/common/lib/utils';
import { getNewsList } from '@/features/news/action';

export const NewsCategoryComponent: React.FC<{ category: string }> = async ({ category: _category }) => {
  const category = decodeURIComponent(_category);
  const data = await getNewsList({
    limit: 100,
    fields: 'id,publishedAt,title,category',
    filters: `category[contains]${category}`,
  });

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">お知らせ({category})</h2>
      <div className="w-[800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>公開日時</TableHead>
              <TableHead>カテゴリ</TableHead>
              <TableHead>タイトル</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.contents.map((data) => {
              const category = data.category.join(',');

              return (
                <TableRow key={data.id}>
                  <TableCell>
                    {data.publishedAt ? getJstDt(new Date(data.publishedAt), 'yy/MM/dd HH:mm') : '-'}
                  </TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                    <Link
                      href={`/news/detail/${data.id}`}
                      className="text-blue-500 underline underline-offset-4"
                    >
                      {data.title}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
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
