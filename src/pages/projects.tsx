import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import PageHeader from "@/components/elements/page-header";

const META = {
    title: 'Projects',
    description: 'The stuff that keeps me going',
}

const ProjectsPage: NextPage = () => {
    return (
        <>
            <NextSeo title={`${META.title} - Matthew Javelet`} description={META.description}/>
            <PageHeader header={META.title} description={META.description}/>
        </>
    );
};

export default ProjectsPage;