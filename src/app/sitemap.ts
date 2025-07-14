import { MetadataRoute } from 'next';
import { MENU_ITEMS } from '@/constants/menu';
import prisma from '@/services/prisma';

let posts: Array<{
  url: string;
  lastModified: Date;
  changeFrequency:
    | 'weekly'
    | 'always'
    | 'hourly'
    | 'daily'
    | 'monthly'
    | 'yearly'
    | 'never'
    | undefined;
  priority: number;
}> = [];

const data = await prisma.post.findMany({
  where: {
    publishedAt: {
      lte: new Date(),
    },
  },
});
posts = data.map((post) => {
  return {
    url: process.env.APP_URL + '/blog/' + post.slug,
    lastModified: post.createdAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  const flattenedMenu = MENU_ITEMS.flatMap((parent) => {
    if (parent.items) {
      return parent.items.map((item) => ({
        ...item,
      }));
    }
    return [parent];
  });
  return flattenedMenu
    .map((item) => {
      return {
        url: process.env.APP_URL + item.url,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      };
    })
    .concat(posts);
}
