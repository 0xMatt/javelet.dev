import Intro from "@/modules/home/components/intro";
import Articles from "@/modules/home/components/articles";
import Stats from "@/modules/home/components/stats";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";

const Home = () => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

                <Intro/>
                <div className="border-sidebar-border/90 dark:border-sidebar-border relative h-10 overflow-hidden rounded-xl border hover:scale-101">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-500/20 dark:stroke-neutral-100/20" />
                </div>
                <Stats/>
                <Articles/>
            </div>
        </>

    );
};

export default Home;