import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Eye, Hash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/blog';
import { truncateText } from '@/lib/utils';
import { DateTime } from 'luxon';

export default function BlogCard({ post: post }: { post: Post }) {
  const createdAt =
    DateTime.now()
      .minus({ days: DateTime.now().diff(DateTime.fromISO(post.createdAt.toString())).as('days') })
      .toRelative() || '';
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="gap-2 overflow-hidden rounded-md p-0 shadow-none transition-all duration-300 hover:scale-102 dark:border-neutral-700">
        <CardHeader className="bg-muted relative h-[130px] p-0">
          <div className="absolute top-2 left-2 line-clamp-1 flex gap-2 font-medium">
            {post.tags.map((tag) => (
              <Badge variant="default" key={tag}>
                <Hash />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="absolute right-2 bottom-2 line-clamp-1 flex gap-2 font-medium">
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
        <CardContent className="my-0 h-[130px] px-4 py-5">
          <h3 className="mt-0 text-lg font-semibold tracking-tight hover:underline">
            {post.title}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            {truncateText(post.summary as string, 120)}
          </p>
        </CardContent>
        <CardFooter className="relative h-[70px]">
          <Button className="absolute bottom-0 left-0 m-0 w-full cursor-pointer p-0 shadow-none">
            5 minute read <ChevronRight />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
