import React, {useState} from 'react';
import {Box, Image, Pressable, Text} from '@gluestack-ui/themed';
import TaskView from './TaskView';

const Card = ({...props}) => {
  const [showTask, setShowTask] = useState(false);
  return (
    <>
      <TaskView setShow={setShowTask} show={showTask} task={props.task} />

      <Pressable onPress={() => setShowTask(true)}>
        <Box
          borderRadius={10}
          padding={0}
          margin={5}
          borderWidth={1}
          backgroundColor="white"
          width={180}>
          <Image
            width={180}
            height={150}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            size="full"
            alt={props?.taskName}
            source={{
              uri:
                props?.task?.images?.[0] ||
                'https://i2.wp.com/www.differencebetween.com/wp-content/uploads/2011/07/Difference-Between-Environment-and-Ecosystem-fig-1.jpg?w=640&ssl=1',
            }}
          />
          <Box padding={5}>
            <Text size="xl" bold isTruncated numberOfLines={1}>
              {props?.task?.taskName}
            </Text>
            <Text isTruncated numberOfLines={1}>
              {props?.task?.description}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </>
  );
};

export default Card;
