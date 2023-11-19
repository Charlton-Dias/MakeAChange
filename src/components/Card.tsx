import React from 'react';
import {Box, Image, Text} from '@gluestack-ui/themed';

const Card = ({...props}) => {
  return (
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
        alt={props?.title}
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

export default Card;