import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import InputWithLabel from '../components/InputWithLabel';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWith from '../components/SignInWith';
import SectionWrapper from '../components/SectionWrapper';

export default function Login({navigation}: any): JSX.Element {
  return (
    <ScrollView>
      <Box display="flex" padding={'5%'}>
        <Center marginTop={80} marginBottom={20}>
          <Icon name="user" size={100} color={'#222'} />
          <Heading>Login</Heading>
        </Center>

        <SectionWrapper>
          <InputWithLabel name={'Username'} />
          <InputWithLabel name={'Password'} type={'password'} />

          <Button size="sm" variant="link">
            <ButtonText textAlign="left">Forgot password?</ButtonText>
          </Button>

          <Button
            size="sm"
            alignSelf="center"
            width={'100%'}
            marginTop={10}
            onPress={() => navigation.navigate('User')}>
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
