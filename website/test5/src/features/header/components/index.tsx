import Link from 'next/link';
import { auth } from '@/common/auth';
import { Button } from '@/common/components/ui';
import { HeaderAvatar } from '@/features/header/components/avatar';

import { menuItems } from '../constant';

export const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b-2 px-8 py-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Test5</h1>
      </Link>
      <ul className="flex gap-4">
        {session ? (
          <>
            {menuItems.map((menu) => (
              <li key={menu.href}>
                <Button variant="link">
                  <Link href={menu.href}>{menu.label}</Link>
                </Button>
              </li>
            ))}
            <li>
              <HeaderAvatar />
            </li>
          </>
        ) : (
          <li>
            <Button variant="link">
              <Link href="/signin">SignIn</Link>
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
};
