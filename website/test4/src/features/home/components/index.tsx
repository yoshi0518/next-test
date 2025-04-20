import { env } from '@/common/env';

export const Home: React.FC = () => {
  console.log({ env });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Test2</h1>
      <p>DEBUG: {String(env.DEBUG)}</p>
    </>
  );
};
