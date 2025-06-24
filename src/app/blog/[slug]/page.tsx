import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar, Eye, ThumbsUp } from 'lucide-react';
import { DateTime } from 'luxon';
import { updateViews } from '@/services/internal/blog';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(process.env.APP_URL + `/api/blog/${slug}`);
  const post = await res.json();

  await updateViews(slug);
  post.created_at = DateTime.fromISO(post.created_at).toLocaleString(DateTime.DATETIME_FULL);
  return (
    <div className="w-full">
      <div className="relative z-10 p-10 text-center">
        <div className="line-clamp-1 flex justify-center gap-2 font-medium">
          <Badge className="border-none py-1">
            <Calendar /> {post.createdAt}
          </Badge>
          <Badge className="border-none py-1">
            <Eye /> {post.views}
          </Badge>
        </div>

        <div className="flex flex-col">
          <h1
            className="mb-2 scroll-mt-31 text-3xl leading-tight font-medium sm:text-4xl"
            id="post-title"
          >
            {' '}
            {post.title}{' '}
          </h1>
          <div className="text-muted-foreground divide-border mb-4 flex flex-col items-center justify-center divide-y text-xs sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 sm:text-sm">
            <div className="flex w-full items-center justify-center gap-x-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <div className="flex items-center gap-x-1.5">
                <img
                  src="https://gravatar.com/avatar/9bfdc4ec972793cf05cb91efce5f4aaaec2a0da1bf4ec34dad0913f1d845faf6.webp?size=256"
                  alt="enscribe"
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                  className="rounded-full"
                />
                <a
                  href="/authors/enscribe"
                  target="_self"
                  className="decoration-muted-foreground hover:decoration-foreground text-foreground inline-block underline underline-offset-[3px] transition-colors duration-300 ease-in-out"
                >
                  <span>enscribe</span>
                </a>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <span>December 31, 2024</span>
            </div>
            <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <span>
                {' '}
                8 min read <span className="text-muted-foreground">(90 min read total)</span>
              </span>
            </div>
            <div className="flex w-full items-center justify-center gap-1 py-2 sm:w-fit sm:px-2 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="size-3"
                data-icon="lucide:file-text"
              >
                <use href="#ai:lucide:file-text"></use>
              </svg>{' '}
              16 subposts{' '}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="/tags/other"
              target="_self"
              className="inline-block transition-colors duration-300 ease-in-out"
            >
              tags
            </a>
          </div>
        </div>

        <p className="mt-6 text-[17px] md:text-lg">{post.summary}</p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button variant={'link'}>
            Share <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button variant={'outline'}>
            <ThumbsUp className="!h-5 !w-5" /> Rate
          </Button>
        </div>
      </div>
    </div>
  );
}
