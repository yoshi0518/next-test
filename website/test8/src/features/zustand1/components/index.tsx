'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/common/components/ui';
import { useCountStore, useUserStore } from '@/common/stores';

export const Zustand1: React.FC = () => {
  const setName = useUserStore((state) => state.setName);
  const userName = useUserStore((state) => state.userName);
  const display = useUserStore((state) => state.display);
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);
  const reset = useCountStore((state) => state.reset);

  const [name, setName2] = useState(userName);

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Zustand1</h2>
      <h3 className="mb-2 font-bold underline">User {display()}</h3>
      <div className="mb-4 flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName2(e.target.value)}
          className="w-[300px]"
        />
        <Button onClick={() => setName(name)}>Update</Button>
      </div>

      <h3 className="mb-2 font-bold underline">Count {count}</h3>
      <div className="mb-4 flex gap-2">
        <Button onClick={() => increment(1)}>Increment</Button>
        <Button onClick={() => decrement(1)}>Decrement</Button>
        <Button onClick={reset}>Reset</Button>
      </div>

      <Link
        href="/"
        className="text-blue-500 underline underline-offset-2"
      >
        Top
      </Link>
    </>
  );
};
