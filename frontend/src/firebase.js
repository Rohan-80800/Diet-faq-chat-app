import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodingo-2d6d5.firebaseapp.com",
  projectId: "foodingo-2d6d5",
  storageBucket: "foodingo-2d6d5.firebasestorage.app",
  messagingSenderId: "1068414757244",
  appId: "1:1068414757244:web:1213c6a0ef124e4f075cf9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
