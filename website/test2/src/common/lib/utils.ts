import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const currentDt = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');
