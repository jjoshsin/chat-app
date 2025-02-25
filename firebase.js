import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPQUJHMpOuAE0fGuOP4uIl-VTX9llLqAE",
    authDomain: "chat-app-98f63.firebaseapp.com",
    projectId: "chat-app-98f63",
    storageBucket: "chat-app-98f63.firebasestorage.app",
    messagingSenderId: "37804043816",
    appId: "1:37804043816:web:536b4df24caa1146618f1d",
    measurementId: "G-8PW5QZHGD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);