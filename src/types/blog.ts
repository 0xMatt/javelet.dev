export type BlogItem = {
    title: string;
    slug: string;
    description: string;
    author: {
        name: string;
        email: string;
    },
    tags: Array<string>;
    stories: Array<BlogStory>;
    views: number;
    created_at: Date;
}

export type BlogStory = {
    title: string;
    content: string;
}