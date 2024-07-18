// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaj3ivzVJCuAWExyNnsK92crUtXd0Yxmw",
  authDomain: "chatapp-e0454.firebaseapp.com",
  projectId: "chatapp-e0454",
  storageBucket: "chatapp-e0454.appspot.com",
  messagingSenderId: "728304272487",
  appId: "1:728304272487:web:436b661657ad3472d8c0c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);