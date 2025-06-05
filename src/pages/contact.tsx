import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Contact from '@/modules/contact';
import PageHeader from "@/components/elements/page-header";

const META = {
    title: 'Contact',
    description: 'Stalk me, please...I am so lonely',
}

const ContactPage: NextPage = () => {
    return (
        <>
            <NextSeo title={`${META.title} - Matthew Javelet`} />
            <PageHeader header={META.title} description={META.description}/>
            <Contact />
        </>
    );
};

export default ContactPage;