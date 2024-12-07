
import React from 'react';
import { auth } from '../../../lib/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '../../../components/ui/button';

const GoogleSignInButton: React.FC = () => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Sign in error', error);
    }
  };

  return (
    <Button onClick={handleSignIn} variant="primary">
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;