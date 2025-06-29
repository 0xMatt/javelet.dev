import { ChevronDown, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Story } from '@/types/blog';
import { getTableOfContents } from '@/app/blog/utils';

export default function TocNavigation({ story }: { story: Story }) {
  return (
    <div
      id="mobile-toc-container"
      className="sticky top-25 w-full border-b border-b-white bg-zinc-950 lg:hidden"
    >
      <details className="group w-full">
        <summary className="flex w-full cursor-pointer items-center justify-between">
          <div className="mx-auto flex w-full items-center px-4 py-3">
            <div className="relative mr-2 size-4">
              <FileText size={16} />
            </div>
            <div className="flex flex-grow flex-col truncate text-sm">
              <span className="text-muted-foreground truncate">Table Of Contents</span>
            </div>
            <span className="text-muted-foreground ml-2">
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
            </span>
          </div>
        </summary>
        <ScrollArea className="h-[150px] w-full rounded-md border p-4">
          <div className="max-h-[25vh]">
            <ul className="flex list-none flex-col gap-y-1 px-4 pb-4">
              {getTableOfContents(story.content as string).map((item, index: number) => (
                <li key={index} className="text-xs">
                  <a
                    href={`#${item.id}`}
                    className="hover:text-foreground/60 inline-flex items-center transition-colors duration-200"
                  >
                    {item.level > 1 && (
                      <span className="text-foreground/40 mr-2">
                        {'─'.repeat(item.level - 1)}&nbsp;
                        {item.text}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </details>
    </div>
  );
}
