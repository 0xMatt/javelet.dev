import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { Metadata } from 'next';
import '@/styles/global.css';
import '@mdxeditor/editor/style.css';
import { Toaster } from 'sonner';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { getSession } from '@/lib/session';
import Header from '@/components/providers/header';
import { Session } from '@/components/providers/session';

export const metadata: Metadata = {
  title: {
    template: '%s | Matthew Javelet',
    default: 'Matthew Javelet',
  },
  description:
    "Matthew Javelet's website for sharing programming stats, cataloging my ramblings and displaying personal and professional details.",
  metadataBase: new URL(process.env.APP_URL || ''),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-full">
        <FlickeringGrid
          className="absolute z-0 hidden size-full min-h-full lg:block"
          squareSize={4}
          gridGap={10}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Session sessionPromise={session}>
            <div className="flex-1 bg-white dark:bg-black">
              <div className="border-b border-solid border-white">
                <div className="border-border/60 relative mx-auto w-full max-w-[1360px] border-x">
                  <DotPattern
                    className={cn(
                      '[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]',
                      'dark:fill-slate-700',
                    )}
                  />
                  <div className="border-r-1 border-l-1 border-white bg-neutral-100 lg:px-20 dark:border-zinc-800 dark:bg-zinc-900">
                    <Header>{children}</Header>
                  </div>
                </div>
              </div>
            </div>
          </Session>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
