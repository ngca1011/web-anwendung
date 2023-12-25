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
    interface Book {
      title: string;
      isbn: string;
      rating: number;
      bookType: string;
      price: number;
      discount: number;
      available: boolean;
      releaseYear: number;
      homepage: string;
    }
    
    const [books, setBooks] = useState<Book[]>([]);   
    const [searchParams, setSearchParams] = useState({
      title: '',
      isbn: '',
      rating: [0, 10],
      bookType: '',
      price: [0, 10],
      discount: [0, 10],
      available: false,
      releaseYear: currentYear, //muss nicht das aktuelle Jahr sein
      homepage: '',
    });


    const handleInputChange = (field: string, value: string | number | boolean | number[]) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [field]: value,
      }));
    };
  
  
    const searchBooks = async () => {
      try {
        const url = 'https://localhost:3000/rest';

        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setBooks(response.data);
        } else {
          console.error('Fehler bei der Anfrage');
        }
      } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
      }
    };
  
    useEffect(() => {
      searchBooks();
    }, [searchParams]);
  
    const handleRatingChange = (values: number[]) => {
      handleInputChange('rating', values);
    };
  
    const handlePriceChange = (values: number[]) => {
      handleInputChange('price', values);
    };
  
    const handleDiscountChange = (values: number[]) => {
      handleInputChange('discount', values);
    };

    const handleRadioButtonChange = (field: string, value: string) => {
      handleInputChange(field, value);
    };

    const handleReleaseYearChange = (value: string | number) => {
      handleInputChange('releaseYear', value);
    };

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
                    <Input onChange={(e) => handleInputChange('title', e.target.value)} />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>ISBN Number</Td>
                <Td>
                  <Box mb={4} maxW="300px">
                    <FormControl>
                    <Input onChange={(e) => handleInputChange('isbn', e.target.value)} />
                      <FormHelperText>Example: "9780131969452"</FormHelperText>
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Rating</Td>
                <Td>
                  <Box mb={4} maxW="300px">
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[0, 10]}
                      onChange={(values) => handlePriceChange(values)}
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
                <Td>Buchart</Td>
                <Td>
                  <Box mb={4}>
                  <RadioGroup onChange={(value) => handleRadioButtonChange('bookType', value)}>
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
                      onChange={(values) => handleRatingChange(values)}
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
                      onChange={(values) => handleDiscountChange(values)}
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
                      onChange={(e) => handleInputChange('available', e.target.checked)} 
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
                      onChange={(value) => handleReleaseYearChange(value)}
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
            const examplePromise = new Promise((resolve) => {
              setTimeout(() => resolve(200), 1000);
            });

            toast.promise(examplePromise, {
              success: { title: 'Erfolgreich', description: 'Buch gefunden' },
              error: { title: 'Fehler', description: 'Suche konnte nicht durchgeführt werden' },
              loading: { title: 'Bitte warten', description: 'Vorgang wird ausgeführt' },
            });
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
              <Th>ISBN Nummer</Th>
              <Th>Rating</Th>
              <Th>Buchart</Th>
              <Th>Preis</Th>
              <Th>Rabatt</Th>
              <Th>Lieferbar</Th>
              <Th>Erscheinungsjahr</Th>
              <Th>Homepage</Th>
            </Tr>
          </Thead>
          <Tbody>
          {Array.isArray(books) && books.map((book1, index) => (
              <Tr key={index}>
                <Td>{book1.title}</Td>
                <Td>{book1.isbn}</Td>
                <Td>{book1.rating}</Td>
                <Td>{book1.bookType}</Td>
                <Td>{book1.price}</Td>
                <Td>{book1.discount}</Td>
                <Td>{book1.available ? 'Ja' : 'Nein'}</Td>
                <Td>{book1.releaseYear}</Td>
                <Td>{book1.homepage}</Td>
              </Tr>
            ))}    
          </Tbody>
        </Table>
      </TableContainer>
    </div>
    );
  }
  export default Buchsuchen;
