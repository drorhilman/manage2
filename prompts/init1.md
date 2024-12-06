

Required External Information :

	1.	GitHub Repository URL:
https://github.com/drorhilman/manage2
	2.	Firebase Project:
	•	Project name: manage2
	•	Project ID: manage2-9bc11
	•	Firebase app unique identifier: manage2-9bc11
	3.	Firebase Credentials:
allowed email currently: drorhilman@gmail.com.

Goal: Setup a modern Firebase application integrating Authentication with Google (restricted to a whitelist), Realtime Database (if needed), Functions, Hosting, and Storage, using the provided Firebase configuration and GitHub repository. The frontend should be built with React and Vite. The agent should run as many steps as possible from the command line using Firebase CLI and GitHub CLI (or standard Git commands).

Instructions:
	1.	Pre-requisites & Setup
	•	Ensure Node.js (v16+) and npm are installed:

node -v
npm -v


	•	Install the Firebase CLI:

npm install -g firebase-tools


	•	Login to Firebase:

firebase login


	•	Ensure you have permissions on the manage2-9bc11 Firebase project.
	•	Ensure you have Git set up locally and can push to https://github.com/drorhilman/manage2.

	2.	Initialize Local Workspace & Connect to GitHub
	•	Create and navigate into your project directory:

mkdir manage2
cd manage2


	•	Initialize a Git repository and add the remote:

git init
git remote add origin https://github.com/drorhilman/manage2


	3.	Setup React Frontend with Vite
	•	Create a React app using Vite:

npm create vite@latest frontend -- --template react


	•	Navigate into frontend and install dependencies:

cd frontend
npm install
cd ..


	4.	Initialize Firebase in the Project
	•	From the root directory:

firebase init


	•	Select:
	•	Hosting: for Firebase Hosting setup.
	•	Functions: for Cloud Functions.
	•	Emulators: choose Hosting, Functions, Authentication (if supported), Realtime Database if you intend to use it, and possibly Storage emulator if needed.
	•	Firestore or Realtime Database: If you need a database, choose Realtime Database. Otherwise skip this if not required.
	•	For Hosting, set frontend/dist as the public directory (the Vite build output).
	•	Mark the app as a single-page app when prompted.
	•	For Functions, choose JavaScript or TypeScript as you prefer and install dependencies.
	•	If prompted, select your existing project: manage2-9bc11.

	5.	Configure Firebase in React
	•	Create frontend/src/firebase.js:

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Add other services like getDatabase, getFunctions if needed

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


	•	In your React components, implement a login flow that uses signInWithPopup(auth, provider) and then check if the returned user’s email is on the whitelist. If not, log them out or deny access.

	6.	Configure Authentication & Whitelist
	•	In the Firebase console, enable Google as a sign-in provider (Build > Authentication > Sign-in method).
	•	Add authorized domains to the Firebase Authentication settings (ensure manage2-9bc11.firebaseapp.com and localhost are allowed).
	•	To enforce a whitelist, you have two main approaches:
	1.	Client-side Check: After sign-in, check user.email against a known set of allowed emails. If not allowed, sign them out immediately or restrict app features.
	2.	Security Rules / Functions:
Use a Cloud Function to verify on sign-in or use Realtime Database/Firestore rules to only allow reads/writes if request.auth.token.email is in an allowed list. You can store the allowed emails in a secure location (like Firestore or Functions config) and check them server-side.
Example of a client-side check:

const allowedEmails = ["allowedUser@example.com"];
// After sign-in:
if (!allowedEmails.includes(user.email)) {
  // Handle unauthorized user
  auth.signOut();
  alert("You are not authorized to use this application.");
}


	7.	Setup Functions (Optional)
	•	In functions/index.js (or functions/src/index.ts if using TypeScript):

const functions = require("firebase-functions");
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase Functions!");
});


	•	Add logic as needed to support server-side checks or additional functionality.

	8.	Set Up Storage
	•	Storage is enabled by default. Use getStorage(app) in firebase.js.
	•	In the Firebase console, ensure Storage security rules are configured to allow only authorized users to upload if needed.
	9.	Local Development
	•	Start the Firebase Emulator Suite:

firebase emulators:start


	•	In another terminal, start the Vite dev server:

cd frontend
npm run dev


	•	Test authentication locally. Note: The Auth emulator supports Google sign-in via a testing interface. If you need real sign-ins, you may have to test in production mode or use a custom auth approach in emulation.

	10.	Build & Deploy
	•	Build the frontend:

cd frontend
npm run build
cd ..


	•	Deploy hosting and functions:

firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only storage


	•	If using Realtime Database rules:

firebase deploy --only database


Check the live site at https://manage2-9bc11.web.app or https://manage2-9bc11.firebaseapp.com (whichever domain Firebase provides).

	11.	Continuous Integration with GitHub Actions
	•	Set up GitHub Actions for Firebase Hosting:

firebase init hosting:github


	•	Follow prompts to connect your GitHub repo https://github.com/drorhilman/manage2.
	•	After completing setup, push code to GitHub:

git add .
git commit -m "Initial commit with Firebase setup and auth"
git push -u origin main


	•	On pushes or PR merges, GitHub Actions will run and deploy your app automatically.

	12.	Best Practices & Verification
	•	Verify that only whitelisted emails can access functionality.
	•	Check that Storage, Hosting, and Functions are working as intended.
	•	Confirm CI/CD pipeline triggers on GitHub push events.
	•	Secure your rules and deployment tokens as needed.
