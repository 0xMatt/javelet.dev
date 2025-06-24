'use server';

import { z } from 'zod';
import { slugify } from '@/lib/slugify';
import { getSession } from '@/lib/session';
import prisma from '@/services/prisma';
import { BlogPostActionResponse, BlogPostData } from '@/types/blog';
import { Prisma } from '@prisma/client';

const schema = z.object({
  title: z.string().min(5, 'Title is required and must be at least 5 characters.'),
  tags: z.string().optional(),
  summary: z.string().min(5, 'Summary is required and must be at least 5 characters.'),
});

export async function createPost(
  prevState: BlogPostActionResponse | null,
  formData: FormData,
): Promise<BlogPostActionResponse> {
  const rawData: BlogPostData = {
    title: formData.get('title') as string,
    tags: formData.get('tags') as string,
    summary: formData.get('summary') as string,
  };

  // Validate the form data
  const validatedData = schema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();
  if (!session?.user) {
    return {
      success: false,
      message: 'Session is not valid, please login to create a post!',
    };
  }

  try {
    await prisma.post.create({
      data: {
        title: validatedData.data.title,
        slug: slugify(validatedData.data.title),
        summary: validatedData.data.summary,
        tags: validatedData.data.tags?.split(','),
        authorId: session.userId as number,
        views: 0,
        createdAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Post created successfully!',
    };
  } catch (e) {
    let errors = {};
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        errors = {
          title: 'Title is already taken.',
        };
      }
    }
    return {
      success: false,
      message: 'An error occurred while creating your post.',
      errors,
    };
  }
}
