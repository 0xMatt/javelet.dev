import {Badge} from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {Code, TrendingUp} from "lucide-react";

const Intro = () => {

    const data = {
        description: 'Welcome to the digital repository of',
        name: 'Matthew Javelet',
        tagline: {
            'summary': 'still up to all sorts of shenanigans',
            'description': 'exposing myself like i\'m not on a watchlist or sum',
        },
        tags: [
            {
                icon: Code,
                name: 'aw lawd he codin',
            },
            {
                icon: TrendingUp,
                name: 'stonks',
            },
        ]
    }
    return (
        <>
            <Card className="@container/card gap-0 hover:scale-101">
                <CardHeader>
                    <CardDescription>{data.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mb-2">
                    {data.name}
                </CardContent>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="flex flex-wrap gap-2 font-medium mb-4">
                        {data.tags.map(tag => (
                            <Badge variant="outline" key={tag.name}>
                                <tag.icon/>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {data.tagline.summary}
                    </div>
                    <div className="text-muted-foreground">
                        {data.tagline.description}
                    </div>
                </CardFooter>
            </Card>
        </>

    );
};

export default Intro