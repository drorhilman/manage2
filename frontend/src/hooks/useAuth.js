
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().whitelisted) {
          setIsWhitelisted(true);
        } else {
          setIsWhitelisted(false);
          auth.signOut();
        }
        setUser(user);
      } else {
        setUser(null);
        setIsWhitelisted(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isWhitelisted };
}