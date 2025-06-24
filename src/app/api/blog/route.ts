import prisma from '@/services/prisma';

export async function GET() {
  return Response.json(
    await prisma.post.findMany({
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
