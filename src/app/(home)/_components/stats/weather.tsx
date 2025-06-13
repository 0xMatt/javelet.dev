"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Cloud, Hash} from "lucide-react";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import {Badge} from "@/components/ui/badge";
import useSWR from "swr";
import StatSkeleton from "@/app/(home)/_components/stats/skeleton";
import {fetcher} from "@/lib/fetcher";

export default function Weather() {

    const {data} = useSWR(`/api/services/open-weather`, fetcher);
    if (!data) return (<StatSkeleton/>)

    return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[130px]">
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