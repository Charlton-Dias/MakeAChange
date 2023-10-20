import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  GluestackUIProvider,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import InputWithLabel from './InputWithLabel';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWith from './SignInWith';
import SectionWrapper from './SectionWrapper';

export default function Login({
  handleUser,
}: {
  handleUser: () => void;
}): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <ScrollView>
        <Box display="flex" padding={'5%'}>
          <Center marginTop={80} marginBottom={20}>
            <Icon name="user" size={100} color={'#222'} />
            <Heading>Login</Heading>
          </Center>

          <SectionWrapper>
            <InputWithLabel name={'Username'} />
            <InputWithLabel name={'Password'} type={'password'} />
            {/* </SectionWrapper> */}

            <Button size="sm" variant="link">
              <ButtonText textAlign="left">Forgot password?</ButtonText>
            </Button>

            <Button
              size="sm"
              alignSelf="center"
              width={'100%'}
              marginTop={10}
              onPress={handleUser}>
              <ButtonText>Login</ButtonText>
            </Button>
          </SectionWrapper>

          <Button size="sm" variant="link" marginTop={10}>
            <Text>Don't have an account? </Text>
            <ButtonText>Sign up</ButtonText>
          </Button>

          <SignInWith />
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
}
