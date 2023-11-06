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
  ButtonGroup,
  ScrollView,
} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import dummyData from '../dummyData';
import Card from '../components/Card';
import styles from '../styles';

const Tab = createMaterialTopTabNavigator();

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
      <Divider alignSelf="center" width={'95%'} marginBottom={5} />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#1A6EBC',
          tabBarStyle: {
            backgroundColor: 'white',
            borderRadius: 10,
            margin: 10,
            borderWidth: 1,
            borderColor: '#1A6EBC',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1A6EBC',
            height: '100%',
            borderRadius: 10,
          },
          tabBarLabelStyle: {fontSize: 14, textTransform: 'none'},
        }}>
        <Tab.Screen name="Created" component={CreatedList} />
        <Tab.Screen name="Selected" component={SelectedList} />
        <Tab.Screen name="Completed" component={CompletedList} />
      </Tab.Navigator>
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
        style={styles.profileAvatar}
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
    <ButtonGroup>
      <Button isDisabled w={'48%'}>
        <ButtonText>Edit Profile</ButtonText>
      </Button>
      <Button action="negative" w={'48%'}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </ButtonGroup>
  </View>
);

function CreatedList() {
  return (
    <ScrollView contentContainerStyle={styles.profileCardContainter}>
      {dummyData.map((item, index) => (
        <Card key={index} title={item.title} description={item.desc} />
      ))}
    </ScrollView>
  );
}

function SelectedList() {
  return (
    <ScrollView contentContainerStyle={styles.profileCardContainter}>
      {dummyData.map((item, index) => (
        <Card key={index} title={item.title} description={item.desc} />
      ))}
    </ScrollView>
  );
}
function CompletedList() {
  return (
    <ScrollView contentContainerStyle={styles.profileCardContainter}>
      {dummyData.map((item, index) => (
        <Card key={index} title={item.title} description={item.desc} />
      ))}
    </ScrollView>
  );
}
