import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A vast library of the most engaging literature you will ever find',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
        </>
    );
};