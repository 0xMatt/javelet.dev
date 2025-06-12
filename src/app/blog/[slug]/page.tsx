import {headers} from "next/headers";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, Calendar, Eye, ThumbsUp} from "lucide-react";
import {BackgroundPattern} from "@/components/elements/background-pattern";
import {DateTime} from "luxon";


export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params;
    const headersList = await headers();
    const schema = headersList.get('x-forwarded-proto');
    const host = headersList.get('x-forwarded-host');
    const res = await fetch(`${schema}://${host}/api/blog/${slug}`);
    const post = await res.json();
    post.created_at = DateTime.fromISO(post.created_at).toLocaleString(DateTime.DATETIME_FULL);
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <BackgroundPattern/>
            <div className="relative z-10 text-center max-w-2xl">
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