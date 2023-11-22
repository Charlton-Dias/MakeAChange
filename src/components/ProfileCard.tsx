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

const ProfileCard = (props: any) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    auth().signOut();
  };
  return (
    <View
      margin={10}
      p={15}
      backgroundColor="#C8F5FF"
      borderRadius={10}
      borderWidth={1}
      borderColor="#8DEBFF">
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
          <ButtonGroup mt={10}>
            <Button isDisabled action="secondary" alignItems="center">
              <Icon name="edit" size={24} color={'white'} />
              <ButtonText ml={5}>Edit</ButtonText>
            </Button>
            <Button action="negative" onPress={() => setShowLogoutModal(true)}>
              <Icon name="sign-out" size={24} color={'white'} />
              <ButtonText ml={5}>Logout</ButtonText>
            </Button>
          </ButtonGroup>
        </VStack>
      </HStack>

      <ConfirmModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        modalFunction={handleLogout}
        name="Logout"
      />
    </View>
  );
};

export default ProfileCard;
