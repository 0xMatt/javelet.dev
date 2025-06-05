import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import PageHeader from "@/components/elements/page-header";

const META = {
    title: 'About Me',
    description: 'The most boring page on this website',
}

const AboutPage: NextPage = () => {
    return (
        <>
            <NextSeo title={`${META.title} - Matthew Javelet`} description={META.description}/>
            <PageHeader header={META.title} description={META.description}/>
        </>
    );
};

export default AboutPage;