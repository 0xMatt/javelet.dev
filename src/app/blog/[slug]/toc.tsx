import { Story } from '@/types/blog';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

interface Toc {
  level: number;
  text: string;
  id: string;
}

interface Node {
  type: string;
  depth?: number;
  level?: number;
  children?: Array<{
    type: string;
    value?: string;
    children?: Node[];
  }>;
}

const getTableOfContents = (markdownContent: string): Toc[] => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkToc, {
      heading: 'Contents',
      maxDepth: 3,
      tight: true,
    })
    .use(remarkRehype)
    .use(rehypeStringify);

  // Parse the markdown content
  const tree = processor.parse(markdownContent);
  const toc: Toc[] = [];

  // Visit each node in the tree
  const visit = (node: Node) => {
    if (node.type === 'heading') {
      const level = node.depth as number;
      const text = node.children?.[0]?.value || '';
      // Generate slug for id
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      toc.push({ level, text, id });
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  };

  visit(tree);
  return toc;
};

export default function PostTableOfContents({ slug, stories }: { slug: string; stories: Story[] }) {
  const primary = stories.shift() as Story;
  return (
    <>
      <div className="mb-2 p-2">
        <ul className="flex list-none flex-col items-start justify-start gap-y-2">
          {getTableOfContents(primary.content as string).map((item, index: number) => (
            <li key={index} className="text-xs">
              <a
                href={`#${item.id}`}
                className="hover:text-foreground/60 inline-flex items-center transition-colors duration-200"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {stories.map((story: Story, index: number) => {
        return (
          <div className="bg-muted mb-2 border p-2" key={index}>
            <ul className="flex list-none flex-col gap-y-2">
              <li className="text-foreground/60 text-xs">
                <a
                  href={`/blog/${slug}/${story.id}`}
                  className="marker:text-foreground/30 hover:text-foreground/60 text-foreground inline-flex list-none underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
                >
                  {story.title}
                </a>
              </li>
              {getTableOfContents(story.content as string).map((item: Toc, index: number) => (
                <a
                  key={index}
                  href={`/blog/${slug}/${story.id}#${item.id}`}
                  className="hover:text-foreground/60 text-xs transition-colors duration-200"
                >
                  {item.level > 1 && (
                    <span className="text-foreground/40 mr-2">
                      {'─'.repeat(item.level - 1)}&nbsp;
                      {item.text}
                    </span>
                  )}
                </a>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
