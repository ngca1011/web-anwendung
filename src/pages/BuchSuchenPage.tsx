import {  FormHelperText, Input, RangeSlider, Radio, RadioGroup, Stack, Switch, FormControl, FormLabel,
    RangeSliderTrack, NumberInput, Table,
    Thead,Tbody  ,Tr ,Th ,Td ,
    TableCaption, TableContainer,
    NumberInputField,NumberInputStepper,NumberIncrementStepper,
    NumberDecrementStepper, Box, RangeSliderFilledTrack, RangeSliderThumb, } from "@chakra-ui/react"

    const currentYear = new Date().getFullYear();

export default function Buchsuchen() {
    return (
       <div>
        <TableContainer>
<Table variant='simple'>
  <TableCaption>Suchkriterien</TableCaption>
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
        <Input/>
        </FormControl>
        </Box>
      </Td>
    </Tr>
    <Tr>
      <Td>ISBN Number</Td>
      <Td>
      <Box mb={4} maxW="300px">
        <FormControl>
        <Input/>
        <FormHelperText>Example: "9780131969452"</FormHelperText>
        </FormControl>
        </Box>
      </Td>
    </Tr>
    <Tr>
      <Td>Rating</Td>
      <Td>
      <Box mb={4} maxW="300px">
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
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
            <RadioGroup>
                <Stack direction='row'>
                    <Radio value='1'>Druckausgabe</Radio>
                    <Radio value='2'>Kindle</Radio>
                </Stack>
            </RadioGroup>
            </Box>

        </Td>
      </Tr>
      <Tr>
        <Td>Preis</Td>
        <Td>
        <Box maxW="300px">
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
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
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            </Box></Td>
      </Tr>
      <Tr>
        <Td>Lieferbar</Td>
        <Td>
            <FormControl display='flex' alignItems='center'>
                 <FormLabel mb='0'>
                </FormLabel>
                <Switch id='lieferbar' />
            </FormControl></Td>
      </Tr>
      <Tr>
        <Td>Erscheinungsjahr</Td>
        <Td>
        <Box maxW="300px">
            <NumberInput defaultValue={currentYear} min={1800} max={currentYear}>
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
        <Input/>
        </FormControl>
        </Box>
        </Td>
      </Tr>
  </Tbody>
</Table>
</TableContainer>

        </div>

)
}