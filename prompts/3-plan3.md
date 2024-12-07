Please implement:

Below is a proposed minimal navigation structure and file layout to implement the top-level navigation with five routes. The goal is to create a one-page app with a top navigation bar (using icons and text labels) that routes to empty pages for each main section. By default, the application should load the “Customers” page.

Overview
	•	Use React Router (v6+) for routing.
	•	A top navigation bar (fixed at the top) that contains 5 tabs (Customers, Orders, Products, Offers, Reports).
	•	Each tab uses an icon + label.
	•	When clicking a navigation icon, the central content area updates to show the corresponding page.
	•	Default route ("/") redirects to "/customers".

Route Structure

Routes:
	1.	/customers (Default page)
	2.	/orders
	3.	/products
	4.	/offers
	5.	/reports

Default Behavior:
	•	Navigate to /customers when the app loads (i.e., path="/" redirects to "/customers").

File Structure & Descriptions

At the root level:
	•	firebase.json (Firebase hosting configuration as provided)
	•	package.json (with all required dependencies)
	•	vite.config.js (Vite configuration)

Inside ./src:
	1.	App.tsx (entry point)
	•	Configures React Router.
	•	Renders the top navigation bar and a <Routes> block.
	•	Routes:
	•	path="/" → <Navigate to="/customers" replace />
	•	path="/customers" → <CustomersPage />
	•	path="/orders" → <OrdersPage />
	•	path="/products" → <ProductsPage />
	•	path="/offers" → <OffersPage />
	•	path="/reports" → <ReportsPage />
	2.	components/TopNavBar.tsx
	•	A top-level navigation component containing icon buttons for each route.
	•	Uses shadcn/ui components and Tailwind classes.
	•	Each icon button is an interactive <NavLink> (from react-router-dom):
	•	Example icons (could be from lucide-react or similar library installed in the project).
	•	Customers icon: UserIcon or UsersIcon
	•	Orders icon: ClipboardListIcon
	•	Products icon: BoxIcon
	•	Offers icon: TagIcon
	•	Reports icon: BarChartIcon
	•	On mobile/desktop, the top nav remains consistent.
	3.	pages/CustomersPage.tsx
	•	Placeholder page with minimal markup: <div>Customers Page</div>
	4.	pages/OrdersPage.tsx
	•	Placeholder: <div>Orders Page</div>
	5.	pages/ProductsPage.tsx
	•	Placeholder: <div>Products Page</div>
	6.	pages/OffersPage.tsx
	•	Placeholder: <div>Offers Page</div>
	7.	pages/ReportsPage.tsx
	•	Placeholder: <div>Reports Page</div>

Optional Additional Files (Minimal Components):
	•	components/IconButton.tsx: A small wrapper component for a button with an icon+label if needed.

Minimal Example Code Snippets

App.tsx (Skeleton):

import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import TopNavBar from './components/TopNavBar'
import CustomersPage from './pages/CustomersPage'
import OrdersPage from './pages/OrdersPage'
import ProductsPage from './pages/ProductsPage'
import OffersPage from './pages/OffersPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/customers" replace />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

components/TopNavBar.tsx (Skeleton):

import { NavLink } from 'react-router-dom'
// Example icons from lucide-react or other icon lib
import { Users, ClipboardList, Box, Tag, BarChart } from 'lucide-react'

function TopNavBar() {
  const navItems = [
    { to: '/customers', icon: <Users className="w-5 h-5" />, label: 'Customers' },
    { to: '/orders', icon: <ClipboardList className="w-5 h-5" />, label: 'Orders' },
    { to: '/products', icon: <Box className="w-5 h-5" />, label: 'Products' },
    { to: '/offers', icon: <Tag className="w-5 h-5" />, label: 'Offers' },
    { to: '/reports', icon: <BarChart className="w-5 h-5" />, label: 'Reports' },
  ]

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <nav className="flex space-x-4 p-2 overflow-x-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex items-center space-x-1 px-3 py-2 rounded ${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default TopNavBar

pages/CustomersPage.tsx (Skeleton):

function CustomersPage() {
  return <div>Customers Page (Empty for now)</div>
}

export default CustomersPage

(Repeat similarly for OrdersPage, ProductsPage, OffersPage, ReportsPage.)

In summary:
	•	Files needed:
	•	src/App.tsx (main entry point with Router setup)
	•	src/components/TopNavBar.tsx (navigation bar)
	•	src/pages/CustomersPage.tsx
	•	src/pages/OrdersPage.tsx
	•	src/pages/ProductsPage.tsx
	•	src/pages/OffersPage.tsx
	•	src/pages/ReportsPage.tsx

With this minimal setup, you have a single-page application using react-router-dom, shadcn/ui (for styling primitives), Tailwind CSS, and icons. The default route displays the CustomersPage and users can navigate via the top bar to the other empty pages.