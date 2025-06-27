import PageHeader from '@/components/elements/page-header';
import { Metadata } from 'next';
import prisma from '@/services/prisma';
import { Badge } from '@/components/ui/badge';
import { Hash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A vast library of the most engaging literature you will ever find',
};

export default async function Page() {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      author: true,
      stories: true,
    },
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
                    src="https://placehold.co/600x400"
                    width={600}
                    height={400}
                    alt="Placeholder image"
                  />
                </div>
                <div className="grow">
                  <h3 className="mb-2 text-lg leading-6 font-medium">{post.title}</h3>
                  <p className="text-muted-foreground mb-2 text-sm">{post.summary}</p>
                  <p className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-2 text-sm">
                    <div>Matt</div>
                    <Separator orientation="vertical" />
                    <div>Date</div>
                    <Separator orientation="vertical" />
                    <div>WPM</div>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary h-4 w-4 rounded-full"></div>
                      <div>100</div>
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
