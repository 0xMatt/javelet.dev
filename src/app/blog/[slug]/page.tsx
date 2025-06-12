import {headers} from "next/headers";

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
    const data = await res.json();
    return <div>My Post: {data.slug}</div>
}