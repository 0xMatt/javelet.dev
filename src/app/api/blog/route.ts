import {collection, DocumentData, getDocs, limit, orderBy, query} from "@firebase/firestore";
import {db} from "@/services/firestore";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const data: DocumentData[] = [];

    const q = query(
        collection(db, 'blog.posts'),
        orderBy("created_at", "desc"),
        limit(Number(searchParams.get('perPage')) || 10),
        // startAt(1),
        // endAt(1000)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        data.push(document);
    });

    return Response.json(data)
}

export async function POST() {
    return Response.json({message: 'Success'})
}