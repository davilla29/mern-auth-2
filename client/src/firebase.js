// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a5ede.firebaseapp.com",
  projectId: "mern-auth-a5ede",
  storageBucket: "mern-auth-a5ede.firebasestorage.app",
  messagingSenderId: "573818976090",
  appId: "1:573818976090:web:77dce282a73851890c6563",
  measurementId: "G-JYVRC2811S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
