import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    FormControl,
    Input,
    Button
  } from '@chakra-ui/react'
  
  export default function Buchanlegen() {
    return (
      <div>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Kriterium</Th>
                <Th>Eingabe</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Titel</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>ISBN Nummer</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Buchart</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Preis</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Rabatt</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Homepage</Td>
                <Td>
                  <Box maxW="300px">
                    <FormControl>
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
            </Tfoot>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="4">
            <Button colorScheme="gray">Anlegen</Button>
        </Box>


      </div>
    )
  }
  