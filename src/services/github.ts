import { GithubData } from '@/services/types';

const githubConfig = {
  token: process.env.GITHUB_TOKEN,
  username: process.env.GITHUB_USERNAME,
};

export async function getContributions(): Promise<GithubData> {
  'use cache';
  const headers = {
    Authorization: `bearer ${githubConfig.token}`,
  };
  const body = {
    query: `query {
            user(login: "${githubConfig.username}") {
              name
              contributionsCollection {
                totalIssueContributions
                contributionCalendar {
                  colors
                  totalContributions
                  months {
                      firstDay
                      name
                      totalWeeks
                  }
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
  };
  const data = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers,
  });
  return data.json();
}
