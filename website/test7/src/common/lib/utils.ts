import type { ClassValue } from 'clsx';
import { TZDate } from '@date-fns/tz';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentDt = () => new TZDate(new Date(), 'Asia/Tokyo');
