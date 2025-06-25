import StatCard from './stat-card';
import { Activity } from 'lucide-react';

type ContributionProps = {
  data: {
    totalContributions: number;
    weeks: {
      contributionDays: {
        contributionCount: number;
      }[];
    }[];
  };
};

export default function Contributions({ data }: ContributionProps) {
  const totalContributions = data.totalContributions;
  const weeks = data.weeks;

  const totalThisWeekContribution =
    weeks[weeks.length - 1]?.contributionDays
      .map((item) => item.contributionCount)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0) || 0;

  const totalContributionList = weeks
    .map((week) =>
      week.contributionDays.map((contributionDay) => contributionDay.contributionCount),
    )
    .flat();

  const bestContribution = Math.max(...totalContributionList) || 0;
  const averageContribution = totalContributions / 30;

  return (
    <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
      <StatCard
        label="Total"
        icon={Activity}
        number={totalContributions}
        fontClass={'text-emerald-500 dark:text-emerald-400'}
      />
      <StatCard
        label="This Week"
        icon={Activity}
        number={totalThisWeekContribution}
        fontClass={'text-emerald-500 dark:text-emerald-400'}
      />
      <StatCard
        label="Best Day"
        icon={Activity}
        number={bestContribution}
        fontClass={'text-emerald-500 dark:text-emerald-400'}
      />
      <StatCard
        label="Monthly Average"
        icon={Activity}
        number={averageContribution}
        unit="/month"
        fontClass="text-emerald-500 dark:text-emerald-400"
      />
    </div>
  );
}
