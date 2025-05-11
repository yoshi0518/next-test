import Image from 'next/image';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableRow } from '@/common/components/ui';
import { getJstDt } from '@/common/lib/utils';
import { getCompanyInfo } from '@/features/company/action';

export const CompanyComponent: React.FC = async () => {
  const data = await getCompanyInfo();

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">会社案内</h2>
      <div className="w-[800px]">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">社名</TableCell>
              <TableCell>{data.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">本社</TableCell>
              <TableCell>
                <p>〒{data.post}</p>
                <p>{data.address}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">設立</TableCell>
              <TableCell>{getJstDt(data.birthday, 'yyyy年M月d日')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">事業内容</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: data.business_contents }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">資本金</TableCell>
              <TableCell>{data.capital}万円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">登録免許</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: data.licence }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">代表者</TableCell>
              <TableCell>{data.representative}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">取引銀行</TableCell>
              <TableCell>{data.bank}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">従業員</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: data.employee }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">資格者数</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: data.qualifications }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">グループ会社</TableCell>
              <TableCell>
                {data.group_companies.map((data) => {
                  return (
                    <div
                      key={`${data.fieldId}-${data.name}`}
                      className="mb-4"
                    >
                      <p>{data.name}</p>
                      <p>{data.description}</p>
                      <Link
                        href={data.url}
                        target="_blank"
                      >
                        <Image
                          src={`${data.image.url}?q=60&fm=webp`}
                          alt={data.name}
                          width={data.image.width}
                          height={data.image.height}
                          className="m-4 border"
                        />
                      </Link>
                    </div>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <Link
          href="/"
          className="text-blue-500 underline underline-offset-2"
        >
          Top
        </Link>
      </div>
    </>
  );
};
