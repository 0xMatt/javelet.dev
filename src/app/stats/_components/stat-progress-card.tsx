'use client';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ChartColumnIncreasing } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StatProgressCardProps {
  name: string;
  limit?: number;
  percent: number;
}

export default function StatProgressCard({
  name,
  limit,
  colors,
  data,
}: {
  name: string;
  limit: number;
  colors?: string[];
  data: StatProgressCardProps[];
}) {
  if (typeof colors === 'undefined') colors = ['red', 'yellow'];

  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[270px] transition-all duration-300 hover:scale-102">
      <CardHeader>
        <CardDescription className={'flex flex-1'}>
          <ChartColumnIncreasing size={13} className={'my-1 mr-2'} />
          <span className={'text-sm'}>{name}</span>
        </CardDescription>
        <CardContent className="text-sm">
          {data.slice(0, limit).map(
            (
              language: {
                name: string;
                percent: number;
              },
              index: number,
            ) => (
              <div key={index}>
                {language.name} - {language.percent}%
                <Progress
                  key={index}
                  value={language.percent}
                  className="[&>div]:bg-emerald-500 dark:[&>div]:bg-emerald-500"
                />
              </div>
            ),
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
