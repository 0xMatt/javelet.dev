import SectionTitle from "@/components/elements/section-title";
import Wakatime from "./stats/wakatime";
import Weather from "./stats/weather";
import Github from "./stats/github";

export default function Stats() {

    return (
        <section>
            <SectionTitle title="Stats on Stacks" link={{text: 'More Stats', href: 'stats'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                <Wakatime/>
                <Github/>
                <Weather/>
            </div>
        </section>
    );
};

