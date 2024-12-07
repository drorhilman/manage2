import React, { useEffect, useState } from 'react';

const CustomerForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        businessName: initialData.businessName || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter customer name"
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Business Name</label>
        <input
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Enter business name"
          className="border rounded p-2 w-full"
        />
      </div>
    </form>
  );
};

export default CustomerForm;
