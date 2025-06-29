import { SessionType } from '@/types/session';
import StatCard from '@/app/stats/_components/stat-card';
import SectionTitle from '@/components/elements/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, FileText, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default function Sessions({ sessions }: { sessions: SessionType[] }) {
  const getName = (session: SessionType) => {
    if (session.user) {
      return session?.user?.username;
    }
    return 'Guest';
    // return `${session.os} - ${session.browser}`;
  };

  const getRelativeDate = (date: string) => {
    return (
      DateTime.now()
        .minus({
          days: DateTime.now().diff(DateTime.fromISO(date)).as('days'),
        })
        .toRelative() || ''
    );
  };

  return (
    <>
      <SectionTitle title="Online users" />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <StatCard label="Who's Online" value={sessions.length.toString()} icon={User} />
        </div>
        <div className="col-span-2">
          <Card>
            <CardContent>
              <ScrollArea className="h-14">
                <div className="flex w-full flex-wrap gap-4">
                  {sessions.map((session) => (
                    <Badge key={session.id}>
                      <span className="inline-flex gap-2">
                        <User size={16} />
                        {getName(session)}
                      </span>
                      <span className="ml-1 inline-flex gap-2">
                        <Link href={session.location} className="inline-flex">
                          <FileText size={16} />
                          {session.location}
                        </Link>
                      </span>
                      <span className="ml-1 inline-flex gap-2">
                        <Clock size={16} />
                        {getRelativeDate(session.lastClick.toISOString())}
                      </span>
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
