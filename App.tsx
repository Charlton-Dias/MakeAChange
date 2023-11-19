import React from 'react';
import BottomTabs from './src/components/BottomTabs';
import {View} from '@gluestack-ui/themed';

export default function App(): JSX.Element {
  return (
    <View height={'100%'} backgroundColor="white">
      <BottomTabs />
    </View>
  );
}
