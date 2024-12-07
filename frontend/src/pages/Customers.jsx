import React, { useState } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { useFirestore } from '../hooks/useFirestore';
import DataTable from '../components/common/DataTable';
import FormModal from '../components/common/FormModal';
import CustomerForm from '../components/customers/CustomerForm';
import { toaster } from '../components/ui/toaster';

function Customers() {
  const { data: customers, loading, error, add, update } = useFirestore('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCustomer) {
        await update(selectedCustomer.id, formData);
        toaster.success({
          title: 'Customer updated successfully',
        });
      } else {
        await add(formData);
        toaster.success({
          title: 'Customer added successfully',
        });
      }
      setIsOpen(false);
    } catch (err) {
      toaster.error({
        title: 'Error',
        description: err.message,
      });
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'businessName', label: 'Business Name' },
  ];

  const renderActions = (customer) => (
    <button
      className="bg-yellow-500 text-white p-1 rounded"
      onClick={() => handleEditCustomer(customer)}
      aria-label="Edit Customer"
    >
      <FaEdit />
    </button>
  );

  if (error) {
    return <div>Error loading customers: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex mb-4 gap-2">
        <input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddCustomer}>
          <FaPlus /> Add Customer
        </button>
      </div>

      <DataTable
        data={filteredCustomers}
        columns={columns}
        actions={renderActions}
        loading={loading}
        emptyMessage="No customers found"
      />

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}
        onSubmit={handleSubmit}
      >
        <CustomerForm
          initialData={selectedCustomer}
          onSubmit={handleSubmit}
        />
      </FormModal>
    </div>
  );
}

export default Customers;
