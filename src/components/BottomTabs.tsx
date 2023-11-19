import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {View} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaderBoard from '../screens/LeaderBoard';
import Profile from '../screens/Profile';
import styles from '../styles';
import Tasks from '../screens/Tasks';
import Create from '../screens/CreateTask';

const Tab = createBottomTabNavigator();

const ICON_NAMES: {[key: string]: string} = {
  Home: 'home',
  Tasks: 'list-ul',
  'Create Task': 'plus',
  LeaderBoard: 'trophy',
  Profile: 'user',
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={Tabs}
      screenOptions={{
        headerStyle: styles.navHeader,
        headerTitleAlign: 'center',
      }}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Taskify'}} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Create Task" component={Create} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Tabs = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.navBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const iconName = ICON_NAMES[route.name];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            style={(styles.navBarTabs, isFocused && styles.navBarActiveTab)}>
            <View width={30} alignItems="center">
              <Icon
                name={`${iconName}`}
                size={28}
                color={isFocused ? 'white' : 'rgba(26, 110, 188, 0.9)'}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
