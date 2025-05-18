import Image from 'next/image';
import { auth } from '@/common/auth';

export const Home: React.FC = async () => {
  const session = await auth();

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Home</h2>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <Image
        src={session?.user?.image ?? ''}
        alt="avatar"
        width={45}
        height={45}
        className="rounded-full"
      />
    </>
  );
};
