import prisma from '@/services/prisma';

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
