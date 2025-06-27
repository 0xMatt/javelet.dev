import { User } from '@/types/user';

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  authorId: number;
  author: User;
  stories: BlogStory[];
  views: number;
  createdAt: Date;
  publishedAt?: Date | null;
}

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  tags: string[];
  authorId: number;
  author: User;
  stories: BlogStory[];
  views: number;
  createdAt: Date;
  publishedAt?: Date | null;
}

export interface BlogStory {
  id: number;
  postId: number;
  title: string;
  content?: string | null;
  file?: string | null | undefined;
  generatedAt?: Date | null | undefined;
}

export interface BlogStoryBasicData {
  title: string;
  postId: string | number;
}

export interface BlogPostBasicData {
  title: string;
  slug?: string;
  tags?: string;
  summary: string;
}

export interface BlogPostResponse {
  success: boolean;
  message: string;
}

export interface BlogPostActionResponse extends BlogPostResponse {
  errors?: {
    [K in keyof BlogPostBasicData]?: string[];
  };
  payload?: BlogPostBasicData | null;
}

export interface BlogPostStoryResponse extends BlogPostResponse {
  errors?: {
    [K in keyof BlogStoryBasicData]?: string[];
  };
  payload?: BlogStoryBasicData | null;
}
