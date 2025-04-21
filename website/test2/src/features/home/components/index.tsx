import Link from 'next/link';

export const Home: React.FC = () => (
  <>
    <h2 className="mb-2 text-xl font-bold">Index</h2>
    <div>
      <Link
        href="/contact"
        className="text-blue-500 underline underline-offset-2"
      >
        問合せフォーム
      </Link>
    </div>
    <div>
      <Link
        href="/todo"
        className="text-blue-500 underline underline-offset-2"
      >
        Todo
      </Link>
    </div>
  </>
);
