import Github from "@/app/(home)/_components/stats/github";
import SectionTitle from "@/components/elements/section-title";
import Weather from "@/app/(home)/_components/stats/weather";
import WakaTime from "@/app/(home)/_components/stats/wakatime";

export const dynamic = 'force-dynamic';

export default function Stats() {

    return (
        <section>
            <SectionTitle title="Stats on Stacks" link={{text: 'More Stats', href: 'stats'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                <WakaTime/>
                <Github/>
                <Weather/>
            </div>
        </section>
    );
};

