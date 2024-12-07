import { NavLink } from 'react-router-dom';

function NavigationTabs() {
  return (
    <ul className="flex space-x-4 bg-blue-100 p-2 rounded-md">
      <li>
        <NavLink to="/customers" className="p-2 rounded hover:bg-blue-200">Customers</NavLink>
      </li>
      <li>
        <NavLink to="/orders" className="p-2 rounded hover:bg-blue-200">Orders</NavLink>
      </li>
      <li>
        <NavLink to="/products" className="p-2 rounded hover:bg-blue-200">Products</NavLink>
      </li>
      <li>
        <NavLink to="/job-descriptions" className="p-2 rounded hover:bg-blue-200">Job Descriptions</NavLink>
      </li>
      <li>
        <NavLink to="/offers" className="p-2 rounded hover:bg-blue-200">Offers</NavLink>
      </li>
      <li>
        <NavLink to="/reports" className="p-2 rounded hover:bg-blue-200">Reports</NavLink>
      </li>
    </ul>
  );
}

export default NavigationTabs;
