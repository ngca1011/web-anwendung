import {
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
  SimpleGrid,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { isValidISBN, isValidHomepage } from '../utils/validation'

const Buchanlegen = () => {
  const [titel, setTitel] = useState('')
  const [isbn, setIsbn] = useState('')
  const [rating, setRating] = useState<number | null>(1)
  const [art, setArt] = useState('DRUCKAUSGABE')
  const [lieferbar, setLieferbar] = useState<string>('true')
  const [preisString, setPreisString] = useState<string>('10')
  const [rabattString, setRabattString] = useState<string>('0')
  const [homepage, setHomepage] = useState('')
  const today = format(new Date(), 'yyyy-MM-dd')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [datum, setDatum] = useState<string>(today)

  const [isbnError, setIsbnError] = useState('')
  const [homepageError, setHomepageError] = useState('')
  const [titelError, setTitelError] = useState('')

  const invalidISBNMessage = 'Ungültiges ISBN-Format'
  const invalidHomepageMessage = 'Ungültige Homepage URL'
  const invalidInputuDataMessage = 'ungültige Eingabedaten'
  const emptyTitelMessage = 'Titel darf nicht leer sein'

  const formatPreis = (val: string | number | null) => `€` + val
  const parsePreis = (val: string) => val.replace(/^€/, '')

  const toast = useToast()

  const handleArtChange = (value: string) => {
    setArt(value)
  }

  const commonBoxStyles = {
    borderWidth: '1px',
    borderRadius: 'md',
    overflow: 'hidden',
    boxShadow: 'md',
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

  const handleHomepageChange = (value: string) => {
    setHomepage(value)

    if (isValidHomepage(value)) {
      setHomepageError('')
    } else {
      setHomepageError(invalidHomepageMessage)
    }
  }

  const handleTitelChange = (value: string) => {
    setTitel(value)

    if (value !== '') {
      setTitelError('')
    } else {
      setTitelError(emptyTitelMessage)
    }
  }

  const handleIsbnChange = (isbn: string) => {
    setIsbn(isbn)
    if (!isValidISBN(isbn)) {
      setIsbnError(invalidISBNMessage)
    } else {
      setIsbnError('')
    }
  }

  const checkInputData = () => {
    if (titel === '') {
      setTitelError(emptyTitelMessage)
    } else if (!isValidISBN(isbn)) {
      setIsbnError(invalidISBNMessage)
    } else if (!isValidHomepage(homepage)) {
      setHomepageError(invalidHomepageMessage)
    } else {
      return true
    }
    return false
  }

  const handleBuchAnlegen = () => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      void (async () => {
        try {
          if (!checkInputData()) {
            toast({
              title: 'Fehler',
              description: invalidInputuDataMessage,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
            return
          }

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
      <SimpleGrid columns={2} spacing={4} width='800px' margin='auto'>
        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Titel
          </Box>
          <Box padding='4'>
            {' '}
            <FormControl isInvalid={titelError !== ''}>
              <Input
                name='titel'
                value={titel}
                onChange={(e) => {
                  handleTitelChange(e.target.value)
                }}
              />
              <FormErrorMessage>{titelError}</FormErrorMessage>
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
                value={isbn}
                onChange={(e) => {
                  handleIsbnChange(e.target.value)
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Buchart
          </Box>

          <Box padding='4'>
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Lieferbar
          </Box>

          <Box padding='4'>
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Preis
          </Box>

          <Box padding='4'>
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Rabatt
          </Box>
          <Box padding='4'>
            {' '}
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
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Datum
          </Box>

          <Box padding='4'>
            {' '}
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
        </Box>
        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Homepage
          </Box>

          <Box padding='4'>
            {' '}
            <FormControl isInvalid={homepageError !== ''}>
              <Input
                name='homepage'
                value={homepage}
                onChange={(e) => {
                  handleHomepageChange(e.target.value)
                }}
              />
              <FormErrorMessage>{homepageError}</FormErrorMessage>
            </FormControl>
          </Box>
        </Box>
      </SimpleGrid>
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
