import { Box, Flex, Text, Link, Spacer } from '@chakra-ui/react';

const Navigation = () => {
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

        <Spacer />

        <Link href="/anmelden">
            Login
        </Link>
    </Flex>
  );
};

export default Navigation;
