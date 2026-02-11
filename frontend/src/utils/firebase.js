// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ainotesgenerator-fafa7.firebaseapp.com",
  projectId: "ainotesgenerator-fafa7",
  storageBucket: "ainotesgenerator-fafa7.firebasestorage.app",
  messagingSenderId: "866489295438",
  appId: "1:866489295438:web:5f2ffdadabaa6c8289991f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

