import {AppSidebar} from "@/components/layout/sidebar"

import {Separator} from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {ReactNode} from "react";
import Breadcrumbs from "@/components/layout/breadcrumbs";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {


    return (
        <div className="flex-1 bg-white dark:bg-black">
            <div className="border-b border-border/60">
                <div className="mx-auto border-x border-border/60 relative max-w-[1360px]">
                        <SidebarProvider>
                            <AppSidebar/>
                            <SidebarInset>
                                <header className="flex h-16 shrink-0 items-center gap-2">
                                    <div className="flex items-center gap-2 px-4">
                                        <SidebarTrigger className="-ml-1 md:hidden"/>
                                        <Separator
                                            orientation="vertical"
                                            className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
                                        />
                                        <Breadcrumbs/>
                                    </div>
                                </header>
                                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                    {children}
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                    </div>
                </div>
        </div>

    );
};

