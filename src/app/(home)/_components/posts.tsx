'use client';

import { Post } from '@/types/blog';
import BlogCard from '@/app/blog/_components/blog-card';
import { fetcher } from '@/lib/fetcher';
import CardSkeleton from '@/components/elements/card-skeleton';
import useSWR from 'swr';

export default function Posts() {
  const { data } = useSWR(`/api/blog?page=1&per_page=4`, fetcher);
  if (!data)
    return (
      <>
        <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
          <CardSkeleton className="h-[430px]" />
          <CardSkeleton className="h-[430px]" />
          <CardSkeleton className="h-[430px]" />
        </div>
      </>
    );

  return (
    <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
      {data.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
