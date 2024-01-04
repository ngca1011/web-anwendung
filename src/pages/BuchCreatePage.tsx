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
  Stack,
  useToast,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

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
  const [isbnError, setIsbnError] = useState('')

  const formatPreis = (val: string | number | null) => `€` + val
  const parsePreis = (val: string) => val.replace(/^€/, '')

  const toast = useToast()

  const handleArtChange = (value: string) => {
    setArt(value)
  }

  const payload = {
    isbn,
    rating,
    art,
    preis: parseFloat(preisString),
    rabatt: parseFloat(rabattString),
    lieferbar: true,
    datum,
    homepage,
    schlagwoerter: [],
    titel: {
      titel,
      untertitel: '',
    },
    _links: {
      self: {
        href: '',
      },
    },
  }

  const isValidISBN = (isbn: string) => {
    const isbnPattern = /^\d{3}-\d{1}-\d{5}-\d{3}-\d{1}$/
    console.log(isbnPattern.test(isbn))
    return isbnPattern.test(isbn)
  }

  const handleIsbnChange = (isbn: string) => {
    setIsbn(isbn)
    if (!isValidISBN(isbn)) {
      setIsbnError('ungültiges ISBN-Format')
    } else {
      setIsbnError('')
    }
  }

  const handleBuchAnlegen = () => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      void (async () => {
        try {
          await axios.post('https://localhost:3000/rest', payload, { headers })
          toast({
            title: 'Erfolgreich',
            description: 'Buch erfolgreich angelegt',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } catch (error) {
          console.log(error)
          toast({
            title: 'Fehler',
            description: 'Buch konnte nicht angelegt werden',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })()
    } catch (error) {
      console.error(error)
    }
  }

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
                      name='titel'
                      value={titel}
                      onChange={(e) => {
                        setTitel(e.target.value)
                      }}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>ISBN Nummer</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl isInvalid={!(isbnError === '')}>
                    <Input
                      name='isbn'
                      value={isbn}
                      onChange={(e) => {
                        handleIsbnChange(e.target.value)
                      }}
                    />
                    <FormErrorMessage>{isbnError}</FormErrorMessage>
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Buchart</Td>
              <Td>
                <Box mb={4}>
                  <FormControl>
                    <Stack direction='row'>
                      <Checkbox
                        name='art'
                        isChecked={art === 'DRUCKAUSGABE'}
                        onChange={() => {
                          handleArtChange('DRUCKAUSGABE')
                        }}
                      >
                        Druckausgabe
                      </Checkbox>
                      <Checkbox
                        name='isKindle'
                        isChecked={art === 'KINDLE'}
                        onChange={() => {
                          handleArtChange('KINDLE')
                        }}
                      >
                        Kindle
                      </Checkbox>
                    </Stack>
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Rating</Td>
              <Td>
                <Box maxW='300px'>
                  <Menu>
                    <MenuButton as={Button}>{rating ?? 'Choose'}</MenuButton>
                    <MenuList>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <MenuItem
                          key={value}
                          onClick={() => {
                            setRating(value)
                          }}
                        >
                          {value}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Lieferbar</Td>
              <Td>
                <Box mb={4}>
                  <FormControl>
                    <Stack direction='row'>
                      <Checkbox
                        name='lieferbar'
                        isChecked={lieferbar === 'true'}
                        onChange={() => {
                          setLieferbar('true')
                        }}
                      >
                        Ja
                      </Checkbox>
                      <Checkbox
                        name='lieferbar'
                        isChecked={lieferbar === 'false'}
                        onChange={() => {
                          setLieferbar('false')
                        }}
                      >
                        Nein
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
                      onChange={(valueString) => {
                        setPreisString(parsePreis(valueString))
                      }}
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
                      step={0.1}
                      onChange={(valueString) => {
                        setRabattString(valueString)
                      }}
                      value={rabattString}
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
              <Td>Datum</Td>
              <Td>
                <Box maxW='300px'>
                  <FormControl>
                    <input
                      type='date'
                      name='datum'
                      value={datum}
                      max={today}
                      onChange={(valueString) => {
                        setDatum(valueString.target.value)
                      }}
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
                      name='homepage'
                      value={homepage}
                      onChange={(e) => {
                        setHomepage(e.target.value)
                      }}
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>{/* Optionaler Tabellenfuß */}</Tfoot>
        </Table>
      </TableContainer>

      <Box display='flex' justifyContent='center' alignItems='center' marginBottom='4'>
        <Button
          onClick={() => {
            handleBuchAnlegen()
          }}
        >
          Buch anlegen
        </Button>
      </Box>
    </div>
  )
}

export default Buchanlegen
