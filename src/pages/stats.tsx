import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import PageHeader from "@/components/elements/page-header";

const META = {
    title: 'Stats',
    description: 'Gamifying labor like my sanity depends on it',
}

const StatsPage: NextPage = () => {
    return (
        <>
            <NextSeo title={`${META.title} - Matthew Javelet`} description={META.description}/>
            <PageHeader header={META.title} description={META.description}/>
        </>
    );
};

export default StatsPage;