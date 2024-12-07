import { db } from '../firebase'; // Updated import path
import { collection, addDoc } from 'firebase/firestore';

const addDummyData = async () => {
  const customersCollection = collection(db, 'customers');
  const productsCollection = collection(db, 'products');
  const jobDescriptionsCollection = collection(db, 'jobDescriptions');

  const dummyCustomers = [
    { name: 'John Doe', businessName: 'Doe Enterprises' },
    { name: 'Jane Smith', businessName: 'Smith LLC' },
  ];

  const dummyProducts = [
    { name: 'Product A', price: 100, active: true },
    { name: 'Product B', price: 150, active: true },
  ];

  const dummyJobDescriptions = [
    { description: 'Software Engineer' },
    { description: 'Product Manager' },
  ];

  try {
    for (const customer of dummyCustomers) {
      await addDoc(customersCollection, customer);
    }

    for (const product of dummyProducts) {
      await addDoc(productsCollection, product);
    }

    for (const job of dummyJobDescriptions) {
      await addDoc(jobDescriptionsCollection, job);
    }

    console.log('Dummy data added successfully!');
  } catch (error) {
    console.error('Error adding dummy data:', error);
  }
};

addDummyData();
