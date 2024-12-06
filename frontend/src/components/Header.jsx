import { Box, Flex, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { auth } from '../firebase';

function Header() {
  const user = auth.currentUser;

  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex justify="space-between" align="center">
        <Box fontSize="xl">Business Management</Box>
        <Menu>
          <MenuButton>
            <Avatar name={user.displayName} src={user.photoURL} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Header;
