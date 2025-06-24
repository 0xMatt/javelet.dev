import ContactForm from './components/form';
import Meet from '@/app/contact/components/meet';
import Social from '@/app/contact/components/social';
import { Metadata } from 'next';
import PageHeader from '@/components/elements/page-header';
import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Plenty of ways to get in touch',
};

export default function Page() {
  return (
    <>
      <PageHeader header={metadata.title?.toString()} description={metadata.description} />
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
        <div className="col-span-2">
          <Social />
          <div className="border-sidebar-border/90 dark:border-sidebar-border relative mb-2 h-2 overflow-hidden rounded-xl border hover:scale-101">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-500/20 dark:stroke-neutral-100/20" />
          </div>
          <Meet />
        </div>
        <div className="col-span-3">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
