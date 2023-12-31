import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Image,
  Modal,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {acceptTask, completedTask, deleteTask} from '../functions/tasks';
import {Alert, TouchableOpacity} from 'react-native';
import ConfirmModal from './ConfirmModal';
import {useUserAuth} from '../hooks';
import {TaskDataProps} from '../types';
import MapView from './MapView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type TaskViewProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskDataProps;
};
const TaskView: React.FC<TaskViewProps> = ({setShow, show, task}) => {
  const handleClose = () => setShow(false);
  return (
    <Actionsheet isOpen={show} onClose={handleClose} snapPoints={[90]}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Heading size={'lg'}>{task?.taskName || 'Task'}</Heading>
        <TaskLayout task={task} handleClose={handleClose} />
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default TaskView;

type TaskLayoutProps = {
  task: TaskDataProps;
  handleClose: () => void;
};
const TaskLayout = ({task, handleClose}: TaskLayoutProps) => {
  const currentUser = useUserAuth();
  const isOwner = currentUser?.uid === task?.creator;
  const id = task.id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const expired =
    new Date(task?.date).toLocaleDateString('en-IN') <
    new Date().toLocaleDateString('en-IN');

  const getButtonMessage = () => {
    if (task.status === 'taken') {
      if (task.selectedBy === currentUser?.uid) {
        return 'Mark as Completed';
      } else if (expired) {
        return 'Task Expired';
      } else {
        return 'Task Taken';
      }
    } else if (task.status === 'completed') {
      return 'Task Completed';
    } else if (expired) {
      return 'Task Expired';
    } else {
      return currentUser ? 'Accept Task' : 'Login to Accept Task';
    }
  };

  const handleAcceptTask = () => {
    if (task.status === 'taken' || task.status === 'completed') {
      if (task.status === 'taken' && task.selectedBy === currentUser?.uid) {
        completedTask(task.id);
        handleClose();
        return;
      }
      setDisabled(true);
      return;
    }
    if (currentUser) {
      acceptTask(id, currentUser?.uid);
      handleClose();
    } else {
      Alert.alert('Login', 'Please Login to continue');
    }
  };

  const handleDeleteTask = () => {
    deleteTask(id);
    handleClose();
  };

  useEffect(() => {
    if (
      task.status === 'completed' ||
      (task.status === 'taken' && task.selectedBy !== currentUser?.uid) ||
      expired ||
      !currentUser
    ) {
      setDisabled(true);
    }
    //  {
    else {
      setDisabled(false);
    }
  }, [task.status, task.date, currentUser, expired]);

  const region = [task?.geopoint?.latitude, task?.geopoint?.longitude];
  return (
    <ScrollView minWidth={350} p={10}>
      <ImageView
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Image
        width={'100%'}
        height={300}
        borderWidth={1}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        borderColor="black"
        source={{
          uri:
            task?.images?.[0] ||
            'https://i2.wp.com/www.differencebetween.com/wp-content/uploads/2011/07/Difference-Between-Environment-and-Ecosystem-fig-1.jpg?w=640&ssl=1',
        }}
        alt={task?.taskName}
        flex={1}
        resizeMode="cover"
      />
      <Box
        borderRadius={10}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderWidth={1}
        borderTopWidth={0}
        p={10}
        mb={20}>
        <Text bold>Location:</Text>
        <View mt={10} height={150}>
          <MapView region={region} tasks={[task]} />
        </View>

        {task?.date && (
          <Text bold>
            Deadline: {new Date(task?.date).toLocaleDateString('en-IN')}
          </Text>
        )}
        <Text bold mt={10}>
          Task description:
        </Text>
        <Text>{task?.description}</Text>
        <Text bold mt={10}>
          Task Images:
        </Text>
        <ScrollView horizontal>
          <HStack alignItems="center" padding={0}>
            {task?.images?.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(image)}>
                <TaskImage
                  image={image}
                  taskName={task?.taskName}
                  index={index}
                />
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>

        {isOwner ? (
          <>
            {/* <ButtonGroup> */}
            <Button
              // width={'48%'}
              action="negative"
              variant="outline"
              onPress={() => setShowDeleteModal(true)}>
              <ButtonText>Delete Task</ButtonText>
            </Button>
            {/* <Button width={'48%'} action="secondary">
                <ButtonText>Edit Task</ButtonText>
              </Button> */}
            {/* </ButtonGroup> */}
            <ConfirmModal
              showModal={showDeleteModal}
              setShowModal={setShowDeleteModal}
              modalFunction={handleDeleteTask}
              name="Delete Task"
            />
          </>
        ) : (
          <>
            <Button onPress={handleAcceptTask} isDisabled={disabled}>
              <ButtonText>{getButtonMessage()}</ButtonText>
            </Button>
          </>
        )}
      </Box>
      <View mb={20} />
    </ScrollView>
  );
};

const TaskImage = ({
  image,
  taskName,
  index,
}: {
  image: string;
  taskName: string;
  index: number;
}) => (
  <Image
    key={image}
    borderWidth={1}
    borderRadius={10}
    alt={`${taskName} ${index}`}
    source={{
      uri: image,
    }}
    flex={1}
    m={10}
  />
);

type ImageViewProps = {
  selectedImage: string | null;
  setSelectedImage: () => void;
};

const ImageView = ({selectedImage, setSelectedImage}: ImageViewProps) => {
  return (
    <Modal
      isOpen={selectedImage !== null}
      onClose={() => setSelectedImage(null)}>
      <Modal.Backdrop />
      <Modal.Content w={'auto'} alignItems="center" p={10}>
        <Image
          size="2xl"
          alt="image"
          source={{
            uri: selectedImage,
          }}
        />
      </Modal.Content>
    </Modal>
  );
};
