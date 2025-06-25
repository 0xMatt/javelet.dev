import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="">
      <div className="container mx-auto flex min-h-75 items-center px-6 py-0">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="p-3 text-sm font-medium">
            <AlertCircle />
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">Page not found</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&lsquo;t exist. Here are some helpful links:
          </p>
          <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <Button className="flex w-1/2 items-center justify-center gap-x-2 px-5 py-2 transition-colors duration-200 sm:w-auto">
              <ArrowLeft size={16} />
              <span>Go back</span>
            </Button>
            <Link href="/">
              <Button variant="secondary" className="cursor-pointer">
                <Home size={16} />
                Take me home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
