import { NextPage } from 'next';
import {Separator} from "@/components/ui/separator";


const Custom404: NextPage = () => {
    return (
        <div
            className='flex h-full flex-col items-center justify-center space-y-5 py-40 md:py-20'
        >
            <div>
                <div className="space-y-1">
                    <h4 className=" animate-pulse text-sm leading-none font-medium">404</h4>
                    <Separator className={"mt-2"}/>
                    <p className="text-muted-foreground text-sm">
                        No page for you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Custom404;