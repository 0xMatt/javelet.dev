import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkRehype from 'remark-rehype';
import { Story } from '@/types/blog';
import { notFound } from 'next/navigation';

export default async function StoryRenderer({ story }: { story: Story }) {
  if (!story) {
    notFound();
  }

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .process(story.content as string);

  return (
    <article
      className="prose col-start-2 max-w-none text-white"
      dangerouslySetInnerHTML={{
        __html: String(markdown),
      }}
    ></article>
  );
}
