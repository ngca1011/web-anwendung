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
    useToast,
    RangeSliderMark,
  } from "@chakra-ui/react";
import {useState} from "react"; 
import { MdGraphicEq } from "react-icons/md";

function RangeSliderMarkRating() {
  const [sliderValue, setSliderValue] = useState([0, 5])
  return (
    <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 5]} 
          min={0} max={10} onChange={(val) => setSliderValue(val)}>
      <RangeSliderMark value={5} mt='1' ml='-2,5' fontSize='sm'>
        5
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[1]}
        textAlign='center'
        bg='blue'
        color='white'
        mt='-7'
        ml='-1.5'
        width='6'
        height='6'
        border-radius='50%'
      >{sliderValue[1]}
      </RangeSliderMark>
      <RangeSliderTrack>
        <RangeSliderFilledTrack/>
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={3} index={1}>
        <Box color='tomato' as={MdGraphicEq} />
      </RangeSliderThumb>
    </RangeSlider>
  )
}

function RangeSliderPreis() {
  const [sliderValue, setSliderValue] = useState([10, 50])
  return (
    <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 50]} 
          min={0} max={100} onChange={(val) => setSliderValue(val)}>
      <RangeSliderMark value={50} mt='1' ml='-2,5' fontSize='sm'>
        50
      </RangeSliderMark>
      <RangeSliderMark value={10} mt='1' ml='-2.5' fontSize='sm'>
        10
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[0]}
        textAlign='center'
        bg='blue'
        color='white'
        mt='-7'
        ml='-1.5'
        w='8'
      >{sliderValue[0]}€
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[1]}
        textAlign='center'
        bg='blue'
        color='white'
        mt='-7'
        ml='-1.5'
        width='8'
      >{sliderValue[1]}€
      </RangeSliderMark>
      <RangeSliderTrack>
        <RangeSliderFilledTrack/>
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={4} index={0}>
        <Box color='tomato' as={MdGraphicEq} />
      </RangeSliderThumb>
      <RangeSliderThumb boxSize={3} index={1}>
        <Box color='tomato' as={MdGraphicEq} />
      </RangeSliderThumb>
    </RangeSlider>
  )
}

function RangeSliderRabatt() {
  const [sliderValue, setSliderValue] = useState([25, 75])
  return (
    <RangeSlider aria-label={['min', 'max']} defaultValue={[25, 75]} 
          min={0} max={100} onChange={(val) => setSliderValue(val)}>
      <RangeSliderMark value={75} mt='1' ml='-2,5' fontSize='sm'>
        75
      </RangeSliderMark>
      <RangeSliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
        25
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[0]}
        textAlign='center'
        bg='blue'
        color='white'
        mt='-7'
        ml='-1.5'
        w='8'
      >{sliderValue[0]}%
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[1]}
        textAlign='center'
        bg='blue'
        color='white'
        mt='-7'
        ml='-1.5'
        width='8'
      >{sliderValue[1]}%
      </RangeSliderMark>
      <RangeSliderTrack>
        <RangeSliderFilledTrack/>
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={4} index={0}>
        <Box color='tomato' as={MdGraphicEq} />
      </RangeSliderThumb>
      <RangeSliderThumb boxSize={3} index={1}>
        <Box color='tomato' as={MdGraphicEq} />
      </RangeSliderThumb>
    </RangeSlider>
  )
}
  const currentYear = new Date().getFullYear();

  const Buchsuchen = () => {
    const toast = useToast();
  
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
                      <Input />
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>ISBN Number</Td>
                <Td>
                  <Box mb={4} maxW="300px">
                    <FormControl>
                      <Input />
                      <FormHelperText>Example: "9780131969452"</FormHelperText>
                    </FormControl>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Rating</Td>
                <Td>
                  <Box mb={4} maxW="300px">
                        <RangeSliderMarkRating />
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
                    <RangeSliderPreis/>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Rabatt</Td>
                <Td>
                  <Box maxW="300px">
                    <RangeSliderRabatt/>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Lieferbar</Td>
                <Td>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0"></FormLabel>
                    <Switch id="lieferbar" />
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
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
      <Tr>
        
      <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

    </div>
    );
  }
  export default Buchsuchen;
