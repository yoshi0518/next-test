import Link from 'next/link';

export const Home: React.FC = () => (
  <>
    <h2 className="mb-2 text-xl font-bold">Index</h2>
    <div className="space-y-2">
      <div>
        <Link
          href="/company"
          className="text-blue-500 underline underline-offset-2"
        >
          会社案内
        </Link>
      </div>
      <div>
        <Link
          href="/news"
          className="text-blue-500 underline underline-offset-2"
        >
          お知らせ
        </Link>
      </div>
    </div>
  </>
);
