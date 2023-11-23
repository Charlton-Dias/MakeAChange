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
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {TaskDataProps} from '../screens/Tasks';
import {acceptTask, completedTask, deleteTask} from '../functions/tasks';
import {Alert} from 'react-native';
import ConfirmModal from './ConfirmModal';
import {useUserAuth} from '../hooks';

type TaskViewProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskDataProps;
  fetchData: () => void;
};
const TaskView: React.FC<TaskViewProps> = ({
  setShow,
  show,
  task,
  fetchData,
}) => {
  const handleClose = () => setShow(false);
  return (
    <Actionsheet isOpen={show} onClose={handleClose} snapPoints={[90]}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Heading size={'lg'}>{task?.taskName || 'Task'}</Heading>
        <TaskLayout
          task={task}
          handleClose={handleClose}
          fetchData={fetchData}
        />
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default TaskView;

type TaskLayoutProps = {
  task: TaskDataProps;
  handleClose: () => void;
  fetchData: () => void;
};
const TaskLayout = ({task, handleClose, fetchData}: TaskLayoutProps) => {
  const currentUser = useUserAuth();
  const isOwner = currentUser === task?.creator;
  const id = task.id;
  const [buttonMessage, setButtonMessage] = useState('Accept Task');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const getButtonMessage = () => {
    switch (task.status) {
      case 'taken':
        if (task.selectedBy === currentUser) {
          setButtonMessage('Mark as Completed');
        } else {
          setButtonMessage('Task Taken');
          setDisabled(true);
        }
        break;
      case 'completed':
        setButtonMessage('Task Completed');
        setDisabled(true);
        break;
      default:
        setButtonMessage(currentUser ? 'Accept Task' : 'Login to Accept Task');
        break;
    }
  };

  const handleAcceptTask = () => {
    if (task.status === 'taken' || task.status === 'completed') {
      getButtonMessage();
      if (task.status === 'taken' && task.selectedBy === currentUser) {
        completedTask(task.id);
        handleClose();
        return;
      }
      setDisabled(true);
      return;
    }
    if (currentUser) {
      acceptTask(id, currentUser);
      handleClose();
    } else {
      Alert.alert('Login', 'Please Login to continue');
    }
  };

  const handleDeleteTask = () => {
    deleteTask(id);
    handleClose();
    fetchData();
  };

  useEffect(() => {
    getButtonMessage();
  }, [task.status, currentUser]);

  return (
    <ScrollView minWidth={350} p={10}>
      <Image
        width={'100%'}
        height={300}
        borderWidth={1}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        borderColor="black"
        alt={task?.taskName}
        source={{
          uri:
            task?.images?.[0] ||
            'https://i2.wp.com/www.differencebetween.com/wp-content/uploads/2011/07/Difference-Between-Environment-and-Ecosystem-fig-1.jpg?w=640&ssl=1',
        }}
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
        {task?.date && (
          <Text bold>
            Deadline: {task?.date.toDate().toLocaleDateString('en-IN')}
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
              <Image
                key={index}
                borderWidth={1}
                borderRadius={10}
                size="2xl"
                alt={task?.taskName}
                source={{
                  uri: image,
                }}
                flex={1}
                resizeMode="center"
                m={10}
              />
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
              <ButtonText>{buttonMessage}</ButtonText>
            </Button>
          </>
        )}
      </Box>
      <View mb={20} />
    </ScrollView>
  );
};
