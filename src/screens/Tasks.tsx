import React, {useEffect, useState} from 'react';
import {Heading, ScrollView, VStack, View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import dummyData from '../../dummyData';
import styles from '../styles';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';

type Data = {
  taskName: string;
  description: string;
  images?: string[];
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Data[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    const tasksCollection = await firestore().collection('tasks').get();
    setTasks(tasksCollection.docs.map(doc => doc.data() as Data));
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
        <View mb={40} />
      </ScrollView>
    </>
  );
};

export default Tasks;

type TaskSectionProps = {
  title: string;
  data: Data[];
};

const TaskSection: React.FC<TaskSectionProps> = ({title, data}) => (
  <>
    <Heading ml={10} size="xl">
      {title}
    </Heading>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      indicatorStyle="black"
      marginBottom={20}>
      <VStack display="flex" flexDirection="row" marginBottom={2}>
        {data?.length > 0 ? (
          data.map((item, index) => (
            <Card
              key={index}
              title={item.taskName}
              description={item.description}
              image={item?.images?.[0]}
            />
          ))
        ) : (
          <View height={100} width={'100%'} borderWidth={1} borderColor="black">
            <Heading>There are no {title} Tasks</Heading>
          </View>
        )}
      </VStack>
    </ScrollView>
  </>
);
