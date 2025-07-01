import * as React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSession } from '@/lib/session-context';

export function AdminMenu({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const session = useSession();

  const items = [
    {
      title: 'Users',
      url: '/admin/users',
    },
    {
      title: 'Posts',
      url: '/admin/posts',
    },
    {
      title: 'Projects',
      url: '/admin/projects',
    },
  ];

  if (!session?.user?.isAdmin) {
    return;
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
