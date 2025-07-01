import { Story } from '@/types/blog';
import { getTableOfContents, Toc } from '@/app/blog/utils';
import Link from 'next/link';

export default function PostTableOfContents({ slug, stories }: { slug: string; stories: Story[] }) {
  const primaryStory = stories[0];
  return (
    <>
      <div className="mb-2 p-2">
        <ul className="flex list-none flex-col items-start justify-start gap-y-2">
          {getTableOfContents(primaryStory.content as string).map((item, index: number) => (
            <li key={index} className="text-xs">
              <Link
                href={'/blog/' + slug + '#' + item.id}
                className="hover:text-foreground/60 inline-flex items-center transition-colors duration-200"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {stories.slice(1, stories.length).map((story: Story, index: number) => {
        return (
          <div className="bg-muted mb-2 border p-2" key={index}>
            <ul className="flex list-none flex-col gap-y-2">
              <li className="text-foreground/60 text-xs">
                <Link
                  href={'/blog/' + slug + '/' + story.id}
                  className="marker:text-foreground/30 hover:text-foreground/60 text-foreground inline-flex list-none underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
                >
                  {story.title}
                </Link>
              </li>
              {getTableOfContents(story.content as string).map((item: Toc, index: number) => (
                <Link
                  key={index}
                  href={'/blog/' + slug + '/' + story.id + '#' + item.id}
                  className="hover:text-foreground/60 text-xs transition-colors duration-200"
                >
                  {item.level > 1 && (
                    <span className="text-foreground/40 mr-2">
                      {'─'.repeat(item.level - 1)}&nbsp;
                      {item.text}
                    </span>
                  )}
                </Link>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
