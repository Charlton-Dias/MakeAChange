import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React from 'react';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';

export const Main = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
