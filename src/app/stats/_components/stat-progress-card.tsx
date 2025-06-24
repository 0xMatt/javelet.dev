'use client';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ChartColumnIncreasing } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BorderBeam } from '@/components/magicui/border-beam';

interface StatProgressCardProps {
  name: string;
  limit: number;
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
                {language.name} {language.percent}%
                <Progress
                  key={index}
                  value={language.percent}
                  className={'w-[' + language.percent + '%] h-4 [&>div]:bg-green-500'}
                />
              </div>
            ),
          )}
        </CardContent>
      </CardHeader>
      {colors.map((color, index: number) => (
        <BorderBeam
          key={index}
          duration={40}
          size={500}
          className={`from-transparent via-${color}-500 to-transparent`}
        />
      ))}
    </Card>
  );
}
