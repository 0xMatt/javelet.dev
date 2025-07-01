import prisma from '@/services/prisma';
import PageHeader from '@/components/elements/page-header';
import { Project } from '@/types/project';
import MarkdownRenderer from '@/components/elements/markdown-renderer';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const README = 'https://raw.githubusercontent.com/%repository%/refs/heads/master/README.md';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = (await prisma.project.findUnique({
    where: {
      slug,
    },
  })) as Project;

  let markdown = undefined;
  if (project.repository) {
    const res = await fetch(
      README.replace('%repository%', project.repository.replace('https://github.com/', '')),
    );
    markdown = await res.text();
  }

  return (
    <>
      <PageHeader header={project.name} description={project.summary} />
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row lg:flex-row lg:items-center">
        <div className="flex gap-4">
          {project.repository && (
            <Link target="_blank" href={project.repository}>
              <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
                <Github size={20} />
                <span className="text-[15px] transition-all duration-300">Source Code</span>
              </div>
            </Link>
          )}
          {project.website && (
            <Link target="_blank" href={project.website}>
              <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
                <ExternalLink size={20} />
                <span className="text-[15px] transition-all duration-300">Live Demo</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      {typeof markdown === 'string' && <MarkdownRenderer content={markdown} />}
    </>
  );
}
