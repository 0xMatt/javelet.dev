import Intro from '@/app/(home)/_components/intro';
import Stats from '@/app/(home)/_components/stats';
import Posts from '@/app/(home)/_components/posts';
import SectionTitle from '@/components/elements/section-title';

export default function Page() {
  return (
    <>
      <Intro />
      <SectionTitle title="Stats on Stacks" link={{ text: 'More Stats', href: 'stats' }} />
      <Stats />
      <SectionTitle title="Posts" link={{ text: 'View All', href: 'blog' }} />
      <Posts />
    </>
  );
}
