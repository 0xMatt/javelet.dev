import * as React from 'react';
import { ThemeSelector } from '@/components/elements/theme-selector';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import TopMenu from '@/components/layout/top/menu';
import { AppSidebar } from '@/components/layout/sidebar';
import { Profile } from '@/components/layout/top/profile';
import NextBreadcrumb from '@/components/layout/breadcrumbs';

export default function HeaderTop({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <header className="mb-5 flex h-(--header-height) shrink-0 items-center gap-2 border-b px-1 py-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="ml-2 flex items-center gap-2 px-1 lg:ml-0">
              <SidebarTrigger className="-ml-1 md:hidden" />
            </div>
            <TopMenu className="hidden md:block" />
            <div className="mr-5 ml-auto flex items-center gap-2">
              <Profile />
              <Link
                href="https://github.com/0xMatt/javelet.dev"
                target="_blank"
                aria-label="Browse the source code on GitHub"
              >
                <Button
                  size="sm"
                  className="cursor-pointer"
                  role="button"
                  aria-label="Browse the source code on GitHub"
                >
                  <Github />
                </Button>
              </Link>
              <ThemeSelector variant="toggle" className={'cursor-pointer'} />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <NextBreadcrumb />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
