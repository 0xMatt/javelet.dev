import prisma from '@/services/prisma';
import { notFound } from 'next/navigation';
import StoryForm from '@/app/admin/posts/story/[id]/form';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const formattedId: number = +id;
  try {
    const story = await prisma.story.findUnique({
      where: { id: formattedId },
    });

    if (!story) {
      return notFound();
    }

    return (
      <>
        Story: {story.title}
        <StoryForm story={story} />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
