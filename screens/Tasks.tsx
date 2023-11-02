import React from 'react';
import {
  Box,
  Divider,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';

const DATA = [
  {title: 'Task 1', desc: 'Task description here'},
  {title: 'Task 2', desc: 'Task description here'},
  {title: 'Task 3', desc: 'Task description here'},
  {title: 'Task 4', desc: 'Task description here'},
  {title: 'Task 5', desc: 'Task description here'},
  {title: 'Task 6', desc: 'Task description here'},
];

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
            {DATA.map((item, index) => (
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
            {DATA.map((item, index) => (
              <Card key={index} title={item.title} description={item.desc} />
            ))}
          </VStack>
        </ScrollView>

        <Heading size="xl">Completed</Heading>
        <Divider alignSelf="center" mb={10} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack display="flex" flexDirection="row">
            {DATA.map((item, index) => (
              <Card key={index} title={item.title} description={item.desc} />
            ))}
          </VStack>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default Tasks;

const Card = ({...props}) => {
  return (
    <Box
      borderRadius={10}
      padding={0}
      margin={5}
      borderWidth={1}
      backgroundColor="white"
      maxWidth={160}>
      <Image
        width={200}
        height={120}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        source={{
          uri:
            props?.image ||
            'https://i2.wp.com/www.differencebetween.com/wp-content/uploads/2011/07/Difference-Between-Environment-and-Ecosystem-fig-1.jpg?w=640&ssl=1',
        }}
      />
      <Box padding={5}>
        <Text size="xl" bold>
          {props?.title}
        </Text>
        <Text isTruncated numberOfLines={2}>
          {props?.description}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
