import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Offers from './pages/Offers';
import JobDescriptions from './pages/JobDescriptions';
import Customers from './pages/Customers';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth'; // Custom hook for authentication

function App() {
  const { user, isWhitelisted } = useAuth();

  return (
    <ChakraProvider>
      <Router>
        {user && isWhitelisted ? (
          <>
            <Header />
            <NavigationTabs />
            <Switch>
              <Route path="/customers" component={Customers} />
              <Route path="/orders" component={Orders} />
              <Route path="/products" component={Products} />
              <Route path="/job-descriptions" component={JobDescriptions} />
              <Route path="/offers" component={Offers} />
              <Redirect from="/" to="/customers" />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
      </Router>
    </ChakraProvider>
  );
}

export default App;
