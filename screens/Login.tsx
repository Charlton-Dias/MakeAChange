import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWith from '../components/SignInWith';
import SectionWrapper from '../components/SectionWrapper';
import FormInput from '../components/FormInput';

export default function Login({navigation}: any): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const formData = {username, password};
    console.log(formData);
  };
  return (
    <ScrollView>
      <Box display="flex" padding={'5%'}>
        <Center marginTop={80} marginBottom={20}>
          <Icon name="user" size={100} color={'#222'} />
          <Heading>Login</Heading>
        </Center>

        <SectionWrapper>
          <FormInput
            label="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <FormInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          <Button size="sm" variant="link">
            <ButtonText textAlign="left">Forgot password?</ButtonText>
          </Button>

          <Button
            size="sm"
            alignSelf="center"
            width={'100%'}
            marginTop={10}
            onPress={() => {
              handleSubmit();
              navigation.navigate('User');
            }}>
            <ButtonText>Login</ButtonText>
          </Button>
        </SectionWrapper>

        <Button
          size="sm"
          variant="link"
          marginTop={10}
          onPress={() => navigation.navigate('Sign up')}>
          <Text>Don't have an account? </Text>
          <ButtonText>Sign up</ButtonText>
        </Button>

        <SignInWith />
      </Box>
    </ScrollView>
  );
}
