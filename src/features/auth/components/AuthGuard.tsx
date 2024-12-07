import React, { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../../../lib/firebase/config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (loading) return;
      if (!user) {
        navigate('/auth');
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          auth.signOut();
          navigate('/auth');
        }
      }
    };
    checkAuth();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthGuard;