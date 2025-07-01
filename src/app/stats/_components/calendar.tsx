import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CalendarProps {
  data: {
    weeks: {
      firstDay: string;
      contributionDays: {
        date: string;
        contributionCount: number;
        color: string;
      }[];
    }[];
    months: Month[];
    colors: string[];
  };
}

interface Month {
  name: string;
  firstDay: string;
  totalWeeks: number;
  contributionsCount: number;
}

export default function Calendar({ data }: CalendarProps) {
  const weeks = data?.weeks ?? [];
  const months =
    data?.months?.map((month: Month) => {
      const filterContributionDay = weeks
        .filter((week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7))
        .map((item) => item.contributionDays)
        .flat(1);
      const getContributionsByMonth = filterContributionDay.reduce(
        (previousValue, currentValue) => previousValue + currentValue.contributionCount,
        0,
      );

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      };
    }) ?? [];

  return (
    <>
      <ScrollArea>
        <div className="relative flex flex-col">
          <ul className="flex justify-end gap-[3px] text-xs lg:justify-between dark:text-neutral-400">
            {months.map((month) => (
              <li
                key={month.firstDay}
                className={cn(`${month.totalWeeks < 2 ? 'invisible' : ''}`, 'm-0 p-0')}
                style={{ minWidth: 14.3 * month.totalWeeks }}
              >
                {month.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-[3px] lg:justify-between">
            {weeks?.map((week) => (
              <div key={week.firstDay}>
                {week.contributionDays.map((contribution, index) => {
                  const backgroundColor = contribution.contributionCount > 0 && contribution.color;

                  return (
                    <span
                      key={index}
                      className="my-[2px] block h-[12px] w-[12px] rounded-sm bg-neutral-300 dark:bg-neutral-800"
                      style={backgroundColor ? { backgroundColor } : undefined}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
