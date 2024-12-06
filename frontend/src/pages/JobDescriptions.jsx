import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Box, Button, Input, Heading, List, ListItem, Spinner, useToast } from '@chakra-ui/react';

const JobDescriptions = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [newJobDescription, setNewJobDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const jobDescriptionsCollectionRef = collection(db, 'jobDescriptions');

  const getJobDescriptions = async () => {
    setLoading(true);
    try {
      const data = await getDocs(jobDescriptionsCollectionRef);
      setJobDescriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      toast({
        title: "Error loading job descriptions.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createJobDescription = async () => {
    try {
      await addDoc(jobDescriptionsCollectionRef, { description: newJobDescription });
      getJobDescriptions();
      toast({
        title: "Job description added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding job description.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateJobDescription = async (id, updatedDescription) => {
    try {
      const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
      await updateDoc(jobDescriptionDoc, { description: updatedDescription });
      getJobDescriptions();
      toast({
        title: "Job description updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating job description.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteJobDescription = async (id) => {
    try {
      const jobDescriptionDoc = doc(db, 'jobDescriptions', id);
      await deleteDoc(jobDescriptionDoc);
      getJobDescriptions();
      toast({
        title: "Job description deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting job description.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>Job Descriptions</Heading>
      <Input
        placeholder="New Job Description"
        value={newJobDescription}
        onChange={(e) => setNewJobDescription(e.target.value)}
      />
      <Button onClick={createJobDescription}>Add Job Description</Button>
      <List>
        {jobDescriptions.map((jobDescription) => (
          <ListItem key={jobDescription.id}>
            <Input
              value={jobDescription.description}
              onChange={(e) => updateJobDescription(jobDescription.id, e.target.value)}
            />
            <Button onClick={() => deleteJobDescription(jobDescription.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default JobDescriptions;
