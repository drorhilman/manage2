import React, { useState, useEffect } from 'react';
import { Box, Button, Select, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, Spinner, useToast } from '@chakra-ui/react';
import { fetchOrders, fetchCustomers, fetchProducts, fetchJobDescriptions } from '../api'; // Assume these API functions are defined

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState('');
  const toast = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const ordersData = await fetchOrders();
        const customersData = await fetchCustomers();
        const productsData = await fetchProducts();
        const jobDescriptionsData = await fetchJobDescriptions();
        setOrders(ordersData);
        setCustomers(customersData);
        setProducts(productsData);
        setJobDescriptions(jobDescriptionsData);
      } catch (error) {
        toast({
          title: "Error loading data.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreateOrder = () => {
    // Logic to create a new order
    toast({
      title: "Order created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>Customer</FormLabel>
        <Select onChange={(e) => setSelectedCustomer(e.target.value)}>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Job Description</FormLabel>
        <Select onChange={(e) => setJobDescription(e.target.value)}>
          {jobDescriptions.map((job) => (
            <option key={job.id} value={job.id}>{job.description}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Product</FormLabel>
        <Select onChange={(e) => setSelectedProduct(e.target.value)}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </FormControl>
      <Button onClick={handleCreateOrder}>Create Order</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Job Description</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.customerName}</Td>
              <Td>{order.jobDescription}</Td>
              <Td>{order.productName}</Td>
              <Td>{order.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
      <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastOrder >= orders.length}>Next</Button>
    </Box>
  );
};

export default Orders;
