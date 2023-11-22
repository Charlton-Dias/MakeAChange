import React, {useEffect, useState} from 'react';
import {Heading, ScrollView, VStack, View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import styles from '../styles';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';
import NoTaskNotice from '../components/NoTaskNotice';

export type TaskDataProps = {
  id: string;
  creator: string;
  date: any;
  description?: string;
  images?: string[];
  status?: string;
  taskName: string;
};

const Tasks = () => {
  const [activeTasks, setActiveTasks] = useState<TaskDataProps[]>([]);
  const [expiredTasks, setExpiredTasks] = useState<TaskDataProps[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskDataProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    const tasksCollection = await firestore().collection('tasks').get();
    const _tasks = tasksCollection.docs.map(
      doc => ({id: doc.id, ...doc.data()} as TaskDataProps),
    );

    setActiveTasks(
      _tasks.filter(
        task =>
          task.date.toDate().toLocaleDateString() >=
            new Date().toLocaleDateString() &&
          task.status !== 'completed' &&
          task.status !== 'deleted',
      ),
    );
    setExpiredTasks(
      _tasks.filter(
        task =>
          task.date.toDate() < new Date() &&
          task.status !== 'completed' &&
          task.status !== 'deleted',
      ),
    );
    setCompletedTasks(_tasks.filter(task => task.status === 'completed'));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <ScrollView
        px={10}
        contentContainerStyle={styles.taskContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TaskSection title="Available" data={activeTasks} />
        <TaskSection title="Completed" data={completedTasks} />
        {expiredTasks.length > 0 && (
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

const TaskSection: React.FC<TaskSectionProps> = ({title, data}) => (
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
            <Card
              key={index}
              creator={item.creator}
              date={item.date}
              description={item?.description}
              id={item.id}
              images={item?.images}
              status={item?.status}
              taskName={item.taskName}
            />
          ))}
        </VStack>
      </ScrollView>
    ) : (
      <NoTaskNotice title={title} />
    )}
  </>
);
