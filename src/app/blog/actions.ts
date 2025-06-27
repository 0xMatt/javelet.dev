'use server';

import { z } from 'zod';
import { slugify } from '@/lib/slugify';
import { getSession } from '@/lib/session';
import prisma from '@/services/prisma';
import { BlogPostActionResponse, BlogPostBasicData, BlogPostStoryResponse, BlogStoryBasicData, } from '@/types/blog';
import { Prisma } from '@prisma/client';

const schema = z.object({
  title: z.string().min(5, 'Title is required and must be at least 5 characters.'),
  tags: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().min(5, 'Summary is required and must be at least 5 characters.'),
  // story: z.string().min(5, 'Story is required and must be at least 5 characters.'),
});

export async function createPost(
  prevState: BlogPostActionResponse | null,
  formData: FormData,
): Promise<BlogPostActionResponse> {
  const rawData: BlogPostBasicData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    tags: formData.get('tags') as string,
    summary: formData.get('summary') as string,
    // story: formData.get('story') as string,
  };

  // Validate the form data
  const validatedData = schema.safeParse(rawData);

  if (!validatedData.success) {
    console.log('rawData', rawData);

    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  const session = await getSession();
  if (!session?.user) {
    return {
      success: false,
      message: 'Session is not valid, please login to create a post!',
      payload: rawData,
    };
  }

  try {
    if (rawData.slug) {
      console.log('create');
      await update(validatedData.data);
    } else {
      console.log('update');
      await create(validatedData.data, session.user.id);
    }

    return {
      success: true,
      message: 'Post created successfully!',
    };
  } catch (e) {
    console.error(e);
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
      payload: rawData,
    };
  }
}

function create(data: BlogPostBasicData, userId: number) {
  return prisma.post.create({
    data: {
      title: data.title,
      slug: slugify(data.title),
      summary: data.summary,
      tags: data.tags?.split(','),
      authorId: userId,
      views: 0,
      createdAt: new Date(),
    },
  });
}

async function update(data: BlogPostBasicData) {
  console.log('dat', data);
  return prisma.post.update({
    where: { slug: data.slug },
    data: {
      title: data.title,
      slug: slugify(data.title),
      summary: data.summary,
      tags: data.tags?.split(','),
      updatedAt: new Date(),
    },
  });
}

const storySchema = z.object({
  title: z.string().min(5, 'Title is required and must be at least 5 characters.'),
  postId: z.string(),
});

export async function createStory(
  prevState: BlogPostStoryResponse | null,
  formData: FormData,
): Promise<BlogPostStoryResponse> {
  const rawData: BlogStoryBasicData = {
    title: formData.get('title') as string,
    postId: formData.get('postId') as string,
  };

  const validatedData = storySchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  try {
    const postId: number = +validatedData.data.postId as number;
    await prisma.story.create({
      data: {
        postId: postId,
        title: validatedData.data.title,
      },
    });

    return {
      success: true,
      message: 'Post created successfully!',
    };
  } catch (e) {
    console.log('error', e);
    return {
      success: false,
      message: 'An error occurred while creating your post.',
      payload: rawData,
    };
  }
}
