import React from 'react';
import {Heading, ScrollView, VStack} from '@gluestack-ui/themed';
import Card from '../components/Card';
import dummyData from '../dummyData';
import styles from '../styles';

const Tasks = () => {
  return (
    <>
      <ScrollView px={10} contentContainerStyle={styles.taskContainer}>
        <Heading ml={10} size="xl">
          Available
        </Heading>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          marginBottom={20}>
          <VStack display="flex" flexDirection="row">
            {dummyData.map((item, index) => (
              <Card key={index} title={item.title} description={item.desc} />
            ))}
          </VStack>
        </ScrollView>

        <Heading ml={10} size="xl">
          Nearby
        </Heading>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          marginBottom={20}>
          <VStack display="flex" flexDirection="row">
            {dummyData.map((item, index) => (
              <Card key={index} title={item.title} description={item.desc} />
            ))}
          </VStack>
        </ScrollView>

        <Heading ml={10} size="xl">
          Completed
        </Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} mb={60}>
          <VStack display="flex" flexDirection="row">
            {dummyData.map((item, index) => (
              <Card key={index} title={item.title} description={item.desc} />
            ))}
          </VStack>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default Tasks;
