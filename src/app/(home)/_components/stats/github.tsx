'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GithubIcon, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import CardSkeleton from '@/components/elements/card-skeleton';

export default function Github() {
  const { data } = useSWR(`/api/services/github`, fetcher);
  if (!data) return <CardSkeleton className="h-[130px]" />;

  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[130px] transition-all duration-300 hover:scale-102">
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
