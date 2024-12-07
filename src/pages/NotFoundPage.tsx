import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link 
          to="/"
          className="inline-block text-primary hover:underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export { NotFoundPage };
