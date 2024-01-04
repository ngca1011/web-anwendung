import { Box, Center, Text, Heading } from '@chakra-ui/react'
import type { ReactElement } from 'react'

const Home = (): ReactElement => (
  <Center>
    <Box w='400px' h='auto' textAlign='center'>
      <Heading>SWE Gruppe 9</Heading>
      <Text>Welcome to our Homepage</Text>
    </Box>
  </Center>
)

export { Home }
