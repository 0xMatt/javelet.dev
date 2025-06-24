import PageHeader from '@/components/elements/page-header';
import { Metadata } from 'next';
import prisma from '@/services/prisma';
import ProjectCard from '@/app/projects/_components/project-card';
import { ProjectItem } from '@/types/project';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Projects I've worked on, both open source and private",
};

export default async function Page() {
  const projects: ProjectItem[] = await prisma.project.findMany();
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
