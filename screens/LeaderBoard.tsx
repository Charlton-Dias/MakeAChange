import {
  Avatar,
  AvatarImage,
  Box,
  Divider,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';

const dummyUsers = [
  {
    username: 'Charlton.Dias',
    points: 3000,
    address: 'Goa',
    avatar: 'https://www.gravatar.com/avatar/',
  },
  {
    username: 'Baban.Gawas',
    points: 3000,
    address: 'Goa',
    avatar: 'https://www.gravatar.com/avatar/',
  },
  {
    username: 'JohnDoe12',
    points: 2800,
    address: 'Goa',
    avatar: 'https://www.gravatar.com/avatar/',
  },
  {
    username: 'Spiderman',
    points: 2700,
    address: 'Goa',
    avatar: 'https://www.gravatar.com/avatar/',
  },
  {
    username: 'Flash',
    points: 2600,
    address: 'Goa',
    avatar: 'https://www.gravatar.com/avatar/',
  },
];

const LeaderBoard = () => {
  return (
    <ScrollView m={10} showsVerticalScrollIndicator={false}>
      <Heading size="xl">Top 5 users</Heading>
      <Divider mb={5} />
      <Box
        backgroundColor="#EAFAFE"
        p={5}
        borderRadius={10}
        mb={10}
        borderWidth={1}
        borderColor="#DDDDDD">
        {dummyUsers.map(item => (
          <User username={item?.username} points={item?.points} />
        ))}
      </Box>

      <Heading size="xl">Users from your area</Heading>
      <Divider mb={5} />
      <Box
        backgroundColor="#EAFAFE"
        p={5}
        borderRadius={10}
        borderWidth={1}
        borderColor="#DDDDDD">
        {dummyUsers.map(item => (
          <User username={item?.username} points={item?.points} />
        ))}
      </Box>
    </ScrollView>
  );
};

export default LeaderBoard;

function User(props: any) {
  return (
    <Box m={5} borderRadius={10} p={5}>
      <HStack>
        <Avatar size="lg">
          <AvatarImage
            source={{
              uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
            }}
          />
        </Avatar>
        <VStack ml={10}>
          <Text size="lg" bold>
            {props?.username}
          </Text>
          <Text>{props?.points}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
