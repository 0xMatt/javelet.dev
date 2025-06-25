'use client';

import { Tabs } from '@/components/elements/tabs';
import { Book, Briefcase, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence>
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
