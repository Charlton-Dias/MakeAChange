import {
  Box,
  ButtonIcon,
  ButtonText,
  Center,
  Heading,
  View,
} from '@gluestack-ui/themed';
import {Pressable} from '@gluestack-ui/themed';
import {Button} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignInWith() {
  return (
    <>
      <View mb={80} mt={10}>
        <Divider marginVertical={10} width={80} alignSelf="center" />
        <Center>
          <Heading
            backgroundColor="white"
            width={50}
            mt={-28}
            textAlign="center">
            OR
          </Heading>
        </Center>
        <Box mt={10}>
          <Button action="secondary">
            <Icon name="google" size={24} color={'white'} />
            <ButtonText ml={10}>Sign in with Google</ButtonText>
          </Button>
        </Box>
      </View>
    </>
  );
}
