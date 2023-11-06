import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../screens/Profile';
import LeaderBoard from '../screens/LeaderBoard';
import Tasks from '../screens/Tasks';
import Home from '../screens/Home';
// import CreateTask from '../screens/CreateTask';

const Tab = createMaterialBottomTabNavigator();
const HomeIcon = () => <Icon name="home" size={24} color={'black'} />;
const LeaderBoardIcon = () => <Icon name="trophy" size={24} color={'black'} />;
const ProfileIcon = () => <Icon name="user" size={24} color={'black'} />;
const TasksIcon = () => <Icon name="clipboard" size={24} color={'black'} />;
// const CreateTaskIcon = () => (
//   <Icon name="plus-circle" size={24} color={'black'} />
// );

export default function BottomTabs() {
  return (
    <Tab.Navigator sceneAnimationType="opacity">
      <>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={Tasks}
          options={{
            tabBarIcon: TasksIcon,
          }}
        />
        {/* <Tab.Screen
          name="Create Task"
          component={CreateTask}
          options={{
            tabBarIcon: CreateTaskIcon,
          }}
        /> */}
        <Tab.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{
            tabBarIcon: LeaderBoardIcon,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ProfileIcon,
          }}
        />
      </>
    </Tab.Navigator>
  );
}
