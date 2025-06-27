import prisma from '@/services/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      author: true,
      stories: true,
    },
  });

  return Response.json(post);
}

export async function POST() {
  return Response.json({ message: 'Success' });
}
