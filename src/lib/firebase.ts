import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXCNcnn-TOi-7ck1nRdL9LhyTUmV5EHZg",
    authDomain: "bishalportfolio-91978.firebaseapp.com",
    projectId: "bishalportfolio-91978",
    storageBucket: "bishalportfolio-91978.firebasestorage.app",
    messagingSenderId: "474814187777",
    appId: "1:474814187777:web:46ef57e01a434e4ae87300",
    measurementId: "G-E1QBLT1QKB"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics (Client-side only)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

// Initialize Firestore
export const db = getFirestore(app);