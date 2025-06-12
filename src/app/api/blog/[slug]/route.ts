import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "@/services/firestore";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    const {slug} = await params

    let document = undefined;

    const q = query(
        collection(db, 'blog.posts'),
        where('slug', '==', slug)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        document = doc.data();
    });

    return Response.json(document)
}

export async function POST() {
    return Response.json({message: 'Success'})
}