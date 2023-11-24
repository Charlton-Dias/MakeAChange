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

type ErrorProps = {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  phone?: string;
};

export default function Signup({navigation}: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [cpassword, setCPassword] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [errors, setErrors] = useState<ErrorProps>({});

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    try {
      let newErrors = {};
      if (!username) {
        newErrors = {
          ...newErrors,
          username: 'Username is required.',
        };
      } else if (username?.length < 5) {
        newErrors = {
          ...newErrors,
          username: 'Username should be of at least 5 characters.',
        };
      }

      if (!name) {
        newErrors = {
          ...newErrors,
          name: 'Name is required.',
        };
      }

      if (!email) {
        newErrors = {
          ...newErrors,
          email: 'Email is required.',
        };
      } else if (!isValidEmail(email)) {
        newErrors = {
          ...newErrors,
          email: 'Invalid email address.',
        };
      }

      if (!password || password.length < 6) {
        newErrors = {
          ...newErrors,
          password: 'Password should be at least 6 characters.',
        };
      }
      if (!cpassword) {
        newErrors = {
          ...newErrors,
          cpassword: 'Please retype the password.',
        };
      } else if (password !== cpassword) {
        newErrors = {
          ...newErrors,
          cpassword: 'Passwords do not match.',
        };
      }

      if (!phone) {
        newErrors = {
          ...newErrors,
          phone: 'Phone number is required.',
        };
      } else if (!isValidPhoneNumber(phone)) {
        newErrors = {
          ...newErrors,
          phone: 'Invalid phone number.',
        };
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
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
              error={errors?.username}
            />
            <FormInput
              label=" Name"
              placeholder="Jon Doe"
              value={name}
              onChangeText={setName}
              error={errors?.name}
            />
            <FormInput
              label="Email"
              placeholder="user@email.com"
              value={email}
              onChangeText={setEmail}
              error={errors?.email}
            />

            <FormInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              type="password"
              error={errors?.password}
            />

            <FormInput
              label="Confirm Password"
              placeholder="Password"
              value={cpassword}
              onChangeText={setCPassword}
              type="password"
              error={errors?.cpassword}
            />

            <FormInput
              label="Phone"
              //keyboardType="numeric"
              placeholder="9876543210"
              value={phone}
              onChangeText={setPhone}
              error={errors?.phone}
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
