import Intro from '@/app/(home)/_components/intro';
import Stats from '@/app/(home)/_components/stats';
import Posts from '@/app/(home)/_components/posts';
import SectionTitle from '@/components/elements/section-title';

export default function Page() {
  const personLd = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Matthew Javelet',
    identifier: '0xMatt',
    description: 'Software Engineer',
    url: 'https://javelet.dev',
    image: 'https://raw.githubusercontent.com/0xMatt/javelet.work/refs/heads/master/public/me.jpg',
    sameAs: ['https://github.com/0xMatt', 'https://javelet.work'],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Fyuze LLC',
    },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/FollowAction',
        userInteractionCount: 1,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: 51,
      },
    ],
    agentInteractionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WriteAction',
      userInteractionCount: 2346,
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-12-23T12:34:00-05:00',
    dateModified: '2024-12-26T14:53:00-05:00',
    mainEntity: personLd,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Intro />
      <SectionTitle title="Stats on Stacks" link={{ text: 'More Stats', href: 'stats' }} />
      <Stats />
      <SectionTitle title="Posts" link={{ text: 'View All', href: 'blog' }} />
      <Posts />
    </>
  );
}
