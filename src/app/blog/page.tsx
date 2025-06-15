import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";
import BlogCarousel from "@/app/blog/_components/blog-carousel";
import SectionTitle from "@/components/elements/section-title";
import Articles from "@/app/(home)/_components/articles";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A vast library of the most engaging literature you will ever find',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
            <BlogCarousel/>
            <SectionTitle title="Recent Articles"/>
            <Articles/>
        </>
    );
};