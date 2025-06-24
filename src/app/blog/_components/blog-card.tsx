import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Eye, Hash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogItem } from '@/types/blog';
import { truncateText } from '@/lib/utils';
import { DateTime } from 'luxon';

export default function BlogCard({ post: post }: { post: BlogItem }) {
  const createdAt =
    DateTime.now()
      .minus({ days: DateTime.now().diff(DateTime.fromISO(post.createdAt.toString())).as('days') })
      .toRelative() || '';
  return (
    <Card className="h-[430px] gap-2 overflow-hidden rounded-md p-0 shadow-none transition-all duration-300 hover:scale-102 dark:border-neutral-700">
      <CardHeader className="relative p-0">
        <div className="bg-muted aspect-video w-full border-b" />
        <div className="absolute top-2 left-2 line-clamp-1 flex gap-2 font-medium">
          {post.tags.map((tag) => (
            <Badge variant="default" key={tag}>
              <Hash />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute right-2 bottom-4 line-clamp-1 flex gap-2 font-medium">
          <Badge variant="default">
            <Calendar />
            {createdAt}
          </Badge>
          <Badge variant="default">
            <Eye />
            {post.views}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="my-0 px-4 py-0">
        <h3 className="mt-0 text-lg font-semibold tracking-tight">
          <Link href={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          {truncateText(post.summary as string, 120)}
        </p>
      </CardContent>
      <CardFooter className="px-4 py-5">
        <Link href={`/blog/${post.id}`}>
          <Button className="m-0 cursor-pointer p-0 shadow-none">
            5 minute read <ChevronRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
