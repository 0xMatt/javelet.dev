import {AppSidebar} from "@/components/layout/sidebar"

import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ThemeProvider} from "next-themes";
import './../styles/global.css'
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import Breadcrumbs from "@/components/layout/breadcrumbs";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex-1 bg-white dark:bg-black">
                <div className="border-b border-solid border-white">
                    <div
                        className="border-l-1 border-r-1 mx-50 border-white dark:border-zinc-800 bg-neutral-200 dark:bg-zinc-900">
                        <div className="mx-auto border-x border-border/60 relative max-w-[1360px]">
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
                                        <Breadcrumbs/>
                                        <div className="ml-auto mr-10 flex items-center gap-2">
                                            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                                                <Link href="/">Test</Link>
                                            </Button>
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
            </div>
        </ThemeProvider>
        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    );
};

