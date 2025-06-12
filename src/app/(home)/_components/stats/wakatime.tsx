"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import useSWR from "swr";
import StatSkeleton from "@/app/(home)/_components/stats/skeleton";
import {fetcher} from "@/lib/fetcher";

export default function WakaTime() {

    const {data} = useSWR(`/api/services/wakatime`, fetcher);
    if (!data) return (<StatSkeleton/>)

    const tags: string[] = ['programming', 'daily average'];

    return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101 h-[130px]">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <Clock size={13} className={"my-1 mr-2"}/>
                    <span
                        className={"text-sm"}>WakaTime</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {data.data.human_readable_daily_average}
                </CardTitle>
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {tags.map((tag) => (
                        <Badge variant="outline" key={tag}>
                            <Hash/>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

        </Card>
    );
};