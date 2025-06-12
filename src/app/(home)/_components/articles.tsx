"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, Clock, Eye, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import SectionTitle from "@/components/elements/section-title";
import useSWR from 'swr';
import {BlogItem} from "@/types/blog";
import {DateTime} from "luxon";

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
                    <Card className="@container/card hover:scale-101" key={article.title}>
                        <CardHeader>
                            <CardDescription className={"flex flex-1"}>
                                <Calendar size={13} className={"my-1 mr-2"}/> <span
                                className={"text-sm"}>{article.created_at}</span>
                            </CardDescription>
                            <CardTitle className="text-lg">
                                <a href="#" className={" hover:underline"}>{article.title}</a>
                            </CardTitle>
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                {article.tags.map((tag) => (
                                    <Badge variant="outline" key={tag}>
                                        <Hash/>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="line-clamp-1 flex gap-2 text-sm">
                                {article.description}
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground text-sm">
                                <div className="flex justify-between gap-4 px-0.5 text-neutral-400">
                                    <div className="flex justify-between gap-4 ">
                                        <div className="flex items-center gap-1">
                                            <Eye size={12}/>
                                            <span className="ml-0.5 text-xs font-medium">{article.views} views</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12}/>
                                            <span className="ml-0.5 text-xs font-medium">{article.wpm}</span></div>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};