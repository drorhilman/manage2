import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

const OrderForm = ({ initialData, onSubmit }) => {
  const { data: customers } = useFirestore('customers');
  const { data: products } = useFirestore('products');
  const { data: jobDescriptions } = useFirestore('jobDescriptions');

  const [formData, setFormData] = useState({
    customerId: '',
    productId: '',
    jobDescriptionId: '',
    quantity: 1,
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerId: initialData.customerId || '',
        productId: initialData.productId || '',
        jobDescriptionId: initialData.jobDescriptionId || '',
        quantity: initialData.quantity || 1,
        date: initialData.date || new Date().toISOString().split('T')[0]
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
        <label className="block text-sm font-medium">Customer</label>
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Job Description</label>
        <select
          name="jobDescriptionId"
          value={formData.jobDescriptionId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select job description</option>
          {jobDescriptions.map((job) => (
            <option key={job.id} value={job.id}>
              {job.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          name="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
    </form>
  );
};

export default OrderForm;
