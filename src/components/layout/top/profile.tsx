import { GuestProfile } from '@/components/layout/top/profile/guest';
import { UserProfile } from '@/components/layout/top/profile/user';
import { useSession } from '@/lib/session-context';

export function Profile() {
  const session = useSession();
  if (session && session.user) {
    return <UserProfile user={session.user} />;
  }
  return <GuestProfile />;
}
