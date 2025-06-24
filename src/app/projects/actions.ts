'use server';

import { z } from 'zod';
import { ProjectActionResponse, ProjectFormData, ProjectItem } from '@/types/project';
import { slugify } from '@/lib/slugify';
import { getSession } from '@/lib/session';
import prisma from '@/services/prisma';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';

const schema = z.object({
  name: z.string().min(5, 'Title is required and must be at least 5 characters.'),
  repository: z.string(),
  website: z.string(),
  summary: z.string().min(5, 'Summary is required and must be at least 5 characters.'),
});

export async function createProject(
  prevState: ProjectActionResponse | null | undefined,
  formData: FormData,
): Promise<ProjectActionResponse> {
  const rawData: ProjectFormData = {
    name: formData.get('name') as string,
    repository: formData.get('repository') as string,
    website: formData.get('website') as string,
    summary: formData.get('summary') as string,
  };
  const validatedData = schema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  const session = await getSession();
  if (!session?.user && !session?.user?.isAdmin) {
    return {
      success: false,
      message: 'Session is not valid, please login to create a post!',
    };
  }

  try {
    const project: ProjectItem = await prisma.project.create({
      data: {
        name: validatedData.data.name,
        slug: slugify(validatedData.data.name),
        repository: validatedData.data.repository,
        website: validatedData.data.website as string,
        summary: validatedData.data.summary,
        views: 0,
        createdAt: new Date(),
      },
    });

    return redirect(`/projects/${project.slug}`);
  } catch (e) {
    let errors = {};
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        errors = {
          title: 'Project name is already taken.',
        };
      }
    }
    return {
      success: false,
      message: 'An error occurred while creating your project.',
      errors,
    };
  }
}
