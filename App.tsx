import React from 'react';
import BottomTabs from './src/components/BottomTabs';
import {View} from '@gluestack-ui/themed';
import DataRetriever from './src/components/DataRetriever';

export default function App(): JSX.Element {
  return (
    <View height={'100%'} backgroundColor="white">
      <DataRetriever />
      <BottomTabs />
    </View>
  );
}
