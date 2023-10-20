import React from 'react';
import {
  View,
  Text,
  Image,
  HStack,
  VStack,
  Button,
  ButtonText,
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
    <View margin="5%">
      <HStack display="flex" flexDirection="row">
        <Image
          source={{
            uri: avatar
              ? avatar
              : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          }}
          alt="avatar"
          style={{width: 100, height: 100}}
          borderRadius={50}
        />

        <VStack marginLeft={20}>
          <Text>{username}</Text>
          <Text>{username}</Text>

          <Button>
            <ButtonText>Edit Profile</ButtonText>
          </Button>
        </VStack>
      </HStack>
      <Text>{points} points</Text>
      <Text>{address}</Text>
    </View>
  );
}

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
