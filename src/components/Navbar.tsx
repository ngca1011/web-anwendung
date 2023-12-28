import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react';
import { MdPerson } from "react-icons/md";
import {useAuthContext} from "../Auth.tsx";

const Navigation = () => {

  const {isLoggedIn} = useAuthContext();

  return (
    <Flex
      p={4}
      align="center"
      justify="space-between"
      bg="#B38B6D"
      color="white"
      style = {{
        backgroundImage: 'url("../../public/NavBar.png")',
      }}
    >
      <Box>
        <Link href="/" fontSize="xl" fontWeight="bold">
            <img src = "src\components\logo.png" alt = "H-KA" />
            Home
        </Link>
      </Box>

      <Spacer />

      <Flex>
            <Link href="/buchsuchen" mr={4} fontWeight="bold">
                BuchSuchen
            </Link>
            <Link href="/buchanlegen" mr={4} fontWeight="bold"> 
                BuchAnlegen
            </Link>
      </Flex>
        <Spacer/>
        {isLoggedIn ? (
        <Box>
          <Link href="/anmelden">
            <Icon as={MdPerson} />
          </Link>
        </Box>
        ) : (
        <Link href="/anmelden" fontWeight="bold">
          Login
        </Link>
        )}
    </Flex>
  );
};

export default Navigation;
