"use client"

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import SectionTitle from "@/components/elements/section-title";
import useSWR from 'swr';
import {BlogItem} from "@/types/blog";
import {DateTime} from "luxon";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Calendar, ChevronRight, Eye, Hash} from "lucide-react";

// @ts-expect-error any type is allowed
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Articles() {

    const {data} = useSWR(`/api/blog?page=1&per_page=4`, fetcher);
    if (!data) return <div>Loading...</div>

    data.forEach((post: BlogItem) => {
        const days = DateTime.now().diff(DateTime.fromISO(post.created_at), 'days');
        if (days.as('days')) {
            post.created_at = DateTime.now().minus({days: days.as('days')}).toRelative() || ''
        }
    })

    return (
        <section>
            <SectionTitle title="Latest Articles" link={{text: 'View All', href: 'blog'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                {data.map((article: BlogItem) => (
                    <Card key={article.slug}
                          className="p-0 gap-2 shadow-none overflow-hidden rounded-md dark:border-neutral-700 hover:scale-101">
                        <CardHeader className="p-0 relative">
                            <div className="aspect-video bg-muted w-full border-b"/>
                            <div
                                className="line-clamp-1 flex gap-2 font-medium top-2 left-2 absolute">
                                {article.tags.map((tag) => (
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
                                    {article.created_at}
                                </Badge>
                                <Badge variant="default">
                                    <Eye/>
                                    {article.views}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="py-0 my-0 px-4">
                            <h3 className="mt-0 text-lg font-semibold tracking-tight">
                                <Link href={`/blog/${article.slug}`}
                                      className="hover:underline">{article.title}</Link>
                            </h3>
                            <p className="mt-2 text-muted-foreground text-sm">
                                {article.summary}
                            </p>

                        </CardContent>
                        <CardFooter className="py-5 px-4">
                            <Link href={`/blog/${article.slug}`}><Button className="cursor-pointer m-0 p-0 shadow-none">
                                5 minute read <ChevronRight/>
                            </Button></Link>
                        </CardFooter>
                    </Card>


                ))}

            </div>
        </section>
    );
};