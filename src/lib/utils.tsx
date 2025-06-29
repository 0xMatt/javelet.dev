import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DateTime } from 'luxon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, cutoff: number) {
  if (text.length <= cutoff) {
    return text;
  }
  return text.slice(0, cutoff) + '\u2026';
}

export const getRelativeDate = (date: Date) => {
  return (
    DateTime.now()
      .minus({ days: DateTime.now().diff(DateTime.fromJSDate(date)).as('days') })
      .toRelative() || ''
  );
};
