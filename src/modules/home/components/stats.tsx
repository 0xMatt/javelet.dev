import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, Github, Hash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import SectionTitle from "@/components/elements/section-title";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";

const STATS = [
    {
        icon: Clock,
        title: 'wakatime',
        tags: ['progamming'],
        data: '4h 31m 17s today'
    },
    {
        icon: Github,
        title: 'github',
        tags: ['open source'],
        data: '12 contributions'
    }]

const Stats = () => {
    return (
        <section>
            <SectionTitle title="Stats on Stacks" link={{text: 'More', href: 'stats'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-2 grid-cols-1">
                {STATS.map((stat) => (
                    <Card className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101" key={stat.title}>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20" />
                        <CardHeader>
                            <CardDescription className={"flex flex-1"}>
                                <Clock size={13} className={"my-1 mr-2"}/> <span
                                className={"text-sm"}>{stat.title}</span>
                            </CardDescription>
                            <CardTitle className="text-lg">
                                {stat.data}
                            </CardTitle>
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                {stat.tags.map((tag) => (
                                    <Badge variant="outline" key={tag}>
                                        <Hash/>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>

                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Stats;