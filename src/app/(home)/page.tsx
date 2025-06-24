import Intro from '@/app/(home)/_components/intro';
import Stats from '@/app/(home)/_components/stats';
import Articles from '@/app/(home)/_components/articles';
import SectionTitle from '@/components/elements/section-title';

export default async function Page() {
  return (
    <>
      <Intro />
      <SectionTitle title="Stats on Stacks" link={{ text: 'More Stats', href: 'stats' }} />
      <Stats />
      <SectionTitle title="Articles" link={{ text: 'View All', href: 'blog' }} />
      <Articles />
    </>
  );
}
