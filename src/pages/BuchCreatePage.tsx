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
import axios from 'axios';
import { useState } from 'react';

const Buchanlegen = () => {
  const [titel, setTitel] = useState('')
  const [isbn, setIsbn] = useState('')
  const [rating, setRating] = useState<number | null>(1)
  const [art, setArt] = useState('')
  const [lieferbar, setLieferbar] = useState<string>('true')
  const [preisString, setPreisString] = useState<string>('10')
  const [rabattString, setRabattString] = useState<string>('0')
  const [homepage, setHomepage] = useState('')
  const today = format(new Date(), 'yyyy-MM-dd')
  const [datum, setDatum] = useState<string>(today)


  const formatPreis = (val: string | number | null) => `€` + val
  const parsePreis = (val: string) => val.replace(/^\€/, '')

  const toast = useToast();
  
  const handleArtChange = (value: string) => {
    setArt(value);
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      art: value,
    }));
  };

  const handleBuchAnlegen = async () => {
    try {
      const token = localStorage.getItem('token'); 
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post('https://localhost:3000/rest', formData, {headers}); 
      toast({
        title: 'Erfolgreich',
        description: 'Buch erfolgreich angelegt',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Buch konnte nicht angelegt werden',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
                      name="titel"
                      value={titel}
                      onChange={(e) => setTitel(e.target.value)}
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
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Buchart</Td>
              <Td>
                <Box mb={4}>
                  <FormControl>
                    <Stack direction="row">
                      <Checkbox
                        name="art"
                        isChecked={art === 'DRUCKAUSGABE'}
                        onChange={() => handleArtChange('DRUCKAUSGABE')}
                      >
                        Druckausgabe
                      </Checkbox>
                      <Checkbox
                        name="isKindle"
                        isChecked={art === 'KINDLE'}
                        onChange={() => handleArtChange('KINDLE')}
                      >
                        Kindle
                      </Checkbox>
                    </Stack>
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Preis</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                  <NumberInput
                    defaultValue={15}
                    precision={2}
                    min={0}
                    onChange={(valueString) => setPreisString(parsePreis(valueString))}
                    value={formatPreis(preisString)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Rabatt</Td>
              <Td>
                <Box maxW='300px'>
                <FormControl>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  max={1}
                  step={0.10}
                  onChange={(valueString) => setRabattString(valueString)}
                  value={rabattString}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
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
                      value={homepage}
                      onChange={(e) => setHomepage(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>{/* Optionaler Tabellenfuß */}</Tfoot>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" marginBottom="4">
        <Button onClick={handleBuchAnlegen}>
          Buch anlegen
        </Button>
      </Box>
    </div>
  )
}

export default Buchanlegen
