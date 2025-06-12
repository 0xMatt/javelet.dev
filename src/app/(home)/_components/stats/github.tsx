import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GithubIcon, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import {Skeleton} from "@/components/ui/skeleton";

export default async function Github() {

    const data = await fetch('http://localhost:3000/api/services/github');

    if (!data) return (
        <Card
            className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101 animate-pulse">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <Skeleton className="h-[100px] w-75 rounded-xl mx-auto"/>
        </Card>
    )

    const github = await data.json();

    return (
        <Card className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <GithubIcon size={13} className={"my-1 mr-2"}/>
                    <span
                        className={"text-sm"}>GitHub</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {github.data.user.contributionsCollection.contributionCalendar.totalContributions} contributions
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
};

