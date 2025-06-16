const githubConfig = {
    token: process.env.GITHUB_TOKEN,
    username: process.env.GITHUB_USERNAME,
}

export async function getContributions() {
    const headers = {
        'Authorization': `bearer ${githubConfig.token}`,
    }
    const body = {
        "query": `query {
            user(login: "${githubConfig.username}") {
              name
              contributionsCollection {
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
          }`
    }
    return await fetch('https://api.github.com/graphql', {method: 'POST', body: JSON.stringify(body), headers: headers})
}

