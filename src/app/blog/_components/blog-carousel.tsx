'use client';

import * as React from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Post } from '@/types/blog';
import { DateTime } from 'luxon';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Eye, Hash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const progress = (current * 100) / count;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data } = useSWR(`/api/blog?page=1&per_page=4`, fetcher);
  if (!data) return <div>Loading...</div>;

  const getFriendlyDate = (date: Date) => {
    return (
      DateTime.now()
        .minus({ days: DateTime.now().diff(DateTime.fromISO(date.toString())).as('days') })
        .toRelative() || ''
    );
  };

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((post: Post, index: number) => (
            <CarouselItem key={index}>
              <Card className="h-[400px] gap-2 overflow-hidden rounded-md p-0 shadow-none transition-all duration-300 hover:scale-102 dark:border-neutral-700">
                <CardHeader className="relative p-0">
                  <div className="bg-muted h-[200px] w-full border-b" />
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
                      {getFriendlyDate(post.createdAt)}
                    </Badge>
                    <Badge variant="default">
                      <Eye />
                      {post.views}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="my-0 px-4 py-0">
                  <h3 className="mt-0 text-lg font-semibold tracking-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">{post.summary}</p>
                </CardContent>
                <CardFooter className="px-4 py-5">
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="m-0 cursor-pointer p-0 shadow-none">
                      5 minute read <ChevronRight />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-[calc(100%+0.5rem)] left-0 translate-y-0" />
        <CarouselNext className="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0" />
      </Carousel>
      <Progress value={progress} className="mt-4 ml-auto w-24" />
    </>
  );
}
