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

type ConfirmModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  modalFunction: () => void;
  name: string;
};

const ConfirmModal = ({
  showModal,
  setShowModal,
  modalFunction,
  name,
}: ConfirmModalProps) => {
  const handleFunction = () => {
    modalFunction();
    setShowModal(false);
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Header>
          <Heading>{name}</Heading>
          <Modal.CloseButton>
            <Icon name="close" color={'black'} size={24} />
          </Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          <Text>Are you sure you want to {name}?</Text>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button
              action="secondary"
              variant="outline"
              w={'48%'}
              onPress={() => setShowModal(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button action="negative" w={'48%'} onPress={handleFunction}>
              <ButtonText>{name}</ButtonText>
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
