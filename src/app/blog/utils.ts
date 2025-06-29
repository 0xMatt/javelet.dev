import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export interface Toc {
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

export const getTableOfContents = (markdownContent: string): Toc[] => {
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
