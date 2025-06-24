import { User } from '@/types/user';

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
    title: string;
    content: string;
    file: string;
    generatedAt: Date;
}

export interface BlogPostData {
    title: string;
    tags: string;
    summary: string;
}


export interface BlogPostActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof BlogPostData]?: string[];
    };
}