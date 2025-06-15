export type BlogItem = {
    id?: string;
    title: string;
    slug: string;
    summary: string;
    author: {
        name: string;
        email: string;
    },
    tags: Array<string>;
    stories: Array<BlogStory>;
    views: number;
    created_at: string;
    wpm: number;
}

export type BlogStory = {
    title: string;
    content: string;
}