import React, { useState, useEffect } from 'react';
import { fetchOffers, createOffer, updateOffer, deleteOffer } from '../api'; // Assume these API functions are defined
import { toaster } from '../components/ui/toaster';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [offerDetails, setOfferDetails] = useState({ description: '', applicableCustomers: [] });
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      try {
        const offersData = await fetchOffers();
        setOffers(offersData);
      } catch (error) {
        toaster.error({
          title: "Error loading offers.",
          description: error.message,
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
      toaster.success({
        title: "Offer saved.",
      });
    } catch (error) {
      toaster.error({
        title: "Error saving offer.",
        description: error.message,
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
      toaster.success({
        title: "Offer deleted.",
      });
    } catch (error) {
      toaster.error({
        title: "Error deleting offer.",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label>Description</label>
        <input
          placeholder="Offer Description"
          value={offerDetails.description}
          onChange={(e) => setOfferDetails({ ...offerDetails, description: e.target.value })}
          className="border rounded p-2"
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCreateOrUpdateOffer}>
        {editingOfferId ? 'Update Offer' : 'Create Offer'}
      </button>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300">Description</th>
            <th className="border border-gray-300">Applicable Customers</th>
            <th className="border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="border border-gray-300">{offer.description}</td>
              <td className="border border-gray-300">{offer.applicableCustomers.join(', ')}</td>
              <td className="border border-gray-300">
                <button className="bg-yellow-500 text-white p-1 rounded" onClick={() => handleEditOffer(offer)}>Edit</button>
                <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
