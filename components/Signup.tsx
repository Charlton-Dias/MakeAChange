import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  CircleIcon,
  GluestackUIProvider,
  Heading,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import InputWithLabel from './InputWithLabel';
import {Radio} from '@gluestack-ui/themed';
import SignInWith from './SignInWith';
import SectionWrapper from './SectionWrapper';
// import DateTimePicker from '@react-native-community/datetimepicker';

export default function Signup(): JSX.Element {
  // const [date, setDate] = useState(new Date(1598051730000));

  return (
    <GluestackUIProvider config={config}>
      <ScrollView>
        <Box display="flex" padding={'5%'}>
          <Center marginBottom={20}>
            <Heading>Signup</Heading>
          </Center>
          <SectionWrapper>
            <InputWithLabel name={'Username'} />
            <InputWithLabel name={'Password'} type="password" />
            <InputWithLabel name={'Confirm Password'} type="password" />
            <InputWithLabel name={'Email'} />
            <InputWithLabel name={'Phone'} />
          </SectionWrapper>

          <SectionWrapper>
            <InputWithLabel name={'First Name'} />
            <InputWithLabel name={'Last Name'} />
            <Box display={'flex'} flexDirection="row">
              <Text>Gender: </Text>
              <RadioGroup>
                <Radio value="1" size="md">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Male</RadioLabel>
                </Radio>
                <Radio value="2" size="md">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Female</RadioLabel>
                </Radio>
              </RadioGroup>
            </Box>
            {/* <InputWithLabel name={'Date of birth'}  />
            <DateTimePicker value={date} /> */}
          </SectionWrapper>

          <SectionWrapper>
            <InputWithLabel name={'Address'} />
            <InputWithLabel name={'City'} />
            <InputWithLabel name={'State'} />
            <InputWithLabel name={'Country'} />
            <InputWithLabel name={'Zip'} />
          </SectionWrapper>

          <Button size="sm" alignSelf="center" width={'100%'} marginTop={10}>
            <ButtonText>Sign up</ButtonText>
          </Button>

          <Button size="sm" variant="link" marginTop={10}>
            <Text>Already have an account? </Text>
            <ButtonText>Login </ButtonText>
          </Button>

          <SignInWith />
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
}
