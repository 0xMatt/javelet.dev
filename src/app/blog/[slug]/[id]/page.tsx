import prisma from '@/services/prisma';
import { notFound } from 'next/navigation';
import { Story } from '@/types/blog';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const formatId: number = +id;
  const story: Story = (await prisma.story.findUnique({
    where: {
      id: formatId,
    },
  })) as Story;

  if (!story) {
    notFound();
  }

  const markdown = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
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
