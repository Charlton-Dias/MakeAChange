import React from 'react';
import {
  View,
  Text,
  Image,
  HStack,
  VStack,
  Button,
  ButtonText,
  Divider,
} from '@gluestack-ui/themed';

interface DashboardProps {
  avatar?: string;
  username: string;
  points: number;
  address?: string;
}

export default function Dashboard({
  avatar,
  username,
  points,
  address,
}: DashboardProps): JSX.Element {
  return (
    <>
      <ProfileCard
        avatar={avatar}
        username={username}
        address={address}
        points={points}
      />
      <Divider alignSelf="center" width={'95%'} />
    </>
  );
}

const ProfileCard = (props: any) => (
  <View
    margin={10}
    p={15}
    backgroundColor="#C8F5FF"
    borderRadius={10}
    borderWidth={1}
    borderColor="#8DEBFF">
    <HStack display="flex" flexDirection="row" mb={10}>
      <Image
        borderWidth={2}
        borderColor="black"
        source={{
          uri: props?.avatar
            ? props?.avatar
            : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        }}
        alt="avatar"
        style={{width: 100, height: 100}}
        borderRadius={50}
      />

      <VStack marginLeft={20}>
        <Text size="lg" bold>
          {props?.username}
        </Text>
        <Text>{props?.username}</Text>
        <Text>points: {props?.points}</Text>
        <Text>{props?.address}</Text>
      </VStack>
    </HStack>
    <Button isDisabled>
      <ButtonText>Edit Profile</ButtonText>
    </Button>
  </View>
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   points: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   address: {
//     fontSize: 16,
//   },
// });
