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
import {useNavigation} from '@react-navigation/native';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default function Signup(): JSX.Element {
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

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!username || !password || !cpassword || !email || !phone) {
        setLoading(false);
        throw new Error('All fields are required');
      }

      if (password !== cpassword) {
        setPassword('');
        setCPassword('');
        setLoading(false);
        throw new Error('Passwords do not match');
      }

      const userAuth = {
        email,
        password,
      };
      const userData = {
        username,
        phone,
        name,
        // city,
        // state,
        // country,
        // zip,
      };

      // Perform the signup

      await registerUser({userAuth, userData});
      setLoading(false);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error: ', error.message);
    }
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