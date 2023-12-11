import { Heading, FormHelperText, Input, RangeSlider, Radio, RadioGroup, Stack, Switch, FormControl, FormLabel,
    RangeSliderTrack, NumberInput,
    NumberInputField,NumberInputStepper,NumberIncrementStepper,
    NumberDecrementStepper, Box, RangeSliderFilledTrack, RangeSliderThumb, } from "@chakra-ui/react"

    const currentYear = new Date().getFullYear();

export default function Buchsuchen() {
    return (
       <div>
       <Heading size="md">
            BUCH SUCHEN PAGE
        </Heading>

        <Heading size="l">
            Titel
        </Heading>
        <Box mb={4} maxW="300px">
        <FormControl>
        <Input/>
        </FormControl>
        </Box>
        

        <Heading size="l">
            ISBN Number
        </Heading>
        <Box mb={4} maxW="300px">
        <FormControl>
        <Input/>
        <FormHelperText>Example: "9780131969452"</FormHelperText>
        </FormControl>
        </Box>
            <Heading size="l">
                Rating
            </Heading>
            <Box mb={4} maxW="300px">
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            </Box>

            <Box mb={4}>
                <Heading size="l">
                    Buchart
                </Heading>
            <RadioGroup>
                <Stack direction='row'>
                    <Radio value='1'>Druckausgabe</Radio>
                    <Radio value='2'>Kindle</Radio>
                </Stack>
            </RadioGroup>
            </Box>

            <Heading mb={4} size="l">
                Preis
            </Heading>
            <Box maxW="300px">
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            </Box>

            <Heading mb={4} size="l">
                Rabatt
            </Heading>
            <Box maxW="300px">
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 10]}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            </Box>
            
            <FormControl display='flex' alignItems='center'>
                 <FormLabel mb='0'>
                    <Heading mb={4} size="l">
                        Lieferbar
                    </Heading>
                </FormLabel>
                <Switch id='lieferbar' />
            </FormControl>

            <Heading mb={4} size="l">
                Erscheinungsjahr
            </Heading>
            <Box maxW="300px">
                <NumberInput defaultValue={currentYear} min={1800} max={currentYear}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

        <Heading mb={4} size="l">
            Homepage
        </Heading>
        <Box maxW="300px">
        <FormControl>
        <Input/>
        </FormControl>
        </Box>

        </div>

)
}