import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Hash } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { getRelativeDate, truncateText } from '@/lib/utils';

export default function BlogCard({ post: post }: { post: Post }) {
  /*  const wpm = post.stories
    .map((story) => getReadingTime(story.content as string).minutes)
    .reduce((accumulator, value): number => value + accumulator, 0);*/

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
              {getRelativeDate(new Date(post.createdAt))}
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
        {/*<CardFooter className="relative h-[70px]">
          <Button className="absolute bottom-0 left-0 m-0 w-full cursor-pointer p-0 shadow-none">
            {wpm} minute read <ChevronRight />
          </Button>
        </CardFooter>*/}
      </Card>
    </Link>
  );
}
