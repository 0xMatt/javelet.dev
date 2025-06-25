'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GithubIcon, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import CardSkeleton from '@/components/elements/card-skeleton';
import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';

export default function Github() {
  const { data } = useSWR(`/api/services/github`, fetcher);
  if (!data) return <CardSkeleton className="h-[130px]" />;

  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[130px] overflow-hidden transition-all duration-300 hover:scale-102">
      <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-500/20 dark:stroke-neutral-100/20" />
      <CardHeader>
        <CardDescription className={'flex flex-1'}>
          <GithubIcon size={13} className={'my-1 mr-2'} />
          <span className={'text-sm'}>GitHub</span>
        </CardDescription>
        <CardTitle className="text-lg">
          {data.data.user.contributionsCollection.contributionCalendar.totalContributions}{' '}
          contributions
        </CardTitle>
        <div className="line-clamp-1 flex gap-2 font-medium">
          {['open source', new Date().getFullYear()].map((tag) => (
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
