import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  HStack,
  VStack,
  Button,
  ButtonText,
  ButtonGroup,
} from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
import ConfirmModal from './ConfirmModal';
import {useUserAuth} from '../hooks';
import LinearGradient from 'react-native-linear-gradient';

const ProfileCard = (props: any) => {
  const currentUser = useUserAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    auth().signOut();
  };
  return (
    <LinearGradient
      style={styles.profileCard}
      start={{x: 0.4, y: 0.1}}
      end={{x: 0.6, y: 0.75}}
      colors={['rgba(121, 215, 235, 0.9)', 'rgba(141, 235, 255, 0.6)']}>
      <HStack display="flex" flexDirection="row">
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
          <Text color="black">{currentUser?.email}</Text>
          <Text color="black">{props.user?.userData?.phone}</Text>
        </VStack>
      </HStack>
      <ButtonGroup mt={10} w={'100%'}>
        <Button isDisabled action="secondary" alignItems="center" w={'48%'}>
          <Icon name="edit" size={24} color={'white'} />
          <ButtonText ml={5}>Edit</ButtonText>
        </Button>
        <Button
          action="negative"
          onPress={() => setShowLogoutModal(true)}
          w={'48%'}>
          <Icon name="sign-out" size={24} color={'white'} />
          <ButtonText ml={5}>Logout</ButtonText>
        </Button>
      </ButtonGroup>

      <ConfirmModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        modalFunction={handleLogout}
        name="Logout"
      />
    </LinearGradient>
  );
};

export default ProfileCard;
