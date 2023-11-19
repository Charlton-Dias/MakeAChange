import React from 'react';
import {Heading, ScrollView, VStack} from '@gluestack-ui/themed';
import Card from '../components/Card';
import dummyData from '../../dummyData';
import styles from '../styles';

const Tasks = () => {
  return (
    <>
      <ScrollView px={10} contentContainerStyle={styles.taskContainer}>
        <TaskSection title="Available" data={dummyData} />
        <TaskSection title="Completed" data={dummyData} />
      </ScrollView>
    </>
  );
};

export default Tasks;

interface TaskSectionProps {
  title: string;
  data: typeof dummyData;
}

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
        {data.map((item, index) => (
          <Card key={index} title={item.title} description={item.desc} />
        ))}
      </VStack>
    </ScrollView>
  </>
);
