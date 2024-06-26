// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEv0K3mrs4hXygXICPniJR4AT4EWpHAy0",
    authDomain: "nwitter-reloaded-6f8bd.firebaseapp.com",
    projectId: "nwitter-reloaded-6f8bd",
    storageBucket: "nwitter-reloaded-6f8bd.appspot.com",
    messagingSenderId: "468038383363",
    appId: "1:468038383363:web:2188dbabcdd695dfea5b36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);