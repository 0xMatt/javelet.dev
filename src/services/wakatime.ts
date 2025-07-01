import { WakaTimeData } from '@/services/types';

const wakatimeConfig = {
  host: 'https://wakatime.com/api/v1/',
  key: process.env.WAKATIME_API_KEY,
};

export async function getSummaries(): Promise<WakaTimeData> {
  const data = await fetch(
    wakatimeConfig.host + '/users/current/stats/last_7_days?api_key=' + wakatimeConfig.key,
    {
      headers: {
        Authorization: `Basic ${wakatimeConfig.key}`,
      },
    },
  );
  return data.json();
}
