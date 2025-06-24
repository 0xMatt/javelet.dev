import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";
import SectionTitle from "@/components/elements/section-title";
import {getSummaries} from "@/services/wakatime";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock} from "lucide-react";
import {getContributions} from "@/services/github";
import Calendar from "@/app/stats/_components/calendar";
import Contributions from "@/app/stats/_components/contributions";
import StatProgressCard from "@/app/stats/_components/stat-progress-card";

export const metadata: Metadata = {
    title: 'Stats',
    description: 'Gamifying labor like my sanity depends on it',
}

export default async function Page() {

    const data = {
        wakatime: await getSummaries(),
        github: await getContributions()
    }

    const wakatime = await data.wakatime.json();
    const github = await data.github.json();

    const contributionCalendar =
        github.data.user.contributionsCollection?.contributionCalendar;


    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
            <SectionTitle title="WakaTime"
                          link={{text: '0xMatt', href: 'https://wakatime.com/@0xMatt', target: '_blank'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                <Card
                    className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[110px]">
                    <CardHeader>
                        <CardDescription className={"flex flex-1"}>
                            <Clock size={13} className={"my-1 mr-2"}/>
                            <span
                                className={"text-sm"}>Total This Week</span>
                        </CardDescription>
                        <CardTitle className="text-lg">
                            {wakatime.data.human_readable_total}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card
                    className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[110px]">
                    <CardHeader>
                        <CardDescription className={"flex flex-1"}>
                            <Clock size={13} className={"my-1 mr-2"}/>
                            <span
                                className={"text-sm"}>Daily Average</span>
                        </CardDescription>
                        <CardTitle className="text-lg">
                            {wakatime.data.human_readable_daily_average}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card
                    className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-102 transition-all duration-300 h-[110px]">
                    <CardHeader>
                        <CardDescription className={"flex flex-1"}>
                            <Clock size={13} className={"my-1 mr-2"}/>
                            <span
                                className={"text-sm"}>Best Day</span>
                        </CardDescription>
                        <CardTitle className="text-lg">
                            {wakatime.data.best_day.text}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-2 grid-cols-1">
                <StatProgressCard name="Top Languages" limit={5} data={wakatime.data.languages}/>
                <StatProgressCard name="Top Projects" limit={5} data={wakatime.data.projects}
                                  colors={['blue', 'purple']}/>

            </div>
            <SectionTitle title="GitHub" link={{text: '0xMatt', href: 'https://github.com/0xMatt', target: '_blank'}}/>
            <Contributions data={contributionCalendar}/>
            <Calendar data={contributionCalendar}/>
        </>
    );
};