import {ThemeProvider} from "next-themes";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import HeaderProvider from "@/components/layout/header.provider";
import {FlickeringGrid} from "@/components/magicui/flickering-grid";
import {Metadata} from "next";
import '@/styles/global.css'
import {Toaster} from "sonner";

export const metadata: Metadata = {
    title: {
        template: '%s | Matthew Javelet',
        default: 'Matthew Javelet',
    },
    description: 'Matthew Javelet\'s website for divulging my programming stats, cataloging my ramblings and showing personal and professional details.',
    metadataBase: new URL(process.env.APP_URL || ''),
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="min-h-full relative">

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex-1 bg-white dark:bg-black">

                <div className="border-b border-solid border-white">

                    <div className="mx-auto w-full border-x border-border/60 relative max-w-[1360px]">
                        <FlickeringGrid
                            className="absolute  z-0 size-full min-h-full"
                            squareSize={4}
                            gridGap={6}
                            color="#6B7280"
                            maxOpacity={0.5}
                            flickerChance={0.1}
                        />
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
        <Toaster/>
        </body>
        </html>
    )
};

