'use client';

import { Tabs } from '@/components/elements/tabs';
import { Book, Briefcase, FileText } from 'lucide-react';

const sections = [
  { name: 'Story', slug: '', icon: Book },
  { name: 'Resume', slug: 'resume', icon: FileText },
  { name: 'Career', slug: 'career', icon: Briefcase },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs
        basePath={`/about`}
        items={[...sections.map((x) => ({ text: x.name, slug: x.slug, icon: x.icon }))]}
      />
      {children}
    </>
  );
}
