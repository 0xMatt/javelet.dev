'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Meteors } from '@/components/magicui/meteors';
import CardSkeleton from '@/components/elements/card-skeleton';

export default function Weather() {
  const { data } = useSWR(`/api/services/open-weather`, fetcher);
  if (!data) return <CardSkeleton className="h-[130px]" />;

  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[130px] overflow-hidden transition-all duration-300 hover:scale-102">
      <Meteors number={100} />
      <CardHeader>
        <CardDescription className={'flex flex-1'}>
          <Cloud size={13} className={'my-1 mr-2'} />
          <span className={'text-sm'}>Weather</span>
        </CardDescription>
        <CardTitle className="text-lg">{data.main.temp + '\u2109'}</CardTitle>
        <div className="line-clamp-1 flex gap-2 font-medium">
          {data.weather
            .concat([{ description: 'meteors' }])
            .map((tag: { description: string; icon: string }) => (
              <Badge variant="outline" key={tag.description}>
                <Hash />
                {tag.description}
              </Badge>
            ))}
        </div>
      </CardHeader>
    </Card>
  );
}
