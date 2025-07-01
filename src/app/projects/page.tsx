import PageHeader from '@/components/elements/page-header';
import { Metadata } from 'next';
import prisma from '@/services/prisma';
import { Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Projects I've worked on, both open source and private",
};

export default async function Page() {
  const projects: Project[] = await prisma.project.findMany();
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, index) => {
          return (
            <Link
              key={index}
              href={`/projects/${project.slug}`}
              className="transitFion-colors flex flex-col gap-4 duration-300 ease-in-out sm:flex-row"
            >
              <div className="hover:bg-secondary/50 grid grid-cols-2 gap-y-4 border border-1 border-neutral-400 p-4 transition-colors duration-300 ease-in-out">
                <div className="col-span-2">
                  <Image
                    src="https://placehold.co/600x400.png"
                    width={600}
                    height={400}
                    alt="Placeholder image"
                    priority={true}
                  />
                </div>
                <div className="gap-0">
                  <div className="text-primary-foreground text-xs">Project</div>
                  <h3 className="mb-2 text-lg leading-6 font-medium">{project.name}</h3>
                </div>
                <div className="">
                  <div className="flex flex-col gap-0">
                    <div className="text-primary-foreground text-xs">Links</div>
                    <p className="mb-2 leading-6">
                      <Badge>
                        <Github size={16} />
                        {project.name.replace('https://github.com/', '')}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-primary-foreground text-xs">Tech</div>
                  <p className="mb-2">{project.tech.join(',')}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
