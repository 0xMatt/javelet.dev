import * as React from 'react';
import { Command } from 'lucide-react';

import { Navigation } from '@/components/layout/sidebar/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SearchForm } from '@/components/layout/sidebar/search-form';
import Link from 'next/link';
import Profile from '@/components/layout/sidebar/profile';
import { AdminMenu } from '@/components/layout/sidebar/admin';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarInset>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="">
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Matthew Javelet</span>
                    <span className="truncate text-xs">@0xMatt</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SearchForm />
        </SidebarHeader>
        <SidebarContent>
          <Navigation />
          <AdminMenu className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <Profile />
        </SidebarFooter>
      </SidebarInset>
    </Sidebar>
  );
}
