import { User } from '@/types/user';

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  authorId: number;
  author: User;
  stories: Story[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface PostForm {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  tags: string[] | string;
  authorId?: number;
  author?: User;
  stories?: Story[];
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date | null;
}

export interface Story {
  id?: string | number;
  postId?: number | string;
  title: string;
  content?: string | null;
  file?: string | null | undefined;
  generatedAt?: Date | null | undefined;
}

export interface StoryForm {
  id?: string | number;
  postId?: number | string;
  title: string;
  content?: string | null;
  file?: string | null | undefined;
  generatedAt?: Date | null | undefined;
}

export interface BlogPostResponse {
  success: boolean;
  message: string;
}

export interface BlogPostActionResponse extends BlogPostResponse {
  errors?: {
    [K in keyof PostForm]?: string[];
  };
  payload?: PostForm | null;
}

export interface BlogPostStoryResponse extends BlogPostResponse {
  errors?: {
    [K in keyof StoryForm]?: string[];
  };
  payload?: StoryForm | null;
}
