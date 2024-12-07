import React, { useState, useEffect } from 'react';
import { fetchReportsData } from '../api'; // Assume this API function is defined
import { toaster } from '../components/ui/toaster';

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const data = await fetchReportsData(dateRange, selectedCustomer);
        setReportsData(data);
      } catch (error) {
        toaster.error({
          title: "Error loading reports.",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, [dateRange, selectedCustomer]);

  const handleGenerateReport = () => {
    // Logic to generate report based on selected filters
    toaster.success({
      title: "Report generated.",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label>Date Range</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border rounded p-2"
        />
      </div>
      <div>
        <label>Customer</label>
        <select onChange={(e) => setSelectedCustomer(e.target.value)} className="border rounded p-2">
          {/* Options for customers will be populated here */}
        </select>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleGenerateReport}>
        Generate Report
      </button>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300">Customer</th>
            <th className="border border-gray-300">Product</th>
            <th className="border border-gray-300">Revenue</th>
            <th className="border border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <td className="border border-gray-300">{report.customerName}</td>
              <td className="border border-gray-300">{report.productName}</td>
              <td className="border border-gray-300">{report.revenue}</td>
              <td className="border border-gray-300">{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
