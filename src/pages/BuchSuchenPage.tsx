import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Book, FetchedData } from '../types/interfaces' // Import types using 'import type'

import {
  FormHelperText,
  Input,
  Checkbox,
  Stack,
  RadioGroup,
  Table,
  FormControl,
  Radio,
  Thead,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react'

const Buchsuchen = () => {
  const toast = useToast()
  const [titelValue, setTitelValue] = useState('')
  const [isbnValue, setIsbnValue] = useState('')
  const [searchClicked, setSearchClicked] = useState(false)
  const [ratingValue, setRatingValue] = useState<number | null>(null) // Neue State-Variable für das Rating
  const [druckausgabeChecked, setDruckausgabeChecked] = useState(false)
  const [kindleChecked, setKindleChecked] = useState(false)
  const [buchArtChecked, setBuchArtChecked] = useState(false)
  const [lieferbarValue, setLieferbarValue] = useState<string>('') // Neue State-Variable für Lieferbar
  const [selectedBook, setSelectedBook] = useState<Book | null>(null) // Zustand für ausgewähltes Buch

  const [fetchedData, setFetchedData] = useState<FetchedData>({ _embedded: { buecher: [] } })
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let apiUrl = 'https://localhost:3000/rest?'

        if (titelValue.trim() !== '') {
          apiUrl += `titel=${titelValue}`
        }
        if (isbnValue.trim() !== '') {
          apiUrl += `&isbn=${isbnValue}`
        }
        if (ratingValue !== null) {
          apiUrl += `&rating=${ratingValue}`
        }
        if (druckausgabeChecked && !kindleChecked) {
          apiUrl += '&art=DRUCKAUSGABE'
          setBuchArtChecked(true)
        } else if (kindleChecked && !druckausgabeChecked) {
          apiUrl += '&art=KINDLE'
          setBuchArtChecked(true)
        }
        if (lieferbarValue !== '') {
          apiUrl += `&lieferbar=${lieferbarValue === 'Ja' ? 'true' : 'false'}`
        }
        const response = await axios.get(apiUrl)
        console.log('Response data:', response.data)
        if (response.data._embedded.buecher.length === 0) {
          return 404
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFetchedData(response.data)
        return 200
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
        return 500
      }
    }

    if (searchClicked) {
      void (async () => {
        const status = await fetchDataFromApi()

        if (status === 200) {
          toast({
            title: 'Erfolgreich',
            description: 'Buch gefunden',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else if (status === 404) {
          toast({
            title: 'Info',
            description: 'Kein Buch gefunden',
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Fehler',
            description: 'Suche konnte nicht durchgeführt werden',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }

        setSearchClicked(false)
      })()
    }
  }, [
    searchClicked,
    toast,
    titelValue,
    isbnValue,
    ratingValue,
    druckausgabeChecked,
    kindleChecked,
    lieferbarValue,
  ])

  return (
    <div
      style={{
        backgroundColor: 'white',
      }}
    >
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Kriterium</Th>
              <Th>Anpassen</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Titel</Td>
              <Td>
                <Box mb={4} maxW='300px'>
                  <FormControl>
                    <Input
                      value={titelValue}
                      onChange={(event) => {
                        setTitelValue(event.target.value)
                      }}
                      placeholder='Titel eingeben'
                    />
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>ISBN Number</Td>
              <Td>
                <Box mb={4} maxW='300px'>
                  <FormControl>
                    <Input
                      value={isbnValue}
                      onChange={(event) => {
                        setIsbnValue(event.target.value)
                      }}
                    />
                    <FormHelperText>Example: 9780131969452</FormHelperText>
                  </FormControl>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Rating</Td>
              <Td>
                <Box maxW='300px'>
                  <Menu>
                    <MenuButton as={Button}>{ratingValue ?? 'Choose'}</MenuButton>
                    <MenuList>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <MenuItem
                          key={value}
                          onClick={() => {
                            setRatingValue(value)
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
              <Td>Buchart</Td>
              <Td>
                <Box mb={4}>
                  <Stack spacing={5} direction='row'>
                    {/* Checkbox für Druckausgabe 1 */}
                    <Checkbox
                      colorScheme='blue'
                      defaultChecked={druckausgabeChecked}
                      onChange={(e) => {
                        setDruckausgabeChecked(e.target.checked)
                      }}
                    >
                      Druckausgabe
                    </Checkbox>

                    {/* Checkbox für Druckausgabe 2 */}
                    <Checkbox
                      colorScheme='blue'
                      defaultChecked={kindleChecked}
                      onChange={(e) => {
                        setKindleChecked(e.target.checked)
                      }}
                    >
                      Kindle
                    </Checkbox>
                  </Stack>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>Lieferbar</Td>
              <Td>
                <RadioGroup
                  value={lieferbarValue}
                  onChange={(value) => {
                    setLieferbarValue(value)
                  }}
                >
                  <Stack spacing={5} direction='row'>
                    <Radio colorScheme='blue' value='Ja'>
                      Ja
                    </Radio>
                    <Radio colorScheme='blue' value='Nein'>
                      Nein
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Td>
            </Tr>
            <Box mb={4}></Box>
          </Tbody>
        </Table>
      </TableContainer>

      <Box display='flex' justifyContent='center' alignItems='center' marginBottom='4'>
        <Button
          onClick={() => {
            if (
              titelValue.trim() !== '' ||
              isbnValue.trim() !== '' ||
              ratingValue !== null ||
              buchArtChecked ||
              lieferbarValue !== null
            ) {
              setSearchClicked(true)
            } else {
              // Benutzer über leeres Suchfeld informieren
              toast({
                title: 'Achtung',
                description: 'Bitte geben Sie einen Titel oder eine ISBN für die Suche ein.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
              })
            }
          }}
        >
          Buch suchen
        </Button>
      </Box>
      <TableContainer>
        <Table variant='striped' colorScheme='gray'>
          <TableCaption>Gefundene Bücher</TableCaption>
          <Thead>
            <Tr>
              <Th>Titel</Th>
              <Th>ISBN</Th>
              <Th>Rating</Th>
              <Th>Art</Th>
              <Th>Preis</Th>
              <Th>Rabatt</Th>
              <Th>Lieferbar</Th>
              <Th>Datum</Th>
              <Th>Homepage</Th>
              <Th>Schlagwörter</Th>
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fetchedData._embedded.buecher.map((buch, index) => (
              <Tr
                key={index}
                onClick={() => {
                  setSelectedBook(buch)
                }}
              >
                <Td>{buch.titel.titel}</Td>
                <Td>{buch.isbn}</Td>
                <Td>{buch.rating}/5</Td>
                <Td>{buch.art}</Td>
                <Td>{buch.preis}€</Td>
                <Td>{(buch.rabatt * 100).toFixed(2)}%</Td>
                <Td>{buch.lieferbar ? 'Ja' : 'Nein'}</Td>
                <Td>{buch.datum}</Td>
                <Td>
                  <a href={buch.homepage} target='_blank' rel='noopener noreferrer'>
                    {buch.homepage}
                  </a>
                </Td>
                <Td>{buch.schlagwoerter.join(', ')}</Td>
                <Td>
                  <a href={buch._links.self.href} target='_blank' rel='noopener noreferrer'>
                    {buch._links.self.href}
                  </a>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedBook != null && (
        <Modal
          isOpen={true}
          onClose={() => {
            setSelectedBook(null)
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedBook.titel.titel}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>ISBN: {selectedBook.isbn}</p>
              <p>Rating: {selectedBook.rating}/5</p>
              <p>Art: {selectedBook.art}</p>
              <p>Preis: {selectedBook.preis}</p>
              <p>Rabatt: {(selectedBook.rabatt * 100).toFixed(2)}%</p>
              <p>Lieferbar: {selectedBook.lieferbar ? 'Ja' : 'Nein'}</p>
              <p>Datum: {selectedBook.datum}</p>
              <p>Homepage: {selectedBook.homepage}</p>
              <p>Schlagwörter: {selectedBook.schlagwoerter}</p>
              <p>Link: {selectedBook._links.self.href}</p>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default Buchsuchen
