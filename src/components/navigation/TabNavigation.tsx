import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, ShoppingCart, Box, BarChart2, Truck, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button"

const tabs = [
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Products', path: '/products', icon: Box },
  { name: 'Reports', path: '/reports', icon: BarChart2 },
  { name: 'Offers', path: '/offers', icon: Tag },
  { name: 'Job Descriptions', path: '/job-descriptions', icon: Truck },
];

const TabNavigation: React.FC = () => {
  return (
    <nav className="flex justify-center bg-background py-2 space-x-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-full ${
              isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'
            }`
          }
        >
          <Button variant="icon" className="p-2">
            <tab.icon className="w-6 h-6" />
          </Button>
        </NavLink>
      ))}
    </nav>
  );
};

export default TabNavigation;