import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";
import SectionTitle from "@/components/elements/section-title";
import {getSummaries} from "@/services/wakatime";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock} from "lucide-react";
import {getContributions} from "@/services/github";
import Calendar from "@/app/stats/_components/calendar";
import {BorderBeam} from "@/components/magicui/border-beam";
import Contributions from "@/app/stats/_components/contributions";

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
    console.log(wakatime);
    console.log(github);

    const contributionCalendar =
        github.data.user.contributionsCollection?.contributionCalendar;

    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
            <SectionTitle title="WakaTime" link={{text: '0xMatt', href: 'https://wakatime.com/@0xMatt'}}/>
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
                    <BorderBeam
                        duration={6}
                        size={400}
                        className="from-transparent via-red-500 to-transparent"
                    />
                    <BorderBeam
                        duration={6}
                        delay={3}
                        size={400}
                        className="from-transparent via-blue-500 to-transparent"
                    />
                    <BorderBeam
                        duration={6}
                        delay={6}
                        size={400}
                        className="from-transparent via-emerald-500 to-transparent"
                    />
                </Card>
            </div>
            <SectionTitle title="GitHub" link={{text: '0xMatt', href: 'https://github.com/0xMatt'}}/>
            <Contributions data={contributionCalendar}/>
            <Calendar data={contributionCalendar}/>

        </>
    );
};