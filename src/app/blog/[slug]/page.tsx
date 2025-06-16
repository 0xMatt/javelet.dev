import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, Calendar, Eye, ThumbsUp} from "lucide-react";
import {DateTime} from "luxon";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {cn} from "@/lib/utils";
import {updateViews} from "@/services/internal/blog";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params;
    //const headersList = await headers();
    //const schema = headersList.get('x-forwarded-proto');
    //const host = headersList.get('x-forwarded-host');
    const res = await fetch(`/api/blog/${slug}`);
    const post = await res.json();

    await updateViews(slug);
    post.created_at = DateTime.fromISO(post.created_at).toLocaleString(DateTime.DATETIME_FULL);
    return (
        <div className="w-full">

            <div className="p-10 relative z-10 text-center">
                <AnimatedGridPattern
                    numSquares={50}
                    maxOpacity={0.1}
                    duration={3}
                    className={cn(
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "inset-x-0 h-full"
                    )}
                />

                <div
                    className="line-clamp-1 flex gap-2 font-medium justify-center">
                    <Badge
                        className="py-1 border-none">
                        <Calendar/> {post.created_at}
                    </Badge>
                    <Badge
                        className="py-1 border-none">
                        <Eye/> {post.views}
                    </Badge>
                </div>
                <h1 className="mt-6 text-2xl sm:text-2xl md:text-2xl font-bold !leading-[1.2] tracking-tight">
                    {post.title}
                </h1>
                <p className="mt-6 text-[17px] md:text-lg">
                    {post.summary}
                </p>
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Button variant={"link"}>
                        Share <ArrowUpRight className="!h-5 !w-5"/>
                    </Button>
                    <Button variant={"outline"}>
                        <ThumbsUp className="!h-5 !w-5"/> Rate
                    </Button>
                </div>
            </div>
        </div>


    )
}