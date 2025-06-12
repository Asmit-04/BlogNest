import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: getEvn('VITE_FIREBASE_API'),
  authDomain: "blog-app-b63c0.firebaseapp.com",
  projectId: "blog-app-b63c0",
  storageBucket: "blog-app-b63c0.firebasestorage.app",
  messagingSenderId: "964727679869",
  appId: "1:964727679869:web:60aff3516ef8fd74b27a14"
};










// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }