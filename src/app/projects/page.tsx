import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Projects',
    description: 'The stuff that keeps me going',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
        </>
    );
};