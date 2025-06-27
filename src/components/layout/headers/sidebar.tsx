import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NextBreadcrumb from '@/components/layout/breadcrumbs';
import { ThemeSelector } from '@/components/elements/theme-selector';
import { AppSidebar } from '@/components/layout/sidebar';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeaderSiderbar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="mb-5 flex h-(--header-height) shrink-0 items-center gap-2 border-b px-1 py-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="ml-2 flex items-center gap-2 px-1 lg:ml-0">
            <SidebarTrigger className="-ml-1 md:hidden" />
          </div>
          <NextBreadcrumb />
          <div className="mr-5 ml-auto flex items-center gap-2">
            <Link href="https://github.com/0xMatt/javelet.dev" target="_blank">
              <Button size="sm" className="cursor-pointer">
                <Github />
              </Button>
            </Link>
            <ThemeSelector variant="toggle" className={'cursor-pointer'} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
