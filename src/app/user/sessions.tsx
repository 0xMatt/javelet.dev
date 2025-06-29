import { Computer } from 'lucide-react';
import prisma from '@/services/prisma';
import { getSession } from '@/lib/session';
import { Session } from '@prisma/client';
import { Separator } from '@/components/ui/separator';

export default async function Sessions() {
  const session = await getSession();

  const sessions = await prisma.session.findMany({
    where: {
      userId: session?.userId,
    },
  });

  return (
    <>
      {sessions.map((session: Session, index: number) => (
        <>
          <div className="mb-2 flex max-w-md items-center" key={index}>
            <div>
              <Computer />
            </div>
            <div className="ms-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {session.os} - {session.browser}
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  127.0.0.1, <span className="font-semibold text-green-500">This device</span>
                </div>
              </div>
            </div>
          </div>
          <Separator orientation="horizontal" />
        </>
      ))}
    </>
  );
}
