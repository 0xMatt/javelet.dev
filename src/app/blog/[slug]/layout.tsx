import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, FileText, Hash, ThumbsUp } from 'lucide-react';
import { updateViews } from '@/services/internal/blog';
import PostStoriesList from '@/app/blog/[slug]/stories';
import prisma from '@/services/prisma';
import { notFound } from 'next/navigation';
import { Post } from '@/types/blog';
import PostTableOfContents from '@/app/blog/[slug]/toc';
import { getReadingTime } from '@/lib/reading-time';

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { slug } = await params;
  const post: Post = (await prisma.post.findUnique({
    where: {
      slug: slug,
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      author: true,
      stories: {
        orderBy: {
          id: 'asc',
        },
      },
    },
  })) as Post;

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: [
      {
        '@type': 'Person',
        name: 'Matthew Javelet',
        url: process.env.APP_URL,
      },
    ],
  };

  await updateViews(slug);

  const wpm = post.stories
    .map((story) => getReadingTime(story.content as string).minutes)
    .reduce((accumulator, value): number => value + accumulator, 0);

  return (
    <div className="flex grow flex-col px-4">
      <section className="grid grid-cols-[minmax(0px,1fr)_min(calc(var(--breakpoint-md)-10rem),100%)_minmax(0px,1fr)] gap-y-6">
        <section className="col-start-2 mt-10 flex flex-col gap-y-6 text-center">
          {/* Add JSON-LD to page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
          />
          {/* ... */}
          <div className="flex flex-col">
            <h1
              className="mb-2 scroll-mt-31 text-3xl leading-tight font-medium sm:text-4xl"
              id="post-title"
            >
              {post.title}
            </h1>
            <div className="text-muted-foreground divide-border mb-4 flex flex-col items-center justify-center divide-y text-xs sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 sm:text-sm">
              <div className="flex w-full items-center justify-center gap-x-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <div className="flex items-center gap-x-1.5">
                  <a className="decoration-muted-foreground hover:decoration-foreground text-foreground inline-block underline underline-offset-[3px] transition-colors duration-300 ease-in-out">
                    <span>{post.author.username}</span>
                  </a>
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <span>{''}</span>
              </div>
              <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <span>{wpm} min read </span>
              </div>
              <div className="flex w-full items-center justify-center gap-1 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <FileText size={16} />
                {post.stories.length} subposts
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <Badge variant="default" key={tag}>
                  <Hash />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">
                <Eye />
                {post.views} Views
              </Badge>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button variant={'link'}>
                Share <ArrowUpRight className="!h-5 !w-5" />
              </Button>
              <Button variant={'outline'}>
                <ThumbsUp className="!h-5 !w-5" /> Rate
              </Button>
            </div>
          </div>

          <nav className="col-start-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="#"
              className="disbled:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-3 group flex size-full shrink-0 items-center justify-start gap-2 border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowLeft />
              <div className="flex flex-col items-start overflow-hidden text-wrap">
                <span className="text-muted-foreground text-left text-xs"> Previous Post </span>
                <span className="w-full text-left text-sm text-balance text-ellipsis">
                  Youre at the oldest Post!
                </span>
              </div>
            </a>
            <a
              href="#"
              className="disbled:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-3 group flex size-full shrink-0 items-center justify-end gap-2 border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            >
              <div className="flex flex-col items-end overflow-hidden text-wrap">
                <span className="text-muted-foreground text-right text-xs"> Next Post </span>
                <span className="w-full text-right text-sm text-balance text-ellipsis">
                  You are at the newest Post!
                </span>
              </div>
              <ArrowRight />
            </a>
          </nav>
        </section>
        <div className="sticky top-20 left-0 col-start-1 mr-0 hidden h-[calc(100vh-5rem)] w-full pr-5 xl:block">
          <PostTableOfContents slug={slug} stories={post.stories} />
        </div>
        {children}
        <div className="sticky top-20 col-start-3 mr-auto ml-4 hidden h-[calc(100vh-5rem)] w-full xl:block">
          <PostStoriesList stories={[...post.stories]} />
        </div>
      </section>
    </div>
  );
}
