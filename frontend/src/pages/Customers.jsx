import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Flex, List, ListItem, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl,
  FormLabel, useDisclosure, IconButton
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { firestore } from '../firebase';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch customers from Firestore
    const unsubscribe = firestore.collection('customers').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    onOpen();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Flex mb={4}>
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button leftIcon={<AddIcon />} ml={2} onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </Flex>
      <List spacing={3}>
        {filteredCustomers.map(customer => (
          <ListItem key={customer.id} p={2} borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box>
                <Box fontWeight="bold">{customer.name}</Box>
                <Box fontSize="sm">{customer.businessName}</Box>
              </Box>
              <IconButton
                icon={<EditIcon />}
                onClick={() => handleEditCustomer(customer)}
                aria-label="Edit Customer"
              />
            </Flex>
          </ListItem>
        ))}
      </List>

      <CustomerModal
        isOpen={isOpen}
        onClose={onClose}
        customer={selectedCustomer}
      />
    </Box>
  );
}

function CustomerModal({ isOpen, onClose, customer }) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  // ...existing code for contacts and addresses...

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setBusinessName(customer.businessName);
      // ...set contacts and addresses...
    } else {
      setName('');
      setBusinessName('');
      // ...reset contacts and addresses...
    }
  }, [customer]);

  const handleSave = async () => {
    const customerData = {
      name,
      businessName,
      // ...contacts and addresses...
    };

    if (customer) {
      // Update existing customer
      await firestore.collection('customers').doc(customer.id).update(customerData);
    } else {
      // Add new customer
      await firestore.collection('customers').add(customerData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* ...existing code... */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{customer ? 'Edit Customer' : 'Add Customer'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="businessName" mb={4}>
            <FormLabel>Business Name</FormLabel>
            <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </FormControl>
          {/* Add form controls for contacts and addresses */}
          {/* ...existing code... */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Customers;
