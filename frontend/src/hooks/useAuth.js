import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
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

    // Temporary bypass for development mode
    if (process.env.NODE_ENV === 'development') {
        console.log('Development mode detected. Bypassing authentication.');
      const mockUser = {
        uid: 'mockUserId',
        displayName: 'Mock User',
        email: 'mockuser@example.com',
      };
      setUser(mockUser);
      setIsWhitelisted(true); // Assume the mock user is whitelisted
    }

    return () => unsubscribe();
  }, []);

  return { user, isWhitelisted };
}
