import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authexamnotes-4bbee.firebaseapp.com",
  projectId: "authexamnotes-4bbee",
  storageBucket: "authexamnotes-4bbee.firebasestorage.app",
  messagingSenderId: "126652355221",
  appId: "1:126652355221:web:e292d339f897d68ea9019c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}