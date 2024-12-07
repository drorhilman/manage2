import { NavLink } from 'react-router-dom'
import { Users, ClipboardList, Box, Tag, BarChart } from 'lucide-react'
import { Button } from "@/components/ui/button"  // Adjust import based on your shadcn/ui setup

function TopNavBar() {
  const navItems = [
    { to: '/customers', icon: <Users className="w-4 h-4" aria-label="Customers" /> },
    { to: '/orders', icon: <ClipboardList className="w-4 h-4" aria-label="Orders" /> },
    { to: '/products', icon: <Box className="w-4 h-4" aria-label="Products" /> },
    { to: '/offers', icon: <Tag className="w-4 h-4" aria-label="Offers" /> },
    { to: '/reports', icon: <BarChart className="w-4 h-4" aria-label="Reports" /> },
  ]

  return (
    <header className="w-full border-b bg-white shadow-sm" dir="rtl">
      <nav className="flex gap-2 p-2 overflow-x-auto justify-end">
        {navItems.map(item => (
          <Button
            key={item.to}
            asChild
            variant="ghost"
            size="icon" 
            // size="icon" gives a compact circular button style
          >
            <NavLink
              to={item.to}
              end
              className={({ isActive }) =>
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
              }
            >
              {item.icon}
            </NavLink>
          </Button>
        ))}
      </nav>
    </header>
  )
}

export default TopNavBar