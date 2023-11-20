import React, {useEffect, useState} from 'react';
import {Heading, ScrollView, VStack, View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import dummyData from '../../dummyData';
import styles from '../styles';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';
import NoTaskNotice from '../components/NoTaskNotice';

export type TaskDataProps = {
  taskName: string;
  description: string;
  images?: string[];
};

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskDataProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    const tasksCollection = await firestore().collection('tasks').get();
    setTasks(tasksCollection.docs.map(doc => doc.data() as TaskDataProps));
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
        <TaskSection title="Available" data={tasks} />
        <TaskSection title="Completed" data={dummyData} />
        {true && <TaskSection title="Expired" data={dummyData} />}
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
              title={item.taskName}
              description={item.description}
              image={item?.images?.[0]}
            />
          ))}
        </VStack>
      </ScrollView>
    ) : (
      <NoTaskNotice title={title} />
    )}
  </>
);
