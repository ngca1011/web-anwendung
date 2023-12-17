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
      bg="gray.400"
      color="white"
    >
      <Box>
        <Link href="/" fontSize="xl" fontWeight="bold">
            LOGO
        </Link>
      </Box>

      <Spacer />

      <Flex>
            <Link href="/buchsuchen" mr={4}>
                BuchSuchen
            </Link>
            <Link href="/buchanlegen" mr={4}> 
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
        <Link href="/anmelden">
          Login
        </Link>
        )}
    </Flex>
  );
};

export default Navigation;
