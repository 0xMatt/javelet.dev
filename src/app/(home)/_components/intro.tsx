import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Code } from 'lucide-react';
import Particles from '@/components/ui/particles';

const Intro = () => {
  const data = {
    description: 'Welcome to the digital repository of',
    name: 'Matthew Javelet',
    tagline: {
      summary: 'still up to all sorts of shenanigans',
      description:
        'working on new projects, learning new things, and letting my curiosity run wild.',
    },
    tags: [
      {
        icon: Code,
        name: 'currently coding',
      },
    ],
  };
  return (
    <>
      <Card className="@container/card relative h-[220px] gap-0 transition-all duration-300 hover:scale-101 dark:border-neutral-500">
        <Particles className="absolute inset-0" quantity={100} ease={80} refresh />
        <CardHeader>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent className="mb-3">{data.name}</CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="mb-4 flex flex-wrap gap-2 font-medium">
            {data.tags.map((tag) => (
              <Badge variant="outline" key={tag.name}>
                <tag.icon className="animate-pulse text-emerald-500" />
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="line-clamp-1 flex gap-2 font-medium">{data.tagline.summary}</div>
          <div className="text-muted-foreground">{data.tagline.description}</div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Intro;
