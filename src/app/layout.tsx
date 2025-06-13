import {ThemeProvider} from "next-themes";
import './../styles/global.css'
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import HeaderProvider from "@/components/layout/header.provider";
import {BackgroundPattern} from "@/components/elements/background-pattern";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex-1 bg-white dark:bg-black">
                <BackgroundPattern/>
                <div className="border-b border-solid border-white">
                    <div className="mx-auto w-full border-x border-border/60 relative max-w-[1360px]">
                        <div
                            className="border-l-1 border-r-1 lg:px-20 border-white dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900">
                            <HeaderProvider>{children}</HeaderProvider>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    )
};

