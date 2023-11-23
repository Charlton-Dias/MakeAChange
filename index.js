import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

export const Main = () => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
