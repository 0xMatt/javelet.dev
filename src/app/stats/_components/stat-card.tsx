import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Hash, LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {NumberTicker} from "@/components/magicui/number-ticket";

type StatCardProps = {
    label: string;
    icon: LucideIcon
    value?: string;
    number?: number;
    tags?: string[];
    unit?: string;
    className?: string;
}

export default function StatCard({label, number, value, tags, icon, unit, className}: StatCardProps) {
    return (
        <Card
            className={cn('@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300', className)}>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    icon
                    <span className={"text-sm"}>{label}</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {typeof number !== "undefined" &&
                        <NumberTicker value={number}/>
                    }
                    {typeof value !== "undefined" &&
                        value
                    }
                    {unit}
                </CardTitle>
                {typeof tags !== 'undefined' &&
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {tags.map((tag) => (
                            <Badge variant="outline" key={tag}>
                                <Hash/>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                }
            </CardHeader>
        </Card>
    )
}