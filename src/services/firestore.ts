import {initializeApp} from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import {addDoc, collection, DocumentData, Firestore, getDocs, getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

let analytics: Analytics;
let firestore: Firestore;
let db: Firestore;
if (firebaseConfig?.projectId) {
    const app = initializeApp(firebaseConfig);

    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }

    firestore = getFirestore();
    db = getFirestore(app);
}

export {analytics, firestore, db};

export async function addFirestoreData(table: string, document: DocumentData) {
    return await addDoc(collection(db, table), document);
}

export async function getFirestoreData(table: string) {
    return await getDocs(collection(db, table));
}