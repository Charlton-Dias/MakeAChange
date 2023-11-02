import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';

const LeaderBoard = () => {
  return (
    <Box backgroundColor="#EAFAFE" m={10} p={5}>
      {[...Array(5).keys()].map(() => (
        <User />
      ))}
    </Box>
  );
};

export default LeaderBoard;

function User() {
  return (
    <Box m={5} borderRadius={10} p={5} backgroundColor="#eff">
      <HStack>
        <Avatar size="lg">
          <AvatarImage
            source={{
              uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
            }}
          />
        </Avatar>
        <VStack ml={4}>
          <Text size="lg">Username</Text>
          <Text>2500</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
