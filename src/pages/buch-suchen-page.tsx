import { isValidISBN } from '../utils/validation'
import { API_URL, invalidISBNMessage } from '../consts'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import axios from 'axios'
import type { Book, FetchedData } from '../types/interfaces'

import {
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
  SimpleGrid,
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
  FormErrorMessage,
} from '@chakra-ui/react'

const Buchsuchen = (): ReactElement => {
  const toast = useToast()
  const [titelValue, setTitelValue] = useState('')
  const [isbnValue, setIsbnValue] = useState('')
  const [searchClicked, setSearchClicked] = useState(false)
  const [ratingValue, setRatingValue] = useState<number | null>() // Neue State-Variable für das Rating
  const [druckausgabeChecked, setDruckausgabeChecked] = useState(false)
  const [kindleChecked, setKindleChecked] = useState(false)
  const [buchArtChecked, setBuchArtChecked] = useState(false)
  const [lieferbarValue, setLieferbarValue] = useState<string>('') // Neue State-Variable für Lieferbar
  const [selectedBook, setSelectedBook] = useState<Book | null>() // Zustand für ausgewähltes Buch
  const [isbnError, setIsbnError] = useState('')

  const commonBoxStyles = {
    borderWidth: '1px',
    borderRadius: 'md',
    overflow: 'hidden',
    boxShadow: 'md',
  }

  const handleIsbnChange = (isbn: string): void => {
    setIsbnValue(isbn)
    if (isValidISBN(isbn) || isbn === '') {
      setIsbnError('')
    } else {
      setIsbnError(invalidISBNMessage)
    }
  }

  const [fetchedData, setFetchedData] = useState<FetchedData>({ _embedded: { buecher: [] } })

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    let apiUrl = `${API_URL}rest?`

    if (titelValue.trim() !== '') {
      apiUrl += `titel=${titelValue}`
    }
    if (isbnValue.trim() !== '') {
      apiUrl += `&isbn=${isbnValue}`
    }
    if (ratingValue !== null && ratingValue !== undefined) {
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
      apiUrl += `&lieferbar=${lieferbarValue === 'Ja'}`
    }

    const fetchDataFromApi = async (): Promise<404 | 200 | 500> => {
      try {
        const response = await axios.get(apiUrl)
        if (response.data._embedded.buecher.length === 0) {
          return 404
        }
        setFetchedData(response.data as FetchedData)
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
          })
        } else if (status === 404) {
          toast({
            title: 'Info',
            description: 'Kein Buch gefunden',
            status: 'info',
          })
        } else {
          toast({
            title: 'Fehler',
            description: 'Suche konnte nicht durchgeführt werden',
            status: 'error',
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
      <SimpleGrid columns={2} spacing={4} width='800px' margin='auto'>
        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Titel
          </Box>

          <Box padding='4'>
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            ISBN Number
          </Box>

          <Box padding='4'>
            <FormControl isInvalid={isbnError !== ''}>
              <Input
                name='isbn'
                value={isbnValue}
                onChange={(input): void => {
                  handleIsbnChange(input.target.value)
                }}
              />
              <FormErrorMessage>{isbnError}</FormErrorMessage>
            </FormControl>
          </Box>
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Rating
          </Box>

          <Box padding='4'>
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Buchart
          </Box>

          <Box padding='4'>
            <Stack spacing={5} direction='row'>
              <Checkbox
                colorScheme='blue'
                defaultChecked={druckausgabeChecked}
                onChange={(input) => {
                  setDruckausgabeChecked(input.target.checked)
                }}
              >
                Druckausgabe
              </Checkbox>

              <Checkbox
                colorScheme='blue'
                defaultChecked={kindleChecked}
                onChange={(input) => {
                  setKindleChecked(input.target.checked)
                }}
              >
                Kindle
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Lieferbar
          </Box>

          <Box padding='4'>
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
          </Box>
        </Box>
      </SimpleGrid>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        marginTop='4'
        marginBottom='4'
      >
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
              toast({
                title: 'Achtung',
                description: 'Bitte geben Sie einen Titel oder eine ISBN für die Suche ein.',
                status: 'warning',
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
                <Td>{buch.schlagwoerter === null ? '' : buch.schlagwoerter.join(', ')}</Td>
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

      {selectedBook !== undefined && selectedBook !== null && (
        <Modal
          isOpen={true}
          onClose={() => {
            setSelectedBook(undefined)
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

export { Buchsuchen }
