import  { useState, useEffect } from 'react';
import axios from 'axios';

import {
    FormHelperText,
    Input,
    RangeSlider,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    FormControl,
    FormLabel,
    RangeSliderTrack,
    NumberInput,
    Table,
    Thead,
    Tbody,
    Menu,
  MenuButton,
  MenuList,
  MenuItem,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    Button,
    NumberDecrementStepper,
    Box,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    useToast
  } from "@chakra-ui/react";
  
  const currentYear = new Date().getFullYear();

  const Buchsuchen = () => {
    const toast = useToast();
    const [titelValue, setTitelValue] = useState('');
    const [isbnValue, setIsbnValue] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [ratingValue, setRatingValue] = useState<number | null>(null); // Neue State-Variable für das Rating


    interface Book {
      isbn: string;
      rating: number;
      art: string;
      preis: number;
      rabatt: number;
      lieferbar: boolean;
      datum: string;
      homepage: string;
      schlagwoerter: string[];
      titel: {
        titel: string;
        untertitel: string;
      };
      _links: {
        self: {
          href: string;
        };
      };
    }
    interface Embedded {
      buecher: Book[];
    }

    interface FetchedData {
      _embedded: Embedded;
    }
    const [fetchedData, setFetchedData] = useState<FetchedData>({ _embedded: { buecher: [] } });

    const fetchDataFromApi = async () => {
      try {
        let apiUrl = 'https://localhost:3000/rest?';
    
        if (titelValue.trim() !== '') {
          apiUrl += `titel=${titelValue}`;
        }
    
        if (isbnValue.trim() !== '') {
          apiUrl += `&isbn=${isbnValue}`;
        }

        if (ratingValue !== null) {
          apiUrl += `&rating=${ratingValue}`;
        }
    
        const response = await axios.get(apiUrl);
        console.log('Response data:', response.data);
    
        if (response.data._embedded.buecher.length === 0) {
          return 404;
        }
    
        setFetchedData(response.data);
        return 200;
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return 500;
      }
    };
    
    useEffect(() => {
      if (searchClicked) {
        (async () => {
          const status = await fetchDataFromApi();
    
          if (status === 200) {
            toast({
              title: 'Erfolgreich',
              description: 'Buch gefunden',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } else if (status === 404) {
            toast({
              title: 'Info',
              description: 'Kein Buch gefunden',
              status: 'info',
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Fehler',
              description: 'Suche konnte nicht durchgeführt werden',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
    
          setSearchClicked(false);
        })();
      }
    }, [searchClicked]);
    
      return (
      <div style = {{
        backgroundColor: "white",
      }}>
        <TableContainer>
          <Table variant="simple">
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
           <Box mb={4} maxW="300px">
           <FormControl>
          <Input
              value={titelValue}
              onChange={(event) => setTitelValue(event.target.value)}
              placeholder="Titel eingeben"
              />
              </FormControl>
              </Box>
              </Td>
              </Tr>
              <Tr>
                <Td>ISBN Number</Td>
                <Td>
                  <Box mb={4} maxW="300px">
                    <FormControl>
                    <Input
                    value={isbnValue}
                    onChange={(event) => setIsbnValue(event.target.value)}
                    />
                      <FormHelperText>Example: "9780131969452"</FormHelperText>
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
               <Td>Rating</Td>
                <Td>
                <Box maxW="300px">
        <Menu>
          <MenuButton as={Button}>
            {ratingValue !== null ? ratingValue : 'Choose'}
          </MenuButton>
          <MenuList>
            {[1, 2, 3, 4, 5].map((value) => (
              <MenuItem
                key={value}
                onClick={() => setRatingValue(value)}
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
                  <RadioGroup>
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
                  <Box maxW="300px">
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[0, 10]}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Rabatt</Td>
                <Td>
                  <Box maxW="300px">
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[0, 10]}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Lieferbar</Td>
                <Td>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0"></FormLabel>
                    <Switch 
                      id="lieferbar"
                      />
                  </FormControl>
                </Td>
              </Tr>
              <Tr>
                <Td>Erscheinungsjahr</Td>
                <Td>
                  <Box maxW="300px">
                    <NumberInput
                      defaultValue={currentYear}
                      min={1800}
                      max={currentYear}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
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
          </Table>
        </TableContainer>
      
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="4">
    <Button 
  onClick={() => {
    if (titelValue.trim() !== '' || isbnValue.trim() !== '' || ratingValue !== null) {
      setSearchClicked(true);
    } else {
      // Benutzer über leeres Suchfeld informieren
      toast({
        title: 'Achtung',
        description: 'Bitte geben Sie einen Titel oder eine ISBN für die Suche ein.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
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
              <Tr key={index}>
                <Td>{buch.titel.titel}</Td>
                <Td>{buch.isbn}</Td>
                <Td>{buch.rating}/5</Td>
                <Td>{buch.art}</Td>
                <Td>{buch.preis}€</Td>
                <Td>{(buch.rabatt * 100).toFixed(2)}%</Td>
                <Td>{buch.lieferbar ? 'Ja' : 'Nein'}</Td>
                <Td>{buch.datum}</Td>
                <Td><a href={buch.homepage} target="_blank" rel="noopener noreferrer">{buch.homepage}</a></Td>
                <Td>{buch.schlagwoerter.join(', ')}</Td>
                <Td><a href={buch._links.self.href} target="_blank" rel="noopener noreferrer">{buch._links.self.href}</a></Td>
             </Tr>
            ))}    
          </Tbody>
        </Table>
      </TableContainer>
    </div>
    );
  }
export default Buchsuchen;