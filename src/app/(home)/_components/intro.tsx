import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Code, TrendingUp } from 'lucide-react';
import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';
import { BackgroundPattern } from '@/components/elements/background-pattern';

const Intro = () => {
  const data = {
    description: 'Welcome to the digital repository of',
    name: 'Matthew Javelet',
    tagline: {
      summary: 'still up to all sorts of shenanigans',
      description: 'working on new projects, learning new things, and just being a good guy.',
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
    ],
  };
  return (
    <>
      <Card className="@container/card relative gap-0 transition-all duration-300 hover:scale-101 dark:border-neutral-500">
        <BackgroundPattern />
        <CardHeader>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent className="mb-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {data.name}
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="mb-4 flex flex-wrap gap-2 font-medium">
            {data.tags.map((tag) => (
              <Badge variant="outline" key={tag.name}>
                <tag.icon />
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="line-clamp-1 flex gap-2 font-medium">{data.tagline.summary}</div>
          <div className="text-muted-foreground">{data.tagline.description}</div>
        </CardFooter>
      </Card>
      <div className="border-sidebar-border/90 dark:border-sidebar-border relative h-10 overflow-hidden rounded-xl border transition-all duration-300 hover:scale-101">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-500/20 dark:stroke-neutral-100/20" />
      </div>
    </>
  );
};

export default Intro;
