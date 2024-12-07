import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Login() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl mb-4">Sign in to Business Management</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
