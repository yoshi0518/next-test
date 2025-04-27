import type { ClassValue } from 'clsx';
import { TZDate } from '@date-fns/tz';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentDt = (fmt = 'yyyy-MM-dd HH:mm:ss') => format(new TZDate(new Date(), 'Asia/Tokyo'), fmt);
