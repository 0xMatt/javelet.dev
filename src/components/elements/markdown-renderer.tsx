import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';

export default async function MarkdownRenderer({ content }: { content: string }) {
  const markdown = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .process(content);

  return (
    <article
      className="prose col-start-2 max-w-none text-white"
      dangerouslySetInnerHTML={{
        __html: String(markdown),
      }}
    ></article>
  );
}
