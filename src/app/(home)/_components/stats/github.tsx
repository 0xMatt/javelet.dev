"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GithubIcon, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import useSWR from 'swr';
import StatSkeleton from "@/app/(home)/_components/stats/skeleton";
import {fetcher} from "@/lib/fetcher";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {cn} from "@/lib/utils";


export default function Github() {

    const {data} = useSWR(`/api/services/github`, fetcher);
    if (!data) return (<StatSkeleton/>)

    return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[130px]">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 h-full"
                )}
            />
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <GithubIcon size={13} className={"my-1 mr-2"}/>
                    <span
                        className={"text-sm"}>GitHub</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {data.data.user.contributionsCollection.contributionCalendar.totalContributions} contributions
                </CardTitle>
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {['open source', new Date().getFullYear()].map((tag) => (
                        <Badge variant="outline" key={tag}>
                            <Hash/>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

        </Card>
    );
}

