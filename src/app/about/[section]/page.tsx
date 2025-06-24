import { notFound } from 'next/navigation';
import Resume from '@/app/about/_components/resume';
import Story from '@/app/about/_components/story';
import Career from '@/app/about/_components/career';
import { JSX } from 'react';

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { section: sectionSlug } = await params;

  const sections: { [key: string]: { story: JSX.Element; resume: string; career: string } } = ({} =
    {
      // @ts-expect-error yeaa
      story: <Story />,
      // @ts-expect-error yeaa
      resume: <Resume />,
      // @ts-expect-error yeaa
      career: <Career />,
    });
  if (!sections.hasOwnProperty(sectionSlug)) {
    notFound();
  }

  return <>{sections[sectionSlug]}</>;
}
