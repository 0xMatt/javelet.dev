import { Post, Story } from '@/types/blog';
import { FileText } from 'lucide-react';
import { getReadingTime } from '@/lib/reading-time';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PostStoriesList({
  post,
  currentStory,
  stories,
}: {
  post: Post;
  currentStory: Story;
  stories: Story[];
}) {
  return (
    <>
      {stories.map((story: Story, index: number) => {
        const { text } = getReadingTime(story.content as string);
        return (
          <div
            className={cn(
              'mb-2 border p-2',
              'hover:bg-secondary/50 transition-colors duration-300 ease-in-out',
              story.id === currentStory.id ? 'bg-secondary/50' : 'bg-secondary',
            )}
            key={index}
          >
            <ul className="flex shrink list-none flex-row gap-y-2">
              <li className="text-foreground/60 text-xs">
                <Link
                  href={`/blog/${post.slug}/${story.id}`}
                  className="marker:text-foreground/30 hover:text-foreground/60 text-foreground flex flex-1 list-none flex-col flex-wrap gap-y-3 underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
                >
                  <p className="flex gap-1 text-xs">
                    <FileText size={16} className="mr-1" /> {story.title}
                  </p>
                </Link>
                <p className="mt-1">{text}</p>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
