const wakatimeConfig = {
  host: 'https://wakatime.com/api/v1/',
  key: process.env.WAKATIME_API_KEY,
};

export async function getSummaries() {
  return await fetch(
    wakatimeConfig.host + '/users/current/stats/last_7_days?api_key=' + wakatimeConfig.key,
    {
      headers: {
        Authorization: `Basic ${wakatimeConfig.key}`,
      },
    },
  );
}
