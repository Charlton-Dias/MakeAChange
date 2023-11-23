import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import FormInput from '../components/FormInput';
import SectionWrapper from '../components/SectionWrapper';

type Props = NativeStackScreenProps<StackParamList, 'Signup'>;

export default function Login({navigation}: Props): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error('Enter email and password');
      }
      await auth().signInWithEmailAndPassword(email, password);
      console.log('success');
    } catch (error) {
      alert('Email or Password is incorrect!');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        throw new Error('Enter your email to reset the password.');
      }

      await auth().sendPasswordResetEmail(email);

      alert('Password reset email sent. Check your email inbox.');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <ScrollView backgroundColor="white">
      <Box display="flex" padding={'5%'}>
        <Center marginTop={80} marginBottom={20}>
          <Icon name="user" size={100} color={'#222'} />
          <Heading>Login</Heading>
        </Center>

        <SectionWrapper>
          <FormInput
            label="Email"
            placeholder="Email"
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
          <Button size="sm" variant="link" onPress={handleForgotPassword}>
            <ButtonText textAlign="left">Forgot password?</ButtonText>
          </Button>

          <Button
            size="sm"
            alignSelf="center"
            width={'100%'}
            marginTop={10}
            disabled={loading}
            onPress={handleSubmit}>
            {loading ? <ButtonSpinner /> : <ButtonText>Login</ButtonText>}
          </Button>
        </SectionWrapper>

        <Button
          size="sm"
          variant="link"
          onPress={() => navigation.navigate('Signup')}>
          <Text>Don't have an account? </Text>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </Box>
    </ScrollView>
  );
}
