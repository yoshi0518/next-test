import type { ClassValue } from 'clsx';
import { TZDate } from '@date-fns/tz';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const currentDt = () => format(new TZDate('Asia/Tokyo'), 'yyyy-MM-dd HH:mm:ss');
