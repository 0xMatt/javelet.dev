import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import NextBreadcrumb from "@/components/layout/breadcrumbs";
import {ThemeSelector} from "@/components/elements/theme-selector";
import {AppSidebar} from "@/components/layout/sidebar";

export function HeaderSiderbar({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header
                    className="flex h-(--header-height) mb-5 px-1 py-2 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                    <div className="flex items-center gap-2 px-1 ml-2 lg:ml-0">
                        <SidebarTrigger className="-ml-1 md:hidden"/>
                    </div>
                    <NextBreadcrumb/>
                    <div className="ml-auto mr-5 flex items-center gap-2">
                        <ThemeSelector variant='toggle' className={"cursor-pointer"}/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}