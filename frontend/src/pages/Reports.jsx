import React, { useState, useEffect } from 'react';
import { Box, Button, Select, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, Spinner, useToast } from '@chakra-ui/react';
import { fetchReportsData } from '../api'; // Assume this API function is defined

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const data = await fetchReportsData(dateRange, selectedCustomer);
        setReportsData(data);
      } catch (error) {
        toast({
          title: "Error loading reports.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, [dateRange, selectedCustomer]);

  const handleGenerateReport = () => {
    // Logic to generate report based on selected filters
    toast({
      title: "Report generated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>Date Range</FormLabel>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Customer</FormLabel>
        <Select onChange={(e) => setSelectedCustomer(e.target.value)}>
          {/* Options for customers will be populated here */}
        </Select>
      </FormControl>
      <Button onClick={handleGenerateReport}>Generate Report</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Product</Th>
            <Th>Revenue</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportsData.map((report) => (
            <Tr key={report.id}>
              <Td>{report.customerName}</Td>
              <Td>{report.productName}</Td>
              <Td>{report.revenue}</Td>
              <Td>{report.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Reports;
