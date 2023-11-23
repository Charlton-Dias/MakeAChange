import React from 'react';
import {Heading, ScrollView, VStack, View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import styles from '../styles';
import NoTaskNotice from '../components/NoTaskNotice';
import {useAppSelector} from '../redux/hooks';
import {TaskDataProps} from '../types';

const Tasks = () => {
  const {data} = useAppSelector(state => state.tasks);
  const availableTasks = data.filter(task => task.status === 'new');
  const completedTasks = data.filter(task => task.status === 'completed');
  const takenTasks = data.filter(task => task.status === 'taken');
  const expiredTasks = data.filter(task => {
    return (
      task.status !== 'completed' &&
      new Date(task?.date).toLocaleDateString('en-IN') <
        new Date().toLocaleDateString('en-IN')
    );
  });

  return (
    <>
      <ScrollView px={10} contentContainerStyle={styles.taskContainer}>
        <TaskSection title="Available" data={availableTasks} />
        {takenTasks.length !== 0 && (
          <TaskSection title="Taken" data={takenTasks} />
        )}
        <TaskSection title="Completed" data={completedTasks} />
        {expiredTasks.length !== 0 && (
          <TaskSection title="Expired" data={expiredTasks} />
        )}

        <View mb={40} />
      </ScrollView>
    </>
  );
};

export default Tasks;

type TaskSectionProps = {
  title: string;
  data: TaskDataProps[];
};

const TaskSection: React.FC<TaskSectionProps> = ({title, data}) => {
  return (
    <>
      <Heading ml={10} size="xl">
        {title}
      </Heading>
      {data?.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          indicatorStyle="black"
          marginBottom={20}>
          <VStack display="flex" flexDirection="row" marginBottom={2}>
            {data.map((item, index) => (
              <Card key={index} task={item} />
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <NoTaskNotice title={title} />
      )}
    </>
  );
};
