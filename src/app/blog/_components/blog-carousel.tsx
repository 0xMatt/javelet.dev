"use client";

import * as React from "react";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Progress} from "@/components/ui/progress";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";
import {BlogItem} from "@/types/blog";
import {DateTime} from "luxon";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, ChevronRight, Eye, Hash} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

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

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const {data} = useSWR(`/api/blog?page=1&per_page=4`, fetcher);
    if (!data) return <div>Loading...</div>

    data.forEach((post: BlogItem) => {
        const days = DateTime.now().diff(DateTime.fromISO(post.created_at), 'days');
        if (days.as('days')) {
            post.created_at = DateTime.now().minus({days: days.as('days')}).toRelative() || ''
        }
    })

    return (
        <>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {data.map((post: BlogItem, index: number) => (
                        <CarouselItem key={index}>
                            <Card
                                className="h-[400px] p-0 gap-2 shadow-none overflow-hidden rounded-md dark:border-neutral-700 hover:scale-102 transition-all duration-300">
                                <CardHeader className="p-0 relative">
                                    <div className="bg-muted h-[200px] w-full border-b"/>
                                    <div
                                        className="line-clamp-1 flex gap-2 font-medium top-2 left-2 absolute">
                                        {post.tags.map((tag) => (
                                            <Badge variant="default" key={tag}>
                                                <Hash/>
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div
                                        className="line-clamp-1 flex gap-2 font-medium bottom-4 right-2 absolute">
                                        <Badge variant="default">
                                            <Calendar/>
                                            {post.created_at}
                                        </Badge>
                                        <Badge variant="default">
                                            <Eye/>
                                            {post.views}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-0 my-0 px-4">
                                    <h3 className="mt-0 text-lg font-semibold tracking-tight">
                                        <Link href={`/blog/${post.slug}`}
                                              className="hover:underline">{post.title}</Link>
                                    </h3>
                                    <p className="mt-2 text-muted-foreground text-sm">
                                        {post.summary}
                                    </p>

                                </CardContent>
                                <CardFooter className="py-5 px-4">
                                    <Link href={`/blog/${post.slug}`}><Button
                                        className="cursor-pointer m-0 p-0 shadow-none">
                                        5 minute read <ChevronRight/>
                                    </Button></Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0"/>
                <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full"/>
            </Carousel>
            <Progress value={progress} className="mt-4 w-24 ml-auto"/>
        </>
    );
}
