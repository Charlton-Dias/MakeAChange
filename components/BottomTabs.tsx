import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Dashboard from './Dashboard';
import Login from './Login';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './Signup';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text} from '@gluestack-ui/themed';
import {ButtonText} from '@gluestack-ui/themed';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs({
  user,
  handleUser,
}: {
  user: boolean;
  handleUser: () => void;
}) {
  return (
    <NavigationContainer>
      <Tab.Navigator sceneAnimationType="shifting" style={{borderRadius: 10}}>
        {!user ? (
          <>
            <Tab.Screen
              name="Login"
              component={() => <Login handleUser={handleUser} />}
              options={{
                tabBarIcon: () => (
                  <Icon name="lock" size={24} color={'black'} />
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
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: () => (
                  <Icon name="home" size={24} color={'black'} />
                ),
              }}
            />
            <Tab.Screen
              name="Tasks"
              component={() => <Task />}
              options={{
                tabBarIcon: () => (
                  <Icon name="clipboard" size={24} color={'black'} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={() => <Profile handleUser={handleUser} />}
              options={{
                tabBarIcon: () => (
                  <Icon name="user" size={24} color={'black'} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return <Dashboard address="test" points={3000} username="Charlton.Dias" />;
}
function Task() {
  return <Text>Tasks here :)</Text>;
}

function Profile({handleUser}: {handleUser: () => void}) {
  return (
    <>
      <Button onPress={handleUser}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </>
  );
}
