import { AtSignIcon, ChartAreaIcon, CoffeeIcon, HomeIcon, Rss, User } from 'lucide-react';
import { MenuItem } from '@/types/menu';

export const MENU_ITEMS: Array<MenuItem> = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
    isActive: true,
  },
  {
    title: 'Stats',
    url: '/stats',
    icon: ChartAreaIcon,
    isActive: true,
  },
  {
    title: 'About',
    url: '/about',
    icon: User,
    isActive: true,
  },

  {
    title: 'Blog',
    url: '/blog',
    icon: Rss,
    isActive: true,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: CoffeeIcon,
    isActive: true,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: AtSignIcon,
    isActive: true,
  },
  // {
  //     title: "Menu",
  //     url: "#",
  //     isActive: false,
  //     icon: Settings2,
  //     items: [
  //         {
  //             title: "Child",
  //             url: "#",
  //         },
  //     ],
  // },
];
