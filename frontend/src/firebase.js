// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKuqZtCLaJsPWUDl5NlHqZCddhEwaL0EM",
  authDomain: "manage2-9bc11.firebaseapp.com",
  projectId: "manage2-9bc11",
  storageBucket: "manage2-9bc11.appspot.com",
  messagingSenderId: "909222182995",
  appId: "1:909222182995:web:f0b6d211a024b5630a06a6",
  measurementId: "G-94DCXVB7T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore as db };
