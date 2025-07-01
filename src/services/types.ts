export interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon?: string;
  }[];
}

interface Month {
  name: string;
  firstDay: string;
  totalWeeks: number;
  contributionsCount: number;
}

export interface GithubData {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            firstDay: string;
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
            }[];
          }[];
          months: Month[];
          colors: string[];
        };
      };
    };
  };
}

export interface WakaTimeData {
  data: {
    human_readable_daily_average: string;
    human_readable_total: string;
    languages: {
      name: string;
      percent: number;
    }[];
    projects: {
      name: string;
      percent: number;
    }[];
    total_seconds_idle: number;
    total_seconds_typed: number;
    best_day: {
      date: string;
      text: string;
    };
  };
}
