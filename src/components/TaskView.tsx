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
} from '@gluestack-ui/themed';
import React from 'react';

type TaskProps = {
  title: string;
  description: string;
  images: string[];
  date: Date;
};
type TaskViewProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskProps;
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
        <Heading size={'lg'}>{task?.title || 'Task'}</Heading>
        <TaskLayout task={task} />
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default TaskView;

type TaskLayoutProps = {
  task: TaskProps;
};
const TaskLayout = ({task}: TaskLayoutProps) => (
  <ScrollView minWidth={350} p={10}>
    <Image
      width={'100%'}
      height={300}
      borderWidth={1}
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      borderColor="black"
      alt={task?.title}
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
              alt={task?.title}
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
      <Button>
        <ButtonText>Accept Task</ButtonText>
      </Button>
    </Box>
  </ScrollView>
);
