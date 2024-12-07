import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Offers from './pages/Offers';
import JobDescriptions from './pages/JobDescriptions';
import Customers from './pages/Customers';
import Header from './components/Header';
import NavigationTabs from './components/Tabs'; // Importing NavigationTabs
import { useAuth } from './hooks/useAuth'; // Custom hook for authentication

function App() {
  const { user, isWhitelisted } = useAuth();

  return (
    <Router>
      {user && isWhitelisted ? (
        <>
          <Header />
          <NavigationTabs />
          <Routes>
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/job-descriptions" element={<JobDescriptions />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/" element={<Navigate to="/customers" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
