import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import PageHeader from "@/components/elements/page-header";
import Blog from "@/modules/blog";

const META = {
    title: 'Blog',
    description: 'A vast library of the most engaging literature you will ever find',
}

const BlogPage: NextPage = () => {
    return (
        <>
            <NextSeo title={`${META.title} - Matthew Javelet`} description={META.description}/>
            <PageHeader header={META.title} description={META.description}/>
            <Blog/>
        </>
    );
};

export default BlogPage;