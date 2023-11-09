import React, {useState} from 'react';
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
  Modal,
  Heading,
  Fab,
  FabIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import dummyData from '../dummyData';
import Card from '../components/Card';
import styles from '../styles';
import CreateTask from './CreateTask';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          tabBarIndicatorStyle: styles.profileTabBarIndicatorStyle,
          tabBarLabelStyle: styles.profileTabBarLabelStyle,
          tabBarStyle: styles.profileTabBarStyle,
        }}>
        <Tab.Screen name="Created" component={CreatedList} />
        <Tab.Screen name="Selected" component={SelectedList} />
        <Tab.Screen name="Completed" component={CompletedList} />
      </Tab.Navigator>
    </>
  );
}
const ProfileCard = (props: any) => {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
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
        <Button isDisabled w={'48%'} action="secondary">
          <ButtonText>Edit Profile</ButtonText>
        </Button>
        <Button
          action="negative"
          w={'48%'}
          onPress={() => setShowLogoutModal(true)}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </ButtonGroup>

      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Header>
            <Heading>Logout</Heading>
            <Modal.CloseButton>
              <Icon name="close" color={'black'} size={24} />
            </Modal.CloseButton>
          </Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to logout?</Text>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button
                action="secondary"
                variant="outline"
                w={'48%'}
                onPress={() => setShowLogoutModal(false)}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                action="negative"
                w={'48%'}
                onPress={() => {
                  setShowLogoutModal(false);
                  navigation.navigate('Login');
                }}>
                <ButtonText>Logout</ButtonText>
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

function CreatedList() {
  const [showcreateModal, setShowCreateModal] = useState(false);
  return (
    <>
      <ScrollView contentContainerStyle={styles.profileCardContainter}>
        {dummyData.map((item, index) => (
          <Card key={index} title={item.title} description={item.desc} />
        ))}
        <Divider h={0} mb={60} />
      </ScrollView>
      <Fab
        placement="bottom right"
        shadowColor="black"
        borderColor="white"
        bgColor="black"
        borderWidth={1}
        onPress={() => setShowCreateModal(!showcreateModal)}
        mr={0}
        mb={60}>
        <MaterialIcons name="add" size={28} color="white" />
      </Fab>

      <Modal isOpen={showcreateModal} onClose={() => setShowCreateModal(false)}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Header>
            <Heading>Create a new task</Heading>
            <Modal.CloseButton>
              <Icon name="close" color={'black'} size={24} />
            </Modal.CloseButton>
          </Modal.Header>
          <Modal.Body>
            <CreateTask onClose={() => setShowCreateModal(false)} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

function SelectedList() {
  return (
    <ScrollView contentContainerStyle={styles.profileCardContainter}>
      {dummyData.map((item, index) => (
        <Card key={index} title={item.title} description={item.desc} />
      ))}
      <Divider h={0} mb={60} />
    </ScrollView>
  );
}

function CompletedList() {
  return (
    <ScrollView contentContainerStyle={styles.profileCardContainter}>
      {dummyData.map((item, index) => (
        <Card key={index} title={item.title} description={item.desc} />
      ))}
      <Divider h={0} mb={60} />
    </ScrollView>
  );
}
