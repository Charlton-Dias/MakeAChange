import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Dashboard from './Dashboard';
import Login from './Login';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './Signup';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs({user}: {user: boolean}) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {!user ? (
          <>
            <Tab.Screen
              name="Login"
              component={Login}
              options={{
                tabBarIcon: ({}) => (
                  <Icon name="user" size={24} color={'black'} />
                ),
              }}
            />
            <Tab.Screen
              name="Signup"
              component={Signup}
              options={{
                tabBarIcon: () => (
                  <Icon name="user-plus" size={24} color={'black'} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return <Dashboard address="test" points={3000} username="Charlton.Dias" />;
}

function Profile() {
  return <Dashboard address="test" points={3000} username="Charlton.Dias" />;
}
