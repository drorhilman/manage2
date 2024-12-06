import React from 'react';
import { useToast } from '@chakra-ui/react';
import { auth, provider, signInWithPopup } from './firebase';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const Login = () => {
  const toast = useToast();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Login Successful",
        description: "You have logged in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter your email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Enter your password" />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>
        Login with Google
      </Button>
    </VStack>
  );
};

export default Login;
