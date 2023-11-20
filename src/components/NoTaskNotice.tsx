import {Heading, Text, View} from '@gluestack-ui/themed';
import React from 'react';

type NoTaskNoticeProps = {
  title: string;
  profile?: boolean | false;
};

const NoTaskNotice = ({title, profile}: NoTaskNoticeProps) => {
  return (
    <View borderWidth={1} borderColor="black" p={10} borderRadius={10}>
      <Heading>You haven't {title.toLowerCase()} any tasks!</Heading>
      {profile ? (
        <Text color="black" textAlign="left">
          You could try {title.slice(0, -2).toLowerCase()}ing a task.
        </Text>
      ) : (
        <Text color="black" textAlign="left">
          You could try {title === 'Completed' ? 'completing' : 'creating'} a
          task or try refreshing the page.
        </Text>
      )}
    </View>
  );
};

export default NoTaskNotice;