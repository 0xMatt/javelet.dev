import prisma from '@/services/prisma';

export async function GET() {
  return Response.json(
    await prisma.post.findMany({
      where: {
        publishedAt: {
          lte: new Date(),
        },
      },
      include: {
        author: true,
        stories: true,
      },
    }),
  );
}

export async function POST() {
  return Response.json({ message: 'Success' });
}
