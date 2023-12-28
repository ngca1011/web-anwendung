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
import { useState } from 'react';

const Buchanlegen = () => {
  const [formData, setFormData] = useState({
    titel: '',
    isbn: '',
    art: '1',
    preis: '',
    rabatt: '',
    homepage: '',
  });
  
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
                    <Input
                      name="title"
                      value={formData.titel}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>ISBN Nummer</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Buchart</Td>
              <Td>
                <Box mb={4}>
                  <RadioGroup
                    value={formData.art}
                    onChange={(value) => handleRadioChange(value.toString())}
                  >
                    <Stack direction="row">
                      <Radio value="1">Druckausgabe</Radio>
                      <Radio value="2">Kindle</Radio>
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
                    <Input
                      name="price"
                      value={formData.preis}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Rabatt</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input
                      name="discount"
                      value={formData.rabatt}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Homepage</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <Input
                      name="homepage"
                      value={formData.homepage}
                      onChange={handleInputChange}
                    />
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
