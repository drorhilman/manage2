import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomersPage from '../pages/CustomersPage';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';
import OffersPage from '../pages/OffersPage';
import ReportsPage from '../pages/ReportsPage';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/customers" replace />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  );
};

export default MainRouter;
