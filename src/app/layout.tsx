import {AppSidebar} from "@/components/layout/sidebar"

import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import Link from "next/link";

import './../styles/global.css'
import {ThemeProvider} from "next-themes";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
                                    </div>
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
        </ThemeProvider>
        </body>
        </html>
    );
};

