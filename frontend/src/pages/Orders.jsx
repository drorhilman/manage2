import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useFirestore } from '../hooks/useFirestore';
import DataTable from '../components/common/DataTable';
import FormModal from '../components/common/FormModal';
import OrderForm from '../components/orders/OrderForm';
import { toaster } from '../components/ui/toaster';

const Orders = () => {
  const { data: orders, loading, error, add, update } = useFirestore('orders');
  const { data: customers } = useFirestore('customers');
  const { data: products } = useFirestore('products');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const customer = customers.find(c => c.id === formData.customerId);
      const product = products.find(p => p.id === formData.productId);
      
      const enrichedData = {
        ...formData,
        customerName: customer?.name,
        productName: product?.name,
        createdAt: new Date().toISOString()
      };

      if (selectedOrder) {
        await update(selectedOrder.id, enrichedData);
        toaster.success({
          title: 'Order updated successfully',
        });
      } else {
        await add(enrichedData);
        toaster.success({
          title: 'Order created successfully',
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

  const filteredOrders = orders.filter(order => {
    if (!dateFilter) return true;
    return order.date === dateFilter;
  });

  const columns = [
    { 
      key: 'customerName', 
      label: 'Customer',
    },
    { 
      key: 'productName', 
      label: 'Product',
    },
    { 
      key: 'quantity', 
      label: 'Quantity',
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (order) => new Date(order.date).toLocaleDateString()
    }
  ];

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex mb-4 gap-2">
        <div>
          <label>Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddOrder}>
          <FaPlus /> New Order
        </button>
      </div>

      <DataTable
        data={filteredOrders}
        columns={columns}
        loading={loading}
        emptyMessage="No orders found"
        onRowClick={handleEditOrder}
      />

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedOrder ? 'Edit Order' : 'New Order'}
        onSubmit={handleSubmit}
      >
        <OrderForm
          initialData={selectedOrder}
          onSubmit={handleSubmit}
        />
      </FormModal>
    </div>
  );
};

export default Orders;
