import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  InputField,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import SignInWith from '../components/SignInWith';
import SectionWrapper from '../components/SectionWrapper';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput, {FormRadioGroup} from '../components/FormInput';
import {Pressable} from 'react-native';
import {Input} from '@gluestack-ui/themed';

export default function Signup(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = () => {
    const formData = {
      username,
      password,
      email,
      phone,
      firstname,
      lastname,
      gender,
      date,
      address,
      city,
      state,
      country,
      zip,
    };
    console.log(formData);
  };

  return (
    <ScrollView backgroundColor="white">
      <FormControl>
        <Box display="flex" padding={'5%'}>
          <Center marginBottom={20}>
            <Heading>Signup</Heading>
          </Center>
          <SectionWrapper>
            <FormInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />

            <FormInput
              label="Email"
              placeholder="user@email.com"
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              type="password"
            />

            <FormInput
              label="Confirm Password"
              placeholder="Password"
              value={cpassword}
              onChangeText={setCPassword}
              type="password"
            />

            <FormInput
              label="Phone"
              placeholder="9876543210"
              value={phone}
              onChangeText={setPhone}
            />
          </SectionWrapper>

          <SectionWrapper>
            <FormInput
              label="First Name"
              placeholder="Jon"
              value={firstname}
              onChangeText={setFirstname}
            />

            <FormInput
              label="Last Name"
              placeholder="Doe"
              value={lastname}
              onChangeText={setLastname}
            />

            <FormRadioGroup
              label="Gender: "
              options={[
                {value: '1', label: 'Male'},
                {value: '2', label: 'Female'},
              ]}
              value={gender}
              onChange={setGender}
            />

            <FormControlLabel mb="$1" mt={5}>
              <FormControlLabelText>DOB:</FormControlLabelText>
            </FormControlLabel>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Input isDisabled>
                <InputField>{date.toDateString()}</InputField>
              </Input>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                  setShowDatePicker(false);
                }}
              />
            )}
          </SectionWrapper>

          <SectionWrapper>
            <FormInput
              label="Address"
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <FormInput
              label="City"
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <FormInput
              label="State"
              placeholder="State"
              value={state}
              onChangeText={setState}
            />

            <FormInput
              label="Country"
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />

            <FormInput
              label="Zip"
              placeholder="Zip"
              value={zip}
              onChangeText={setZip}
            />
          </SectionWrapper>

          <Button
            size="sm"
            alignSelf="center"
            width={'100%'}
            marginTop={10}
            onPress={() => {
              handleSubmit();
              navigation.navigate('User');
            }}>
            <ButtonText>Sign up</ButtonText>
          </Button>

          <Button
            size="sm"
            variant="link"
            marginTop={10}
            onPress={() => navigation.navigate('Login')}>
            <Text>Already have an account? </Text>
            <ButtonText>Login </ButtonText>
          </Button>

          <SignInWith />
        </Box>
      </FormControl>
    </ScrollView>
  );
}
