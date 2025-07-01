import { SessionType } from '@/types/session';
import StatCard from '@/app/stats/_components/stat-card';
import SectionTitle from '@/components/elements/section-title';
import { User } from 'lucide-react';
import { OnlineDataTable } from '@/app/stats/_components/online/data-table';
import { columns } from '@/app/stats/_components/online/columns';

type Visitors = {
  ip: string;
};

export default function Sessions({
  sessions,
  visitors,
}: {
  sessions: SessionType[];
  visitors: Visitors[];
}) {
  return (
    <>
      <SectionTitle title="Online users" />
      <div className="grid grid-cols-2 gap-x-4">
        <StatCard
          label="Who's Online"
          fontClass="text-emerald-500 dark:text-emerald-500"
          number={sessions.length}
          icon={User}
        />
        <StatCard
          label="Total Visitors"
          number={visitors.length}
          fontClass="text-emerald-500 dark:text-emerald-500"
          icon={User}
          className="justify-end"
        />
      </div>
      <div>
        <OnlineDataTable columns={columns} data={sessions} />
      </div>
    </>
  );
}
