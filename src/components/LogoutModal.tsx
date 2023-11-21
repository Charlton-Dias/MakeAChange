import React from 'react';
import {
  Text,
  Button,
  ButtonText,
  ButtonGroup,
  Modal,
  Heading,
} from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

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

export default LogoutModal;
