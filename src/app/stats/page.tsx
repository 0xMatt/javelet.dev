import PageHeader from "@/components/elements/page-header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Stats',
    description: 'Gamifying labor like my sanity depends on it',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
        </>
    );
};