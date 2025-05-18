import Image from 'next/image';
import { auth } from '@/common/auth';

export const HeaderAvatar: React.FC = async () => {
  const session = await auth();

  return (
    <Image
      src={session?.user?.image ?? ''}
      alt="avatar"
      width={36}
      height={36}
      className="rounded-full"
    />
  );
};
