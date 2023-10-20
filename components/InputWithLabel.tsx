import React from 'react';
import {Box, Center, Input, InputField, Text} from '@gluestack-ui/themed';

interface InputWithLabelProps {
  name: string;
  type: string;
}

export default function InputWithLabel(
  {name, type}: InputWithLabelProps,
  props: any,
): React.JSX.Element {
  return (
    <Center>
      <Box width={'90%'} paddingVertical={5}>
        <Text>{name}</Text>
        <Input variant="outline" size="md">
          <InputField type={type} {...props} />
        </Input>
      </Box>
    </Center>
  );
}
