import {
    getFirestoreData,
    getFirestoreDoc,
    getFirestoreRef,
    setFirestoreDoc,
    updateFirestoreDoc
} from "@/services/firestore";
import {BlogItem} from "@/types/blog";
import {increment} from "@firebase/firestore";
import {slugify} from "@/lib/slugify";

export const getList = () => {
    return getFirestoreData('blog.posts');
}

export const createPost = (post: BlogItem) => {
    setFirestoreDoc('blog.posts', slugify(post.title), post);
}

export async function updateViews(id: string) {
    const ref = getFirestoreRef('blog.posts', id);
    const doc = await getFirestoreDoc(ref);
    if (doc.exists()) {
        await updateFirestoreDoc(ref, {
            views: increment(1)
        });
        return true;
    }
    return false;
}