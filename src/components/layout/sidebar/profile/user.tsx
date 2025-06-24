import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import * as React from 'react';
import UserDropdown from '@/app/auth/_components/user-dropdown';

// @ts-expect-error yee
export function UserProfile({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserDropdown user={user} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
