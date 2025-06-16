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
        months: {
            name: string;
            firstDay: string;
            totalWeeks: number;
            contributionsCount: number;
        }[];
        colors: string[];
    };
}

export default function Calendar({data}: CalendarProps) {
    return (
        <div className='relative flex flex-col'>
            <ul className='flex justify-end gap-1 overflow-hidden text-xs md:justify-start'>
                {data.months.map((month) => (
                    <li key={month.firstDay} style={{minWidth: 14.3 * month.totalWeeks}}>
                        {month.name}
                    </li>
                ))}
            </ul>
            <div className='flex justify-start gap-1 overflow-hidden'>
                {data.weeks.map((week) => (
                    <div key={week.firstDay}>
                        {week.contributionDays.map((contribution, index) => {
                            const backgroundColor = contribution.contributionCount > 0 && contribution.color;
                            return (
                                <span key={index}
                                      className='my-[2px] block h-[12px] w-[12px] rounded-sm bg-neutral-300 dark:bg-neutral-800'
                                      style={backgroundColor ? {backgroundColor} : undefined}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};