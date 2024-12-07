#!/usr/bin/env bash

# Ensure directories exist
mkdir -p src/components
mkdir -p src/pages

# Create App.tsx if it doesn't exist
if [ ! -f src/App.tsx ]; then
cat > src/App.tsx << 'EOF'
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
EOF
fi

# Create TopNavBar.tsx if not exists
if [ ! -f src/components/TopNavBar.tsx ]; then
cat > src/components/TopNavBar.tsx << 'EOF'
import { NavLink } from 'react-router-dom'
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
            className={({ isActive }) => 
              \`flex items-center space-x-1 px-3 py-2 rounded \${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}\`
            }
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
EOF
fi

# Create placeholder pages if not exist
for page in CustomersPage OrdersPage ProductsPage OffersPage ReportsPage; do
  if [ ! -f "src/pages/$page.tsx" ]; then
    cat > "src/pages/$page.tsx" << EOF
function $page() {
  return <div>$page (Empty for now)</div>
}

export default $page
EOF
  fi
done

echo "All files generated if they did not already exist."