import {getFirestoreDoc, getFirestoreRef} from "@/services/firestore";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    const {slug} = await params

    const ref = getFirestoreRef('blog.posts', slug);
    const doc = await getFirestoreDoc(ref);

    if (doc.exists()) {
        return Response.json(doc.data())
    } else {
        // docSnap.data() will be undefined in this case
        return Response.error();
    }

    return Response.json(await getFirestoreDoc(ref))
}

export async function POST() {
    return Response.json({message: 'Success'})
}