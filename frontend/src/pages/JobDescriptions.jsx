import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const JobDescriptions = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [newJobDescription, setNewJobDescription] = useState('');

  const jobDescriptionsCollectionRef = collection(db, 'jobDescriptions');

  const getJobDescriptions = async () => {
    const data = await getDocs(jobDescriptionsCollectionRef);
    setJobDescriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const createJobDescription = async () => {
    await addDoc(jobDescriptionsCollectionRef, { description: newJobDescription });
    getJobDescriptions();
  };

  const updateJobDescription = async (id, updatedDescription) => {
    const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
    await updateDoc(jobDescriptionDoc, { description: updatedDescription });
    getJobDescriptions();
  };

  const deleteJobDescription = async (id) => {
    const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
    await deleteDoc(jobDescriptionDoc);
    getJobDescriptions();
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  return (
    <div>
      <h1>Job Descriptions</h1>
      <input
        type="text"
        placeholder="New Job Description"
        value={newJobDescription}
        onChange={(e) => setNewJobDescription(e.target.value)}
      />
      <button onClick={createJobDescription}>Add Job Description</button>
      <ul>
        {jobDescriptions.map((jobDescription) => (
          <li key={jobDescription.id}>
            <input
              type="text"
              value={jobDescription.description}
              onChange={(e) => updateJobDescription(jobDescription.id, e.target.value)}
            />
            <button onClick={() => deleteJobDescription(jobDescription.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobDescriptions;
