'use client';

import { Post } from '@/types/blog';
import BlogCard from '@/app/blog/_components/blog-card';

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
      {posts.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
