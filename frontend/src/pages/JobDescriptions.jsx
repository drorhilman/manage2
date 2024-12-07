import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toaster } from '../components/ui/toaster';

const JobDescriptions = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [newJobDescription, setNewJobDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const jobDescriptionsCollectionRef = collection(db, 'jobDescriptions');

  const getJobDescriptions = async () => {
    setLoading(true);
    try {
      const data = await getDocs(jobDescriptionsCollectionRef);
      setJobDescriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      toaster.error({
        title: "Error loading job descriptions.",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const createJobDescription = async () => {
    try {
      await addDoc(jobDescriptionsCollectionRef, { description: newJobDescription });
      getJobDescriptions();
      toaster.success({
        title: "Job description added.",
      });
    } catch (error) {
      toaster.error({
        title: "Error adding job description.",
        description: error.message,
      });
    }
  };

  const updateJobDescription = async (id, updatedDescription) => {
    try {
      const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
      await updateDoc(jobDescriptionDoc, { description: updatedDescription });
      getJobDescriptions();
      toaster.success({
        title: "Job description updated.",
      });
    } catch (error) {
      toaster.error({
        title: "Error updating job description.",
        description: error.message,
      });
    }
  };

  const deleteJobDescription = async (id) => {
    try {
      const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
      await deleteDoc(jobDescriptionDoc);
      getJobDescriptions();
      toaster.success({
        title: "Job description deleted.",
      });
    } catch (error) {
      toaster.error({
        title: "Error deleting job description.",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Job Descriptions</h1>
      <div>
        <label>New Job Description</label>
        <input
          placeholder="New Job Description"
          value={newJobDescription}
          onChange={(e) => setNewJobDescription(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={createJobDescription}>Add Job Description</button>
      <ul>
        {jobDescriptions.map((jobDescription) => (
          <li key={jobDescription.id} className="flex items-center justify-between">
            <input
              value={jobDescription.description}
              onChange={(e) => updateJobDescription(jobDescription.id, e.target.value)}
              className="border rounded p-2 flex-1"
            />
            <button className="bg-red-500 text-white p-1 rounded ml-2" onClick={() => deleteJobDescription(jobDescription.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobDescriptions;
