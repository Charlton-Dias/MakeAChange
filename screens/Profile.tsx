import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default function Profile() {
  const [user, setUser] = useState(false);
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen
            name="User"
            component={UserProfile}
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
              name="Sign up"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

function UserProfile() {
  return <Dashboard address="Goa" points={3000} username="Charlton.Dias" />;
}
