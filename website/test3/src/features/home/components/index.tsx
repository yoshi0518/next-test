import Link from 'next/link';

export const Home: React.FC = () => (
  <>
    <h2 className="mb-2 text-xl font-bold">Index</h2>
    <div className="space-y-2">
      <div>
        <Link
          href="/form1"
          className="text-blue-500 underline underline-offset-2"
        >
          ログイン
        </Link>
      </div>
      <div>
        <Link
          href="/form2"
          className="text-blue-500 underline underline-offset-2"
        >
          確認ダイアログあり
        </Link>
      </div>
      <div>
        <Link
          href="/form3"
          className="text-blue-500 underline underline-offset-2"
        >
          Input
        </Link>
      </div>
      <div>
        <Link
          href="/form4"
          className="text-blue-500 underline underline-offset-2"
        >
          Textarea
        </Link>
      </div>
      <div>
        <Link
          href="/form5"
          className="text-blue-500 underline underline-offset-2"
        >
          Select
        </Link>
      </div>
      <div>
        <Link
          href="/form6"
          className="text-blue-500 underline underline-offset-2"
        >
          Checkbox
        </Link>
      </div>
      <div>
        <Link
          href="/form7"
          className="text-blue-500 underline underline-offset-2"
        >
          Radio
        </Link>
      </div>
      <div>
        <Link
          href="/form8"
          className="text-blue-500 underline underline-offset-2"
        >
          Switch
        </Link>
      </div>
      <div>
        <Link
          href="/form9"
          className="text-blue-500 underline underline-offset-2"
        >
          Dynamic Data
        </Link>
      </div>
      <div>
        <Link
          href="/form10"
          className="text-blue-500 underline underline-offset-2"
        >
          郵便番号
        </Link>
      </div>
    </div>
  </>
);
