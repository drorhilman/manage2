import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKuqZtCLaJsPWUDl5NlHqZCddhEwaL0EM",
  authDomain: "manage2-9bc11.firebaseapp.com",
  projectId: "manage2-9bc11",
  storageBucket: "manage2-9bc11.firebasestorage.app",
  messagingSenderId: "909222182995",
  appId: "1:909222182995:web:f0b6d211a024b5630a06a6",
  measurementId: "G-94DCXVB7T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, storage };
