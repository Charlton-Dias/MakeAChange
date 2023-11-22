import React, {useEffect, useState} from 'react';
import {Heading, ScrollView, VStack, View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import styles from '../styles';
import {RefreshControl} from 'react-native';
import NoTaskNotice from '../components/NoTaskNotice';
import {fetchTasks} from '../functions/tasks';

export type TaskDataProps = {
  selectedBy: string | undefined;
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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const fetchData = async () => {
    const {active, expired, completed} = await fetchTasks();
    setActiveTasks(active);
    setExpiredTasks(expired);
    setCompletedTasks(completed);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ScrollView
        px={10}
        contentContainerStyle={styles.taskContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TaskSection
          title="Available"
          data={activeTasks}
          fetchData={fetchData}
        />
        <TaskSection
          title="Completed"
          data={completedTasks}
          fetchData={fetchData}
        />
        {expiredTasks.length > 0 && (
          <TaskSection
            title="Expired"
            data={expiredTasks}
            fetchData={fetchData}
          />
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
  fetchData: () => void;
};

const TaskSection: React.FC<TaskSectionProps> = ({title, data, fetchData}) => (
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
              fetchData={fetchData}
            />
          ))}
        </VStack>
      </ScrollView>
    ) : (
      <NoTaskNotice title={title} />
    )}
  </>
);
