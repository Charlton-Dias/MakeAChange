import React, {useState} from 'react';
import {Box, Image, Pressable, Text} from '@gluestack-ui/themed';
import TaskView from './TaskView';

const Card = ({...props}) => {
  const [showTask, setShowTask] = useState(false);
  const {taskName, description, id, images, date, status, creator} = props;
  return (
    <>
      <TaskView
        setShow={setShowTask}
        show={showTask}
        task={{taskName, description, id, images, date, status, creator}}
      />

      <Pressable onPress={() => setShowTask(true)}>
        <Box
          borderRadius={10}
          padding={0}
          margin={5}
          borderWidth={1}
          backgroundColor="white"
          maxWidth={200}>
          <Image
            minWidth={180}
            height={150}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            size="full"
            alt={props?.taskName}
            source={{
              uri:
                props?.images?.[0] ||
                'https://i2.wp.com/www.differencebetween.com/wp-content/uploads/2011/07/Difference-Between-Environment-and-Ecosystem-fig-1.jpg?w=640&ssl=1',
            }}
          />
          <Box padding={5}>
            <Text size="xl" bold>
              {props?.taskName}
            </Text>
            <Text isTruncated numberOfLines={1}>
              {props?.description}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </>
  );
};

export default Card;
