import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import {StackParamList} from '../types';
import {useUserAuth} from '../hooks';

const Stack = createNativeStackNavigator<StackParamList>();

export default function Profile() {
  const user = useUserAuth();
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="User"
            component={Dashboard}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
