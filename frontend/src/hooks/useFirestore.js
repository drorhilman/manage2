import { useState, useEffect } from 'react';
import { db } from '../firebase';

export const useFirestore = (collection) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection(collection)
      .onSnapshot(
        snapshot => {
          const fetchedData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(fetchedData);
          setLoading(false);
        },
        err => {
          setError(err);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [collection]);

  const add = async (item) => {
    try {
      return await db.collection(collection).add(item);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const update = async (id, item) => {
    try {
      await db.collection(collection).doc(id).update(item);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await db.collection(collection).doc(id).delete();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove
  };
};
