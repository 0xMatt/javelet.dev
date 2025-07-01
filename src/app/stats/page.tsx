'use cache';

import PageHeader from '@/components/elements/page-header';
import { Metadata } from 'next';
import SectionTitle from '@/components/elements/section-title';
import { getSummaries } from '@/services/wakatime';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { getContributions } from '@/services/github';
import Calendar from '@/app/stats/_components/calendar';
import Contributions from '@/app/stats/_components/contributions';
import StatProgressCard from '@/app/stats/_components/stat-progress-card';
import prisma from '@/services/prisma';
import Sessions from '@/app/stats/_components/online';
import { SessionType } from '@/types/session';

export const metadata: Metadata = {
  title: 'Stats',
  description: 'Information from my various services, including WakaTime and GitHub',
};

export default async function Page() {
  const data = {
    wakatime: await getSummaries(),
    github: await getContributions(),
  };

  const wakatime = await data.wakatime.json();
  const github = await data.github.json();
  const date = new Date();
  date.setMinutes(date.getMinutes() - 30);

  const sessions: SessionType[] = (await prisma.session.findMany({
    distinct: ['ip'],
    where: {
      lastClick: {
        gte: date,
      },
    },
    include: { user: true },
  })) as SessionType[];

  const visitors = await prisma.session.groupBy({
    by: ['ip'],
  });

  const contributionCalendar = github.data.user.contributionsCollection?.contributionCalendar;

  return (
    <>
      <PageHeader header={metadata.title?.toString()} description={metadata.description} />
      <Sessions sessions={sessions} visitors={visitors} />
      <SectionTitle
        title="WakaTime"
        link={{ text: '0xMatt', href: 'https://wakatime.com/@0xMatt', target: '_blank' }}
      />
      <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[110px] transition-all duration-300 hover:scale-102">
          <CardHeader>
            <CardDescription className={'flex flex-1'}>
              <Clock size={13} className={'my-1 mr-2'} />
              <span className={'text-sm'}>Total This Week</span>
            </CardDescription>
            <CardTitle className="text-lg">{wakatime.data.human_readable_total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[110px] transition-all duration-300 hover:scale-102">
          <CardHeader>
            <CardDescription className={'flex flex-1'}>
              <Clock size={13} className={'my-1 mr-2'} />
              <span className={'text-sm'}>Daily Average</span>
            </CardDescription>
            <CardTitle className="text-lg">{wakatime.data.human_readable_daily_average}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[110px] transition-all duration-300 hover:scale-102">
          <CardHeader>
            <CardDescription className={'flex flex-1'}>
              <Clock size={13} className={'my-1 mr-2'} />
              <span className={'text-sm'}>Best Day</span>
            </CardDescription>
            <CardTitle className="text-lg">{wakatime.data.best_day.text}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2">
        <StatProgressCard name="Top Languages" limit={5} data={wakatime.data.languages} />
        <StatProgressCard
          name="Top Projects"
          limit={5}
          data={wakatime.data.projects}
          colors={['blue', 'purple']}
        />
      </div>
      <SectionTitle
        title="GitHub"
        link={{ text: '0xMatt', href: 'https://github.com/0xMatt', target: '_blank' }}
      />
      <Contributions data={contributionCalendar} />
      <Calendar data={contributionCalendar} />
    </>
  );
}
