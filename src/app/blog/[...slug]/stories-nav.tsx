import { BookOpenText, ChevronDown, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Post, Story } from '@/types/blog';
import Link from 'next/link';

export default function StoriesNavigation({
  post,
  stories,
  story,
}: {
  post: Post;
  stories: Story[];
  story: Story;
}) {
  return (
    <div
      id="mobile-subposts-container"
      className="sticky top-15 w-full border-b border-b-white bg-zinc-950 lg:hidden"
    >
      <details className="group w-full">
        <summary className="flex w-full cursor-pointer items-center justify-between">
          <div className="mx-auto flex w-full items-center px-4 py-3">
            <div className="relative mr-2 size-4">
              <FileText size={16} />
            </div>
            <div className="flex flex-grow flex-col truncate text-sm">
              <span className="text-muted-foreground truncate">{story.title}</span>
            </div>
            <span className="text-muted-foreground ml-2">
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
            </span>
          </div>
        </summary>
        <ScrollArea className="h-[150px] w-full rounded-md border p-4">
          <div className="max-h-[25vh]">
            <ul className="flex list-none flex-col gap-y-1 px-4 pb-4">
              {stories.map((story: Story, index: number) => (
                <Link href={`/blog/${post.slug}/${story.id}`} key={index}>
                  <li>
                    <div className="text-foreground bg-muted mobile-subposts-active-item flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium">
                      <div className="flex flex-col">
                        <span className="line-clamp-2 inline-flex">
                          <BookOpenText size={16} className="mt-0.5 mr-2" />
                          {story.title}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </details>
    </div>
  );
}
