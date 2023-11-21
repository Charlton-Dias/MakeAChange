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
import NoTaskNotice from '../components/NoTaskNotice';
import {TaskDataProps} from './Tasks';

const Tab = createMaterialTopTabNavigator();

export default function Dashboard(): JSX.Element {
  const [user, setUser] = useState<object | null>();
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await firestore()
        .collection('users')
        .where('uid', '==', currentUser?.uid)
        .get();
      setUser(userData.docs[0].data());
    };

    fetchUser();
  }, [currentUser?.uid]);

  return (
    <>
      <ProfileCard user={user} />
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
            uri: props?.userData?.user?.avatar
              ? props?.avatar
              : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          }}
          alt="avatar"
          style={styles.profileAvatar}
          borderRadius={50}
        />
        <VStack marginLeft={20}>
          <Text size="lg" bold color="black">
            {props.user?.userData?.username}
          </Text>
          <Text color="black">{props.user?.userData?.name}</Text>
          <Text color="black">
            points: {props?.user?.userData?.points || 0}
          </Text>
          <Text color="black">{props?.user?.userData?.address}</Text>
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

type LogoutModalProps = {
  showLogoutModal: boolean;
  setShowLogoutModal: (showLogoutModal: boolean) => void;
};

const LogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
}: LogoutModalProps) => {
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

const CreatedList = () => {
  const [createdLists, setCreatedLists] = useState<TaskDataProps[]>([]);
  const currentUser = auth().currentUser;
  const getAllLists = async () => {
    const lists = await firestore()
      .collection('tasks')
      .where('creator', '==', currentUser?.uid)
      .get();
    const tasks = lists.docs.map(
      doc =>
        ({
          ...doc.data(),
        } as TaskDataProps),
    );
    setCreatedLists(tasks);
  };
  useEffect(() => {
    getAllLists();
  }, []);

  return <ItemList data={createdLists} section={'Created'} />;
};

const SelectedList = () => <ItemList data={dummyData} section={'Selected'} />;

const CompletedList = () => <ItemList data={dummyData} section={'Completed'} />;

type ItemListProps = {
  data: TaskDataProps[];
  section: string;
};
const ItemList = ({data, section}: ItemListProps) => (
  <>
    {data?.length > 0 ? (
      <ScrollView contentContainerStyle={styles.profileCardContainter}>
        {data?.map((item, index) => (
          <Card
            key={index}
            title={item?.taskName}
            description={item?.description}
            date={item?.date}
            images={item?.images}
            status={item?.status}
          />
        ))}
        <Divider h={0} mb={60} />
      </ScrollView>
    ) : (
      <View p={10}>
        <NoTaskNotice title={section} profile />
      </View>
    )}
  </>
);
