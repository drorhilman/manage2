import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/navigation/Header';

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
