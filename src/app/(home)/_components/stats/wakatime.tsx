"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import useSWR from "swr";
import StatSkeleton from "@/app/(home)/_components/stats/skeleton";
import {fetcher} from "@/lib/fetcher";
import DotPattern from "@/components/ui/dot-pattern";
import {ShineBorder} from "@/components/magicui/shine-border";

export default function WakaTime() {

    const {data} = useSWR(`/api/services/wakatime`, fetcher);
    if (!data) return (<StatSkeleton/>)

    const tags: string[] = ['programming', 'daily average'];

    return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[130px]">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}

            />
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
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}/>
        </Card>
    );
};