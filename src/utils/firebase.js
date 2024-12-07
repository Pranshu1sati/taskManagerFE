// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-fafd4.firebaseapp.com",
  projectId: "taskmanager-fafd4",
  storageBucket: "taskmanager-fafd4.firebasestorage.app",
  messagingSenderId: "717065227510",
  appId: "1:717065227510:web:272e301c7dc78c37ca30d7",
  measurementId: "G-KNM69MQEDV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
