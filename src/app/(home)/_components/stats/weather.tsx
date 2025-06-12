"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Cloud, Hash} from "lucide-react";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import useSWR from "swr";

// @ts-expect-error any type is allowed
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Weather() {

    const {data} = useSWR(`/api/services/open-weather`, fetcher);

    if (!data) return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101 animate-pulse">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <Skeleton className="h-[20px] w-25 rounded-xl "/>
                </CardDescription>
                <CardTitle className="text-lg">
                    <Skeleton className="h-[30px] w-75 rounded-xl "/>
                </CardTitle>
                <div className="line-clamp-1 flex gap-2 font-medium">
                    <Skeleton className="h-[20px] w-20 rounded-xl "/> <Skeleton className="h-[20px] w-20 rounded-xl "/>
                </div>
            </CardHeader>
        </Card>
    )

    return (
        <Card className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <Cloud size={13} className={"my-1 mr-2"}/>
                    <span className={"text-sm"}>Weather</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {data.main.temp + '\u2109'}
                </CardTitle>
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {data.weather.map((tag: { description: string, icon: string }) => (
                        <Badge variant="outline" key={tag.description}>
                            <Hash/>
                            {tag.description}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
        </Card>
    );
};