import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  Heading,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
// import SignInWith from '../components/SignInWith';
import SectionWrapper from '../components/SectionWrapper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import type {StackParamList} from '../types';

const registerUser = async ({userAuth, userData}: any) => {
  try {
    // Register user with Firebase Authentication
    const {email, password} = userAuth;
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (!userCredential.user?.uid) {
      throw new Error('Failed to create account');
    }

    const user = userCredential.user;
    const uid = user.uid;
    // Store additional details in Firestore
    await firestore().collection('users').add({uid: uid, userData});
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

type Props = NativeStackScreenProps<StackParamList, 'Signup'>;

export default function Signup({navigation}: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country, setCountry] = useState('');
  // const [zip, setZip] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const errors: {[key: string]: string} = {};

      if (!username) {
        errors.username = 'Username is required';
      }

      if (!name) {
        errors.name = 'Name is required';
      }

      if (!email) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email address';
      }

      if (!password) {
        errors.password = 'Password is required';
      }

      if (!cpassword) {
        errors.cpassword = 'Confirm Password is required';
      } else if (password !== cpassword) {
        errors.cpassword = 'Passwords do not match';
      }

      if (!phone) {
        errors.phone = 'Phone is required';
      } else if (!isValidPhoneNumber(phone)) {
        errors.phone = 'Invalid phone number';
      }

      // Check if there are any errors
      if (Object.keys(errors).length > 0) {
        setLoading(false);
        throw errors;
      }

      // Perform the signup
      await registerUser({
        userAuth: {email, password},
        userData: {username, phone, name},
      });
      setLoading(false);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error: ', error);
      // Handle the errors and show messages to the user
      // For example, you can update the state to display error messages next to the input fields
    }
  };

  // ... (same as before)

  const isValidEmail = (email: string): boolean => {
    // Add your email validation logic here
    // For simplicity, a basic regex pattern is used in this example
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string): boolean => {
    // Add your phone number validation logic here
    // For simplicity, a basic regex pattern is used in this example
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <ScrollView backgroundColor="white">
      <FormControl>
        <Box display="flex" padding={'5%'}>
          <Center marginTop={40} marginBottom={20}>
            <Icon name="user" size={100} color={'#222'} />
            <Heading>Sign up</Heading>
          </Center>
          <SectionWrapper>
            <FormInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <FormInput
              label=" Name"
              placeholder="Jon Doe"
              value={name}
              onChangeText={setName}
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
              //keyboardType="numeric"
              placeholder="9876543210"
              value={phone}
              onChangeText={setPhone}
            />

            <Button
              size="sm"
              alignSelf="center"
              width={'100%'}
              marginTop={10}
              onPress={handleSubmit}
              isDisabled={loading}>
              {loading ? <ButtonSpinner /> : <ButtonText>Sign up</ButtonText>}
            </Button>
          </SectionWrapper>

          {/* <SectionWrapper>
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
          </SectionWrapper> */}

          <Button
            size="sm"
            variant="link"
            onPress={() => navigation.navigate('Login')}>
            <Text>Already have an account? </Text>
            <ButtonText>Login </ButtonText>
          </Button>

          {/* <SignInWith /> */}
        </Box>
      </FormControl>
      <View mb={60} />
    </ScrollView>
  );
}
