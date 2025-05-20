import { env } from '@/common/env';

export const Home: React.FC = () => {
  console.log({ env });

  return (
    <>
      <p>DEBUG: {String(env.DEBUG)}</p>
    </>
  );
};
