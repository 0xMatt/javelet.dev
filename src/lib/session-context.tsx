'use client';
import { createContext, use, useContext } from 'react';
import { SessionType } from '@/types/session';

type SessionContextType = {
  sessionPromise: Promise<SessionType | undefined | null>;
};

export const SessionContext = createContext<SessionContextType | undefined | null>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  if (context) {
    return use(context.sessionPromise);
  }
}
