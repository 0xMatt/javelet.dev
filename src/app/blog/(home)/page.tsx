import PageHeader from '@/components/elements/page-header';
import { Metadata } from 'next';
import prisma from '@/services/prisma';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Hash, UserCircle, WholeWord } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { getReadingTime } from '@/lib/reading-time';
import { getRelativeDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A vast library of the most engaging literature you will ever find',
};

interface PostWithWpm extends Post {
  wpm: number;
}

export default async function Page() {
  const posts: PostWithWpm[] = (await prisma.post.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      author: true,
      stories: true,
    },
  })) as PostWithWpm[];

  posts.map((post) => {
    post.wpm = post.stories
      .map((story) => getReadingTime(story.content as string).minutes)
      .reduce((accumulator, value): number => value + accumulator, 0);
  });

  return (
    <>
      <PageHeader header={metadata.title?.toString()} description={metadata.description} />
      <section className="flex flex-col gap-4 border-1 border-neutral-400">
        {posts.map((post, index) => (
          <div className="flex flex-col gap-y-4" key={index}>
            <div className="hover:bg-secondary/50 border p-4 transition-colors duration-300 ease-in-out">
              <Link
                href={`/blog/${post.slug}`}
                className="transitFion-colors flex flex-col gap-4 duration-300 ease-in-out sm:flex-row"
              >
                <div className="max-w-3xs sm:shrink-0">
                  <Image
                    src="https://placehold.co/600x400.png"
                    width={600}
                    height={400}
                    alt="Placeholder image"
                    priority={true}
                  />
                </div>
                <div className="grow">
                  <h3 className="mb-2 text-lg leading-6 font-medium">{post.title}</h3>
                  <p className="text-muted-foreground mb-2 text-sm">{post.summary}</p>
                  <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-2 text-sm">
                    <span className="inline-flex">
                      <UserCircle size={16} className="mt-0.5 mr-1" />
                      {post.author.name}
                    </span>
                    <span className="inline-flex">
                      <FileText size={16} className="mt-0.5 mr-1" />
                      {getRelativeDate(post.createdAt)}
                    </span>
                    <span className="inline-flex">
                      <WholeWord size={16} className="mt-0.5 mr-1" />
                      {post.wpm} min read
                    </span>
                  </div>
                  <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-2 text-sm">
                    <div className="inline-flex">
                      <Eye size={16} className="mt-0.5 mr-1" />
                      {post.views} Views
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <Badge variant="default" key={tag}>
                        <Hash />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
