import { MetadataRoute } from 'next';
import { MENU_ITEMS } from '@/constants/menu';

export default function sitemap(): MetadataRoute.Sitemap {
  return MENU_ITEMS.map((item) => {
    return {
      url: process.env.APP_URL + item.url,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    };
  });
}
