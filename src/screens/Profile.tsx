import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {StackParamList} from '../types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function Profile() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    function onAuthStateChanged(_user: any) {
      setUser(_user);
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

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
