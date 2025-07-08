'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DotPattern from '@/components/ui/dot-pattern';
import useSWR from 'swr';
import CardSkeleton from '@/components/elements/card-skeleton';
import { fetcher } from '@/lib/fetcher';

export default function WakaTime() {
  const tags: string[] = ['programming', 'daily average'];

  const { data } = useSWR(`/api/services/wakatime`, fetcher);
  if (!data) return <CardSkeleton className="h-[130px]" />;
  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[130px] transition-all duration-300 hover:scale-102">
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />
      <CardHeader>
        <CardDescription className={'flex flex-1'}>
          <Clock size={13} className={'my-1 mr-2'} />
          <span className={'text-sm'}>WakaTime</span>
        </CardDescription>
        <CardTitle className="text-lg">{data.data.human_readable_daily_average}</CardTitle>
        <div className="line-clamp-1 flex gap-2 font-medium">
          {tags.map((tag) => (
            <Badge variant="outline" key={tag}>
              <Hash />
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
