import React, {useEffect, useState} from 'react';
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
} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import dummyData from '../../dummyData';
import Card from '../components/Card';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Tab = createMaterialTopTabNavigator();

export default function Dashboard(): JSX.Element {
  const [user, setUser] = useState();
  const currentUser = auth().currentUser;

  const fetchUser = async () => {
    const userData = await firestore()
      .collection('users')
      .where('uid', '==', currentUser?.uid)
      .get();
    setUser(userData.docs[0]._data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <ProfileCard user={user?.userData} />
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
            uri: props?.user?.avatar
              ? props?.avatar
              : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          }}
          alt="avatar"
          style={styles.profileAvatar}
          borderRadius={50}
        />

        <VStack marginLeft={20}>
          <Text size="lg" bold color="black">
            {props?.user?.username}
          </Text>
          <Text color="black">{props?.user?.name}</Text>
          <Text color="black">points: {props?.points || 0}</Text>
          <Text color="black">{props?.address}</Text>
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

      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </View>
  );
};

const LogoutModal = ({showLogoutModal, setShowLogoutModal}) => {
  const handleLogout = () => {
    auth().signOut();
    setShowLogoutModal(false);
  };

  return (
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
            <Button action="negative" w={'48%'} onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const CreatedList = () => <ItemList data={dummyData} />;

const SelectedList = () => <ItemList data={dummyData} />;

const CompletedList = () => <ItemList data={dummyData} />;

const ItemList = ({data}) => (
  <ScrollView contentContainerStyle={styles.profileCardContainter}>
    {data?.map((item, index) => (
      <Card key={index} title={item.title} description={item.desc} />
    ))}
    <Divider h={0} mb={60} />
  </ScrollView>
);