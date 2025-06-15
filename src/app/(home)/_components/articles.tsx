"use client"

import SectionTitle from "@/components/elements/section-title";
import useSWR from 'swr';
import {BlogItem} from "@/types/blog";
import {DateTime} from "luxon";
import BlogCard from "@/app/blog/_components/blog-card";
import {fetcher} from "@/lib/fetcher";

export default function Articles() {

    const {data} = useSWR(`/api/blog?page=1&per_page=4`, fetcher);
    if (!data) return <div>Loading...</div>

    data.forEach((post: BlogItem) => {
        const days = DateTime.now().diff(DateTime.fromISO(post.created_at), 'days');
        if (days.as('days')) {
            post.created_at = DateTime.now().minus({days: days.as('days')}).toRelative() || ''
        }
    })

    return (
        <section>
            <SectionTitle title="Latest Articles" link={{text: 'View All', href: 'blog'}}/>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
                {data.map((post: BlogItem) => (
                    <BlogCard key={post.slug} post={post}/>
                ))}

            </div>
        </section>
    );
};