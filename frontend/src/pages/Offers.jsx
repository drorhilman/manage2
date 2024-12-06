import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Spinner, useToast } from '@chakra-ui/react';
import { fetchOffers, createOffer, updateOffer, deleteOffer } from '../api'; // Assume these API functions are defined

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [offerDetails, setOfferDetails] = useState({ description: '', applicableCustomers: [] });
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      try {
        const offersData = await fetchOffers();
        setOffers(offersData);
      } catch (error) {
        toast({
          title: "Error loading offers.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  const handleCreateOrUpdateOffer = async () => {
    try {
      if (editingOfferId) {
        await updateOffer(editingOfferId, offerDetails);
      } else {
        await createOffer(offerDetails);
      }
      setOfferDetails({ description: '', applicableCustomers: [] });
      setEditingOfferId(null);
      const offersData = await fetchOffers();
      setOffers(offersData);
      toast({
        title: "Offer saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving offer.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditOffer = (offer) => {
    setOfferDetails({ description: offer.description, applicableCustomers: offer.applicableCustomers });
    setEditingOfferId(offer.id);
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteOffer(offerId);
      const offersData = await fetchOffers();
      setOffers(offersData);
      toast({
        title: "Offer deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting offer.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Input
        placeholder="Offer Description"
        value={offerDetails.description}
        onChange={(e) => setOfferDetails({ ...offerDetails, description: e.target.value })}
      />
      <Button onClick={handleCreateOrUpdateOffer}>
        {editingOfferId ? 'Update Offer' : 'Create Offer'}
      </Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Applicable Customers</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {offers.map((offer) => (
            <Tr key={offer.id}>
              <Td>{offer.description}</Td>
              <Td>{offer.applicableCustomers.join(', ')}</Td>
              <Td>
                <Button onClick={() => handleEditOffer(offer)}>Edit</Button>
                <Button onClick={() => handleDeleteOffer(offer.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Offers;
