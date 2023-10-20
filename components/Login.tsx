import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  Divider,
  GluestackUIProvider,
  Heading,
  Pressable,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import InputWithLabel from './InputWithLabel';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <ScrollView>
        <Box display="flex">
          <Center marginTop={80} marginBottom={20}>
            <Icon name="user" size={100} color={'#222'} />
            <Heading>Login</Heading>
          </Center>

          <InputWithLabel name={'Username'} type={'text'} />
          <InputWithLabel name={'Password'} type={'password'} />

          <Button size="sm" variant="link">
            <ButtonText textAlign="left">Forgot password?</ButtonText>
          </Button>

          <Button size="sm" alignSelf="center" width={'90%'} marginTop={10}>
            <ButtonText>Login</ButtonText>
          </Button>

          <Button size="sm" variant="link" marginTop={10}>
            <Text>Don't have an account? </Text>
            <ButtonText>Sign up</ButtonText>
          </Button>

          <Divider marginTop={10} width={'90%'} alignSelf="center" />

          <Box p={'5%'}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              paddingHorizontal={5}>
              <Text>Sign in with:</Text>
              <Pressable onPress={() => console.log('google')}>
                <Icon name="google" size={24} color={'#222'} />
              </Pressable>
              <Pressable onPress={() => console.log('rich people')}>
                <Icon name="apple" size={24} color={'#222'} />
              </Pressable>
              <Pressable onPress={() => console.log('fb')}>
                <Icon name="facebook" size={24} color={'#222'} />
              </Pressable>
              <Pressable onPress={() => console.log('x')}>
                <Icon name="twitter" size={24} color={'#222'} />
              </Pressable>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
}
