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
            <a href = "https://www.h-ka.de/"><img src = "src\components\logo.png" alt = "H-KA" /></a>
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
            <Link href="/buchzeigen" mr={4} fontWeight="bold"> 
                BuchZeigen
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
