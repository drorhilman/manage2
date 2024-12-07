import React from 'react';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;