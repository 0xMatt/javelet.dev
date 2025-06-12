import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'About Me',
    description: 'The most boring page on this website',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
        </>
    );
};