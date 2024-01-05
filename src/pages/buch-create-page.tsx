import { API_URL, invalidISBNMessage } from '../consts'
import type { ReactElement } from 'react'
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
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { isValidISBN, isValidHomepage } from '../utils/validation'
import { getToken, useAuthContext } from '../components/authentication'

const formatPreis = (value: string | number | null): string => `€${value}`
const parsePreis = (value: string): string => value.replace(/^€/, '')
const Buchanlegen = (): ReactElement => {
  const [titel, setTitel] = useState('')
  const [isbn, setIsbn] = useState('')
  const [rating, setRating] = useState<number | null>(1)
  const [art, setArt] = useState('DRUCKAUSGABE')
  const [lieferbar, setLieferbar] = useState<string>('true')
  const [preisString, setPreisString] = useState<string>('10')
  const [rabattString, setRabattString] = useState<string>('0')
  const [homepage, setHomepage] = useState('')
  const today = format(new Date(), 'yyyy-MM-dd')
  const [datum, setDatum] = useState<string>(today)
  const { isLoggedIn } = useAuthContext()
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([])

  const [isbnError, setIsbnError] = useState('')
  const [homepageError, setHomepageError] = useState('')
  const [titelError, setTitelError] = useState('')

  const invalidHomepageMessage = 'Ungültige Homepage URL'
  const invalidInputuDataMessage = 'ungültige Eingabedaten'
  const emptyTitelMessage = 'Titel darf nicht leer sein'

  const toast = useToast()

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
    preis: Number.parseFloat(preisString),
    rabatt: Number.parseFloat(rabattString),
    lieferbar: true,
    datum,
    homepage,
    schlagwoerter,
    titel: {
      titel,
      untertitel: '',
    },
  }

  const handleHomepageChange = (value: string): void => {
    setHomepage(value)

    if (isValidHomepage(value)) {
      setHomepageError('')
    } else {
      setHomepageError(invalidHomepageMessage)
    }
  }

  const handleSchlagwoerterChange = (value: string): void => {
    if (schlagwoerter.includes(value)) {
      setSchlagwoerter((previousItems) => previousItems.filter((item) => item !== value))
    } else {
      setSchlagwoerter((previousItems) => [...previousItems, value])
    }
  }

  const handleTitelChange = (value: string): void => {
    setTitel(value)

    if (value === '') {
      setTitelError(emptyTitelMessage)
    } else {
      setTitelError('')
    }
  }

  const handleIsbnChange = (isbn: string): void => {
    setIsbn(isbn)
    if (isValidISBN(isbn)) {
      setIsbnError('')
    } else {
      setIsbnError(invalidISBNMessage)
    }
  }

  const checkInputData = (): boolean => {
    if (titel === '') {
      setTitelError(emptyTitelMessage)
    } else if (!isValidISBN(isbn)) {
      setIsbnError(invalidISBNMessage)
    } else if (isValidHomepage(homepage)) {
      return true
    } else {
      setHomepageError(invalidHomepageMessage)
    }
    return false
  }

  const handleBuchAnlegen = (): void => {
    if (!isLoggedIn) {
      toast({
        title: 'Fehler',
        description: 'Benutzer ist nicht eingeloggt!',
        status: 'error',
      })
      return
    }
    try {
      const headers = {
        Authorization: getToken(),
      }

      void (async () => {
        try {
          if (!checkInputData()) {
            toast({
              title: 'Fehler',
              description: invalidInputuDataMessage,
              status: 'error',
            })
            return
          }

          await axios.post(`${API_URL}rest`, payload, { headers })
          toast({
            title: 'Erfolgreich',
            description: 'Buch erfolgreich angelegt',
            status: 'success',
          })
        } catch {
          toast({
            title: 'Fehler',
            description: 'Buch konnte nicht angelegt werden',
            status: 'error',
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
            <FormControl isInvalid={titelError !== ''}>
              <Input
                name='titel'
                value={titel}
                onChange={(input) => {
                  handleTitelChange(input.target.value)
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
            <RadioGroup
              value={art}
              onChange={(value) => {
                setArt(value)
              }}
            >
              <Stack spacing={5} direction='row'>
                <Radio colorScheme='blue' value='DRUCKAUSGABE'>
                  Druckausgabe
                </Radio>
                <Radio colorScheme='blue' value='KINDLE'>
                  Kindle
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Box>

        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Lieferbar
          </Box>

          <Box padding='4'>
            <RadioGroup
              value={lieferbar}
              onChange={(value) => {
                setLieferbar(value)
              }}
            >
              <Stack spacing={5} direction='row'>
                <Radio colorScheme='blue' value='true'>
                  Ja
                </Radio>
                <Radio colorScheme='blue' value='false'>
                  Nein
                </Radio>
              </Stack>
            </RadioGroup>
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
            Schlagwörter
          </Box>

          <Box padding='4'>
            <Stack spacing={5} direction='row'>
              <Checkbox
                colorScheme='blue'
                onChange={() => {
                  handleSchlagwoerterChange('TYPESCRIPT')
                }}
              >
                TYPESCRIPT
              </Checkbox>

              <Checkbox
                colorScheme='blue'
                onChange={() => {
                  handleSchlagwoerterChange('JAVASCRIPT')
                }}
              >
                JAVASCRIPT
              </Checkbox>
            </Stack>
          </Box>
        </Box>
        <Box style={commonBoxStyles}>
          <Box padding={4} borderRightWidth={1} fontWeight='bold'>
            Homepage
          </Box>

          <Box padding='4'>
            <FormControl isInvalid={homepageError !== ''}>
              <Input
                name='homepage'
                value={homepage}
                onChange={(input): void => {
                  handleHomepageChange(input.target.value)
                }}
              />
              <FormErrorMessage>{homepageError}</FormErrorMessage>
            </FormControl>
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
            handleBuchAnlegen()
          }}
        >
          Buch anlegen
        </Button>
      </Box>
    </div>
  )
}

export { Buchanlegen }
