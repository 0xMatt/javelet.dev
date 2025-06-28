import { Story } from '@/types/blog';
import { FileText } from 'lucide-react';
import { getReadingTime } from '@/lib/reading-time';

export default function PostStoriesList({ stories }: { stories: Story[] }) {
  return (
    <>
      {stories.map((story: Story, index: number) => {
        const { text } = getReadingTime(story.content as string);
        return (
          <div className="bg-muted mb-2 border p-2" key={index}>
            <ul className="flex shrink list-none flex-row gap-y-2">
              <li className="text-foreground/60 text-xs">
                <a
                  href="/test"
                  className="marker:text-foreground/30 hover:text-foreground/60 text-foreground flex flex-1 list-none flex-col flex-wrap gap-y-3 underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
                >
                  <p className="flex gap-1 text-xs">
                    <FileText size={16} className="mr-2" /> {story.title}
                  </p>
                </a>
                <p className="mt-1">{text}</p>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
