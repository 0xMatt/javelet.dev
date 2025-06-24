'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Hash } from 'lucide-react';
import Link from 'next/link';
import { truncateText } from '@/lib/utils';
import { ProjectItem } from '@/types/project';

export default function ProjectCard({ project: project }: { project: ProjectItem }) {
  return (
    <Card
      key={project.slug}
      className="gap-2 overflow-hidden rounded-md p-0 shadow-none transition-all duration-300 hover:scale-102 dark:border-neutral-700"
    >
      <CardHeader className="relative h-[150px] bg-zinc-800 p-0">
        <div className="bg-muted w-full border-b" />
        <div className="absolute top-2 left-2 line-clamp-1 flex gap-2 font-medium"></div>
        <div className="absolute right-2 bottom-4 line-clamp-1 flex gap-2 font-medium">
          <Badge variant="default">
            <Calendar />
          </Badge>
          <Badge variant="default">
            <Eye />
            {project.views}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="my-0 px-4 py-3">
        <h3 className="mt-0 text-lg font-semibold tracking-tight">
          <Link href={`/blog/${project.id}`} className="hover:underline">
            {project.name}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">{truncateText(project.summary, 120)}</p>
      </CardContent>
      <CardFooter className="flex gap-1 px-4 py-5">
        {project.tech.map((tech, key) => (
          <Badge variant="default" key={key}>
            <Hash />
            {tech}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
