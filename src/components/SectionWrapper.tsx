import React from 'react';
import {Box} from '@gluestack-ui/themed';

export default function SectionWrapper({children}: any): JSX.Element {
  return (
    <Box
      borderWidth={1}
      p={10}
      mb={15}
      borderRadius={5}
      borderColor="#ccc"
      bgColor="#eee">
      {children}
    </Box>
  );
}
