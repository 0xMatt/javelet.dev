import prisma from '@/services/prisma';
import { Post } from '@/types/blog';

export async function getPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      author: true,
    },
  }) as Promise<Post[]>;
}

export async function updateViews(slug: string) {
  try {
    await prisma.post.update({
      where: {
        slug: slug,
      },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.error('/api/_gone/updateViews', error);
  }
}
