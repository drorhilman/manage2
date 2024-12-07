#Core Navigation & Layout Implementation Guide

## Project Overview for New Developers
This is a business management application built with React, TypeScript, and Firebase. We're using:
- Vite as our build tool
- shadcn/ui for UI components
- Tailwind CSS for styling
- React Router for navigation
- Firebase for backend

## Required Dependencies
First, ensure these packages are installed:
```bash
npm install @tanstack/react-query react-router-dom lucide-react @radix-ui/react-slot @radix-ui/react-dropdown-menu firebase date-fns
```

## File-by-File Implementation Guide

### 1. src/app/App.tsx
**Purpose**: Root component that sets up the application structure.

```typescript
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Providers } from './Providers';

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
```

### 2. src/app/Providers.tsx
**Purpose**: Wraps the application with necessary providers (React Query, Auth, etc.)

```typescript
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 3. src/app/router.tsx
**Purpose**: Defines all application routes and their configurations

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthPage } from '../pages/AuthPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
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
```

### 4. src/app/layouts/RootLayout.tsx
**Purpose**: Top-level layout component that wraps the entire application

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
```

### 5. src/app/layouts/AuthLayout.tsx
**Purpose**: Layout for authentication pages (login, etc.)

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
```

### 6. src/app/layouts/DashboardLayout.tsx
**Purpose**: Main application layout with navigation and header

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/navigation/Header';
import { TabNavigation } from '../../components/navigation/TabNavigation';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNavigation />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
```

### 7. src/components/navigation/Header.tsx
**Purpose**: Top header with app title and user menu

```typescript
import React from 'react';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Business Manager</h1>
        <UserMenu />
      </div>
    </header>
  );
}
```

### 8. src/components/navigation/TabNavigation.tsx
**Purpose**: Main navigation tabs for different sections

```typescript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  Package, 
  Tag, 
  BarChart 
} from 'lucide-react';

const navigationItems = [
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/offers', label: 'Offers', icon: Tag },
  { to: '/reports', label: 'Reports', icon: BarChart },
];

export function TabNavigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
                 hover:text-primary
                 ${isActive ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

### 9. src/components/navigation/UserMenu.tsx
**Purpose**: User dropdown menu in header

```typescript
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-full p-2 hover:bg-accent">
          <User className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 10. src/components/common/LoadingSpinner.tsx
**Purpose**: Reusable loading indicator

```typescript
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin ${sizes[size]}`} />
    </div>
  );
}
```

### 11. src/pages/AuthPage.tsx
**Purpose**: Login page placeholder (will be implemented in Chunk 2)

```typescript
import React from 'react';

export function AuthPage() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-muted-foreground">
        Please sign in to continue
      </p>
      {/* Sign-in button will be added in Chunk 2 */}
    </div>
  );
}
```

### 12. src/pages/NotFoundPage.tsx
**Purpose**: 404 error page

```typescript
import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
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
}
```

### 13. src/types/global.types.ts
**Purpose**: Common TypeScript interfaces and types

```typescript
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add more global types as needed
```

## Important Implementation Notes

### Styling Guidelines
1. We're using Tailwind CSS for all styling
2. Follow mobile-first approach
3. Use provided color scheme:
   - Primary text: #333333
   - Background: #FFFFFF or #F7F7F7
   - Accent: #607D8B

### Component Guidelines
1. All components should be functional components with TypeScript
2. Use proper type definitions
3. Follow mobile-first responsive design
4. Implement proper loading states
5. Handle error cases

### Layout Guidelines
1. Main content should be centered with max-width container
2. Use consistent padding (16px/1rem)
3. Ensure proper spacing between elements
4. Make sure layout works on all screen sizes

### Navigation Guidelines
1. Tabs should be scrollable on mobile
2. Active tab should be clearly indicated
3. Header should stay fixed at top
4. User menu should be easily accessible

