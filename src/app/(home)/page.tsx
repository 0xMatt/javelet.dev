import Intro from "@/app/(home)/_components/intro";
import Stats from "@/app/(home)/_components/stats";
import Articles from "@/app/(home)/_components/articles";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Matthew Javelet',
    description: 'Personal blog divulging my ramblings, projects & information',
}

export default function Page() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Intro/>
                <Stats/>
                <Articles/>
            </div>
        </>
    );
};