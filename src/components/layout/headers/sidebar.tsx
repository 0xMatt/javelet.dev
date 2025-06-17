import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/sidebar";
import {Separator} from "@/components/ui/separator";
import NextBreadcrumb from "@/components/layout/breadcrumbs";
import {ThemeSelector} from "@/components/elements/theme-selector";

export default function HeaderSiderbar({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <SidebarTrigger className="-ml-1 md:hidden"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
                        />
                    </div>
                    <NextBreadcrumb/>
                    <div className="ml-auto mr-10 flex items-center gap-2">
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