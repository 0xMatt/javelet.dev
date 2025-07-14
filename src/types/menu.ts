import type { LucideIcon } from 'lucide-react';

export type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  priority: number;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
    | undefined;
  items?: MenuItem[];
};
