import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import ContactForm from "./components/form";
import Meet from "@/app/contact/components/meet";
import Social from "@/app/contact/components/social";
import {Metadata} from "next";
import PageHeader from "@/components/elements/page-header";

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Plenty of ways to get in touch',
}

export default function Page() {
    return (
        <>
            <PageHeader header={metadata.title?.toString()} description={metadata.description}/>
            <Social/>
            <div
                className="border-sidebar-border/90 dark:border-sidebar-border relative h-5 overflow-hidden rounded-xl border hover:scale-101">
                <PlaceholderPattern
                    className="absolute inset-0 size-full stroke-neutral-400/20 dark:stroke-neutral-100/20"/>
            </div>
            <Meet/>
            <div
                className="border-sidebar-border/90 dark:border-sidebar-border relative h-5 overflow-hidden rounded-xl border hover:scale-101">
                <PlaceholderPattern
                    className="absolute inset-0 size-full stroke-neutral-400/20 dark:stroke-neutral-100/20"/>
            </div>
            <ContactForm/>
        </>
    );
};