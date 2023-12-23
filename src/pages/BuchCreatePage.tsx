import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  FormControl,
  Input,
  Button,
  RadioGroup,
  Stack,
  Radio,
  useToast
} from '@chakra-ui/react';

const Buchanlegen = () => {
  const toast = useToast();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bookType: value,
    }));
  };


  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
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
                <Box maxW='300px'>
                  <FormControl>
                    <Input />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>ISBN Nummer</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Buchart</Td>
              <Td>
                <Box mb={4}>
                  <RadioGroup>
                    <Stack direction='row'>
                      <Radio value='1'>Druckausgabe</Radio>
                      <Radio value='2'>Kindle</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Preis</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Rabatt</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Homepage</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>{/* Optionaler Tabellenfuß */}</Tfoot>
        </Table>
      </TableContainer>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        marginBottom='4'
        marginTop='30'
      >
        <Button
          onClick={() => {
            const examplePromise = new Promise((resolve) => {
              setTimeout(() => {
                resolve(200)
              }, 1000)
            })

            toast.promise(examplePromise, {
              success: { title: 'Erfolgreich', description: 'Buch erfolgreich angelegt' },
              error: { title: 'Fehler', description: 'Buch konnte nicht angelegt werden' },
              loading: { title: 'Bitte warten', description: 'Vorgang wird ausgeführt' },
            })
          }}
        >
          Buch anlegen
        </Button>
      </Box>
    </div>
  )
}

export default Buchanlegen
