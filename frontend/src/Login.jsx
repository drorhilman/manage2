import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { auth } from './firebase';
import firebase from 'firebase/app';

function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Center height="100vh" flexDirection="column">
      <Text fontSize="2xl" mb={4}>Sign in to Business Management</Text>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </Center>
  );
}

export default Login;
