import React from 'react';
import {Divider, Heading, ScrollView, VStack} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import Card from '../components/Card';
import dummyData from '../dummyData';

const Tasks = () => {
  return (
    <>
      <ScrollView p={20} contentContainerStyle={styles.container}>
        <Heading size="xl">Available</Heading>
        <Divider alignSelf="center" mb={10} />
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

        <Heading size="xl">Nearby</Heading>
        <Divider alignSelf="center" mb={10} />
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

        <Heading size="xl">Completed</Heading>
        <Divider alignSelf="center" mb={10} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
