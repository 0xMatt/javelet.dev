import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, ChevronRight, Eye, Hash} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BlogItem} from "@/types/blog";
import {truncateText} from "@/lib/utils";

export default function BlogCard({post: post}: { post: BlogItem }) {
    return (
        <Card key={post.slug}
              className="p-0 gap-2 shadow-none overflow-hidden rounded-md dark:border-neutral-700 hover:scale-102 transition-all duration-300">
            <CardHeader className="p-0 relative">
                <div className="aspect-video bg-muted w-full border-b"/>
                <div
                    className="line-clamp-1 flex gap-2 font-medium top-2 left-2 absolute">
                    {post.tags.map((tag) => (
                        <Badge variant="default" key={tag}>
                            <Hash/>
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div
                    className="line-clamp-1 flex gap-2 font-medium bottom-4 right-2 absolute">
                    <Badge variant="default">
                        <Calendar/>
                        {post.created_at}
                    </Badge>
                    <Badge variant="default">
                        <Eye/>
                        {post.views}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="py-0 my-0 px-4">
                <h3 className="mt-0 text-lg font-semibold tracking-tight">
                    <Link href={`/blog/${post.id}`}
                          className="hover:underline">{post.title}</Link>
                </h3>
                <p className="mt-2 text-muted-foreground text-sm">
                    {truncateText(post.summary, 120)}
                </p>

            </CardContent>
            <CardFooter className="py-5 px-4">
                <Link href={`/blog/${post.id}`}><Button className="cursor-pointer m-0 p-0 shadow-none">
                    5 minute read <ChevronRight/>
                </Button></Link>
            </CardFooter>
        </Card>
    )
}