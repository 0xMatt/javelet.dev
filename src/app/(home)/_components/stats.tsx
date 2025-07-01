import Github from '@/app/(home)/_components/stats/github';
import Weather from '@/app/(home)/_components/stats/weather';
import WakaTime from '@/app/(home)/_components/stats/wakatime';
import { GithubData, WakaTimeData, WeatherData } from '@/services/types';

export default function Stats({
  wakatime,
  weather,
  github,
}: {
  wakatime: WakaTimeData;
  weather: WeatherData;
  github: GithubData;
}) {
  return (
    <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
      <WakaTime data={wakatime} />
      <Github data={github} />
      <Weather data={weather} />
    </div>
  );
}
