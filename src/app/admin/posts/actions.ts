'use server';

import { z } from 'zod';
import { slugify } from '@/lib/slugify';
import { getSession } from '@/lib/session';
import prisma from '@/services/prisma';
import { BlogPostActionResponse, BlogPostStoryResponse, Post, PostForm, Story } from '@/types/blog';
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
  const rawData: PostForm = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    tags: formData.get('tags') as string,
    summary: formData.get('summary') as string,
    // story: formData.get('story') as string,
  };

  // Validate the form data
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
  if (!session?.user) {
    return {
      success: false,
      message: 'Session is not valid, please login to create a post!',
      payload: rawData,
    };
  }

  try {
    if (rawData.slug) {
      await update(
        validatedData.data.slug,
        validatedData.data.title,
        validatedData.data.summary,
        typeof validatedData.data.tags === 'string' ? validatedData.data.tags?.split(',') : [],
      );
    } else {
      await create(
        session.user.id,
        validatedData.data.title,
        validatedData.data.summary,
        typeof validatedData.data.tags === 'string' ? validatedData.data.tags?.split(',') : [],
      );
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

function create(userId: number, title: string, summary: string, tags: string[]) {
  return prisma.post.create({
    data: {
      title: title,
      slug: slugify(title),
      summary: summary,
      tags: tags,
      authorId: userId,
      views: 0,
      createdAt: new Date(),
    },
  });
}

async function update(slug: string | undefined, title: string, summary: string, tags: string[]) {
  return prisma.post.update({
    where: { slug: slug },
    data: {
      title: title,
      slug: slugify(title),
      summary: summary,
      tags: tags,
      updatedAt: new Date(),
    },
  });
}

const storyCreateSchema = z.object({
  title: z.string().min(5, 'Title is required and must be at least 5 characters.'),
  postId: z.string(),
});

export async function createStory(
  prevState: BlogPostStoryResponse | null,
  formData: FormData,
): Promise<BlogPostStoryResponse> {
  const rawData: Story = {
    title: formData.get('title') as string,
    postId: formData.get('postId') as string,
  };

  const validatedData = storyCreateSchema.safeParse(rawData);
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

const storyUpdateSchema = z.object({
  title: z.string().min(3, 'Title is required and must be at least 5 characters.'),
  content: z.string().min(5, 'Content is required and must be at least 5 characters.'),
  id: z.string(),
});

export async function updateStory(
  prevState: BlogPostStoryResponse | null,
  formData: FormData,
): Promise<BlogPostStoryResponse> {
  const rawData: Story = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const validatedData = storyUpdateSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  try {
    const id: number = +validatedData.data.id as number;
    await prisma.story.update({
      where: { id: id },
      data: {
        title: validatedData.data.title,
        content: validatedData.data.content,
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

export async function togglePublish(post: Post): Promise<Post> {
  return (await prisma.post.update({
    where: {
      slug: post.slug,
    },
    include: {
      author: true,
      stories: true,
    },
    data: {
      publishedAt: post.publishedAt ? null : new Date(),
    },
  })) as Post;
}
