import type { ClassValue } from 'clsx';
import { TZDate } from '@date-fns/tz';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getJstDt = (date: Date, fmt = 'yyyy-MM-dd HH:mm:ss') =>
  format(new TZDate(new Date(date), 'Asia/Tokyo'), fmt);
