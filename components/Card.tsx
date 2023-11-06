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

export default Card;
