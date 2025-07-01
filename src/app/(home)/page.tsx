'use cache';

import Intro from '@/app/(home)/_components/intro';
import Stats from '@/app/(home)/_components/stats';
import SectionTitle from '@/components/elements/section-title';
import { getSummaries } from '@/services/wakatime';
import { getContributions } from '@/services/github';
import { getCurrentForecast } from '@/services/open-weather';
import { getPosts } from '@/services/internal/blog';
import Posts from '@/app/(home)/_components/posts';

export default async function Page() {
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
    dateCreated: '2025-06-23T12:00:00-05:00',
    dateModified: new Date().toISOString(),
    mainEntity: personLd,
  };

  const wakatime = await getSummaries();
  const github = await getContributions();
  const weather = await getCurrentForecast();
  const posts = await getPosts();

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
      <Stats wakatime={wakatime} github={github} weather={weather} />
      <SectionTitle title="Posts" link={{ text: 'View All', href: 'blog' }} />
      <Posts posts={posts} />
    </>
  );
}
