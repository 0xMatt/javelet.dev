'use cache';

import { notFound } from 'next/navigation';
import { Post, Story } from '@/types/blog';
import prisma from '@/services/prisma';
import { updateViews } from '@/services/internal/blog';
import { getReadingTime } from '@/lib/reading-time';
import StoriesNavigation from '@/app/blog/[...slug]/stories-nav';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookText,
  Calendar,
  Eye,
  Hash,
  ThumbsUp,
  UserCircle,
  WholeWord,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PostTableOfContents from '@/app/blog/[...slug]/toc';
import PostStoriesList from '@/app/blog/[...slug]/stories';
import TocNavigation from '@/app/blog/[...slug]/toc-nav';
import { getRelativeDate } from '@/lib/utils';
import { Metadata } from 'next';
import MarkdownRenderer from '@/components/elements/markdown-renderer';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const postSlug = slug[0];

  // fetch data
  const post: Post = (await prisma.post.findUnique({
    where: {
      slug: postSlug,
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

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const postSlug = slug[0];
  const storyId = slug[1];
  const currentSlug = postSlug;

  const post: Post = (await prisma.post.findUnique({
    where: {
      slug: postSlug,
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

  let story = null;

  if (storyId) {
    story = post.stories.find((story) => story.id == storyId) as Story;
  } else {
    story = post.stories[0];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: [
      {
        '@type': 'Person',
        name: post.author.username,
        url: process.env.APP_URL,
      },
    ],
  };

  await updateViews(postSlug);

  const wpm = post.stories
    .map((story) => getReadingTime(story.content as string).minutes)
    .reduce((accumulator, value): number => value + accumulator, 0);

  return (
    <>
      <StoriesNavigation post={post} stories={post.stories} story={story} />
      <TocNavigation story={story} />
      <div className="flex grow flex-col px-4">
        <section className="grid grid-cols-[minmax(0px,1fr)_min(calc(var(--breakpoint-md)-10rem),100%)_minmax(0px,1fr)] gap-y-6">
          <section className="col-start-2 mt-10 flex flex-col gap-y-6 text-center">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
              }}
            />
            <div className="flex flex-col">
              <h1
                className="mb-2 scroll-mt-31 text-3xl leading-tight font-medium sm:text-4xl"
                id="post-title"
              >
                {post.title}
              </h1>
              <div className="text-muted-foreground divide-border mb-4 flex flex-col items-center justify-center divide-y text-xs sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 sm:text-sm">
                <div className="flex w-full items-center justify-center gap-x-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                  <a
                    href="#"
                    className="decoration-muted-foreground hover:decoration-foreground text-foreground inline-flex underline underline-offset-[3px] transition-colors duration-300 ease-in-out"
                  >
                    <UserCircle size={16} className={'mt-0.5 mr-2'} />
                    {post.author.username}
                  </a>
                </div>
                <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                  <Calendar size={16} />
                  {getRelativeDate(post.publishedAt as Date)}
                </div>
                <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                  <WholeWord size={16} />
                  {wpm} min read{' '}
                </div>
                <div className="flex w-full items-center justify-center gap-1 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                  <BookText size={16} /> {post.stories.length} subposts
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
          <div className="sticky top-20 left-0 col-start-1 mr-0 hidden h-[calc(100vh-5rem)] w-full pr-5 lg:block">
            <PostTableOfContents slug={currentSlug} stories={post.stories} />
          </div>
          <MarkdownRenderer content={story.content as string} />
          <div className="sticky top-20 col-start-3 hidden h-[calc(100vh-5rem)] w-full pl-2 lg:block">
            <PostStoriesList post={post} currentStory={story} stories={[...post.stories]} />
          </div>
        </section>
      </div>
    </>
  );
}
