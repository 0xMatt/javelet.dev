import Link from 'next/link';
import { Command } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10 dark:bg-zinc-900">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium text-black dark:text-white"
        >
          <div className="bg-primary text-primary-foreground flex size-8 animate-pulse items-center justify-center rounded-md">
            <Command />
          </div>
          Matthew Javelet&#39;s Website
        </Link>
        {children}
      </div>
    </div>
  );
}
