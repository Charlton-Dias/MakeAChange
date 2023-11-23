import {Heading, Text, View} from '@gluestack-ui/themed';
import React from 'react';

type NoTaskNoticeProps = {
  title: string;
  profile?: boolean | false;
};

const NoTaskNotice = ({title, profile}: NoTaskNoticeProps) => {
  return (
    <View borderWidth={1} borderColor="black" p={10} borderRadius={10} mb={30}>
      {profile ? (
        <>
          <Heading>You haven't {title.toLowerCase()} any tasks!</Heading>
          <Text color="black" textAlign="left">
            Tasks {title.toLowerCase()} by you will appear here.
          </Text>
        </>
      ) : (
        <>
          <Heading>There are no {title.toLowerCase()} tasks!</Heading>
          <Text color="black" textAlign="left">
            You could try {title === 'Completed' ? 'completing' : 'creating'} a
            task or try refreshing the page.
          </Text>
        </>
      )}
    </View>
  );
};

export default NoTaskNotice;
