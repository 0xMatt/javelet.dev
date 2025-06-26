import {
  AtSignIcon,
  ChartAreaIcon,
  CoffeeIcon,
  Computer,
  HomeIcon,
  Layers,
  Rss,
  User,
} from 'lucide-react';
import { MenuItem } from '@/types/menu';

export const MENU_ITEMS: Array<MenuItem> = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
    isActive: true,
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    title: 'Stats',
    url: '/stats',
    icon: ChartAreaIcon,
    isActive: true,
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    title: 'About',
    url: '/about',
    icon: User,
    isActive: true,
    changeFrequency: 'weekly',
    priority: 0.2,
  },

  {
    title: 'Blog',
    url: '/blog',
    icon: Rss,
    isActive: true,
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: CoffeeIcon,
    isActive: true,
    changeFrequency: 'daily',
    priority: 0.7,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: AtSignIcon,
    isActive: true,
    changeFrequency: 'weekly',
    priority: 0.2,
  },
  {
    title: 'Uses',
    url: '/uses',
    icon: Computer,
    isActive: true,
    changeFrequency: 'weekly',
    priority: 0.3,
  },
  {
    title: 'Colophon',
    url: '/colophon',
    icon: Layers,
    isActive: true,
    changeFrequency: 'weekly',
    priority: 0.4,
  },
];
