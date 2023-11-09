import {Box, Center, Heading} from '@gluestack-ui/themed';
import {Pressable} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignInWith() {
  return (
    <>
      <Divider marginVertical={10} alignSelf="center" />
      <Center>
        <Heading backgroundColor="white" mt={-28}>
          OR
        </Heading>
      </Center>
      <Box mt={10} mb={80}>
        <Box flexDirection="row" justifyContent="space-between">
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
    </>
  );
}
