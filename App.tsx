import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import Dashboard from './components/Dashboard';

export default function App(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <Dashboard address="test" points={3000} username="Charlton.Dias" />
    </GluestackUIProvider>
  );
}
