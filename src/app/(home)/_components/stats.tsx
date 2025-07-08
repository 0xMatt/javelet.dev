import Github from '@/app/(home)/_components/stats/github';
import Weather from '@/app/(home)/_components/stats/weather';
import WakaTime from '@/app/(home)/_components/stats/wakatime';

export default function Stats() {
  return (
    <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-3">
      <WakaTime />
      <Github />
      <Weather />
    </div>
  );
}
