import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthPage } from '../pages/AuthPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: <AuthPage />,
          },
        ],
      },
      {
        path: '',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="/customers" replace />,
          },
          // Other routes will be added in future chunks
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
