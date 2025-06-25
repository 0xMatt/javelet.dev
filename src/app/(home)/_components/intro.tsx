'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Code } from 'lucide-react';
import Particles from '@/components/ui/particles';
import { useTheme } from 'next-themes';
import { AnimatedSpan, TypingAnimation } from '@/components/magicui/terminal';

const Intro = () => {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === 'light';
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
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={isLightTheme ? '#000' : '#fff'}
          refresh
        />
        <CardHeader>
          <CardDescription>
            <TypingAnimation delay={0}>{data.description}</TypingAnimation>
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-3">
          <TypingAnimation
            delay={700}
            className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl"
          >
            {data.name}
          </TypingAnimation>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <AnimatedSpan delay={1800} className="text-2xl">
            <div className="mb-4 flex flex-wrap gap-2 font-medium">
              {data.tags.map((tag) => (
                <Badge variant="outline" key={tag.name}>
                  <tag.icon className="animate-pulse text-emerald-500" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </AnimatedSpan>

          <div className="line-clamp-1 flex gap-2 font-medium">
            <TypingAnimation delay={2000}>{data.tagline.summary}</TypingAnimation>
          </div>
          <div className="text-muted-foreground">
            <TypingAnimation delay={2400}>{data.tagline.description}</TypingAnimation>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Intro;
