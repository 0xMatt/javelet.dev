import {addFirestoreData, getFirestoreData} from "@/services/firestore";
import {BlogItem} from "@/types/blog";

export const getList = () => {
    return getFirestoreData('blog.posts');
}

export const createPost = (post: BlogItem) => {
    addFirestoreData('blog.posts', post);
}