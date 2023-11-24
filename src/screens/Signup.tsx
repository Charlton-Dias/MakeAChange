import React, {useState} from 'react';
import {
  Alert as GsAlert,
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
  Pressable,
} from '@gluestack-ui/themed';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FormInput from '../components/FormInput';
import SectionWrapper from '../components/SectionWrapper';
import {StackParamList} from '../types';

type Props = NativeStackScreenProps<StackParamList, 'Signup'>;

const registerUser = async ({userAuth, userData}: any) => {
  try {
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
    await firestore().collection('users').add({uid: uid, userData});
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

export default function Signup({ navigation }: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [errorNotifications, setErrorNotifications] = useState<{ [key: string]: string }>({});

  const showErrorNotification = (field: string, message: string) => {
    setErrorNotifications((prevErrors) => ({ ...prevErrors, [field]: message }));
  };

  const clearErrorNotification = (field: string) => {
    setErrorNotifications((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    const querySnapshot = await firestore().collection('users').where('username', '==', username).get();
    return false;
  };

const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    const methods = await auth().fetchSignInMethodsForEmail(email);

    return (methods.length === 0);
  } catch (error) {
    console.error('Error checking email availability:', error);
    return false; 
  }
};

  const checkPhoneAvailability = async (phone: string): Promise<boolean> => {
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const errors: { [key: string]: string } = {};

      if (!username) {
        errors.username = 'Username is required';
        showErrorNotification('username', 'Username is required');
      } else if (!(await checkUsernameAvailability(username))) {
        errors.username = 'Username is already taken';
        showErrorNotification('username', 'Username is already taken');
      } else {
        clearErrorNotification('username');
      }

      if (!name) {
        errors.name = 'Name is required';
        showErrorNotification('name', 'Name is required');
      } else {
        clearErrorNotification('name');
      }

      if (!email) {
        errors.email = 'Email is required';
        showErrorNotification('email', 'Email is required');
      } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email address';
        showErrorNotification('email', 'Invalid email address');
      } else if (!(await checkEmailAvailability(email))) {
        errors.email = 'Email is already in use';
        showErrorNotification('email', 'Email is already in use');
      } else {
        clearErrorNotification('email');
      }

      if (!password) {
        errors.password = 'Password is required';
        showErrorNotification('password', 'Password is required');
      } else {
        clearErrorNotification('password');
      }

      if (!cpassword) {
        errors.cpassword = 'Confirm Password is required';
        showErrorNotification('cpassword', 'Confirm Password is required');
      } else if (password !== cpassword) {
        errors.cpassword = 'Passwords do not match';
        showErrorNotification('cpassword', 'Passwords do not match');
      } else {
        clearErrorNotification('cpassword');
      }

      if (!phone) {
        errors.phone = 'Phone is required';
        showErrorNotification('phone', 'Phone is required');
      } else if (!isValidPhoneNumber(phone)) {
        errors.phone = 'Invalid phone number';
        showErrorNotification('phone', 'Invalid phone number');
      } else if (!(await checkPhoneAvailability(phone))) {
        errors.phone = 'Phone number is already in use';
        showErrorNotification('phone', 'Phone number is already in use');
      } else {
        clearErrorNotification('phone');
      }

      if (Object.keys(errors).length > 0) {
        setLoading(false);
        throw errors;
      }

      await registerUser({
        userAuth: { email, password },
        userData: { username, phone, name },
      });
      setLoading(false);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string): boolean => {
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
              onChangeText={async text => {
                setUsername(text);
                clearErrorNotification('username');
                if (!(await checkUsernameAvailability(text))) {
                  showErrorNotification(
                    'username',
                    'Username is already taken',
                  );
                }
              }}
            />
            {errorNotifications.username && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.username}</Text>
                <Pressable onPress={() => clearErrorNotification('username')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

            <FormInput
              label="Name"
              placeholder="Jon Doe"
              value={name}
              onChangeText={text => {
                setName(text);
                clearErrorNotification('name');
              }}
            />
            {errorNotifications.name && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.name}</Text>
                <Pressable onPress={() => clearErrorNotification('name')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

            <FormInput
              label="Email"
              placeholder="user@email.com"
              value={email}
              onChangeText={async text => {
                setEmail(text);
                clearErrorNotification('email');
                if (!isValidEmail(text)) {
                  showErrorNotification('email', 'Invalid email address');
                } else if (!(await checkEmailAvailability(text))) {
                  showErrorNotification('email', 'Email is already in use');
                }
              }}
            />
            {errorNotifications.email && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.email}</Text>
                <Pressable onPress={() => clearErrorNotification('email')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

            <FormInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                clearErrorNotification('password');
              }}
              type="password"
            />
            {errorNotifications.password && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.password}</Text>
                <Pressable onPress={() => clearErrorNotification('password')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

            <FormInput
              label="Confirm Password"
              placeholder="Password"
              value={cpassword}
              onChangeText={text => {
                setCPassword(text);
                clearErrorNotification('cpassword');
              }}
              type="password"
            />
            {errorNotifications.cpassword && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.cpassword}</Text>
                <Pressable onPress={() => clearErrorNotification('cpassword')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

            <FormInput
              label="Phone"
              placeholder="9876543210"
              value={phone}
              onChangeText={async text => {
                setPhone(text);
                clearErrorNotification('phone');
                if (!isValidPhoneNumber(text)) {
                  showErrorNotification('phone', 'Invalid phone number');
                } else if (!(await checkPhoneAvailability(text))) {
                  showErrorNotification(
                    'phone',
                    'Phone number is already in use',
                  );
                }
              }}
            />
            {errorNotifications.phone && (
              <GsAlert
                status="error"
                mb="4"
                justifyContent="space-between"
                flexDirection="row">
                <Text color="black">{errorNotifications.phone}</Text>
                <Pressable onPress={() => clearErrorNotification('phone')}>
                  <Text color="red" style={{textDecorationLine: 'underline'}}>
                    Close
                  </Text>
                </Pressable>
              </GsAlert>
            )}

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
        </Box>
      </FormControl>
      <View mb={60} />
    </ScrollView>
  );
}
