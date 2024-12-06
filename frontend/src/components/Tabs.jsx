import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function NavigationTabs() {
  return (
    <Tabs variant="soft-rounded" colorScheme="blue">
      <TabList>
        <Tab as={NavLink} to="/customers">Customers</Tab>
        <Tab as={NavLink} to="/orders">Orders</Tab>
        <Tab as={NavLink} to="/products">Products</Tab>
        <Tab as={NavLink} to="/job-descriptions">Job Descriptions</Tab>
        <Tab as={NavLink} to="/offers">Offers</Tab>
        <Tab as={NavLink} to="/reports">Reports</Tab>
      </TabList>
    </Tabs>
  );
}

export default NavigationTabs;
