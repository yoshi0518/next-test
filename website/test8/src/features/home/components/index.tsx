import Link from 'next/link';

export const Home: React.FC = () => (
  <>
    <h2 className="mb-2 text-xl font-bold">Index</h2>
    <div>
      <Link
        href="/dndkit"
        className="text-blue-500 underline underline-offset-2"
      >
        dnd-kit
      </Link>
    </div>
    <div>
      <Link
        href="/table"
        className="text-blue-500 underline underline-offset-2"
      >
        tanstack table
      </Link>
    </div>
    <div>
      <Link
        href="/zustand1"
        className="text-blue-500 underline underline-offset-2"
      >
        zustand1
      </Link>
    </div>
    <div>
      <Link
        href="/zustand2"
        className="text-blue-500 underline underline-offset-2"
      >
        zustand2
      </Link>
    </div>
  </>
);
