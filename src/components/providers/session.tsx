'use client';

import { SessionContext } from '@/lib/session-context';
import { SessionType } from '@/types/session';

export function Session({
  children,
  sessionPromise,
}: {
  children: React.ReactNode;
  sessionPromise: Promise<SessionType | undefined | null>;
}) {
  return <SessionContext.Provider value={{ sessionPromise }}>{children}</SessionContext.Provider>;
}
