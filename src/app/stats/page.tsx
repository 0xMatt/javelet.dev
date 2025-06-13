import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";
import SectionTitle from "@/components/elements/section-title";
import StatSkeleton from "@/app/(home)/_components/stats/skeleton";

export const metadata: Metadata = {
    title: 'Stats',
    description: 'Gamifying labor like my sanity depends on it',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
            <SectionTitle title="WakaTime" link={{text: '0xMatt', href: 'https://wakatime.com/@0xMatt'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                <StatSkeleton/>
                <StatSkeleton/>
                <StatSkeleton/>
                <StatSkeleton/>
                <StatSkeleton/>
                <StatSkeleton/>
            </div>
            <SectionTitle title="GitHub" link={{text: '0xMatt', href: 'https://github.com/0xMatt'}}/>

        </>
    );
};