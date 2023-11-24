import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {View} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../screens/Profile';
import styles from '../styles';
import Tasks from '../screens/Tasks';
import Create from '../screens/CreateTask';
import {TabsParamList} from '../types';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator<TabsParamList>();

const ICON_NAMES: {[key: string]: string} = {
  Home: 'home',
  Tasks: 'list-ul',
  CreateTask: 'plus',
  Profile: 'user',
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={Tabs}
      screenOptions={{
        headerStyle: styles.navHeader,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.navHeaderTitle,
      }}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Taskify'}} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen
        name="CreateTask"
        component={Create}
        options={{title: 'Create Task'}}
      />
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
    <LinearGradient
      colors={['rgba(26, 110, 255, 0.12)', 'rgba(0, 46, 125, 0.12)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.navBar}>
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
            key={index}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={
                isFocused
                  ? ['rgba(26, 110, 255, 0.9)', 'rgba(0, 46, 106, 0.9)']
                  : ['rgba(0, 0, 0, 0)', 'rgba(0,0,0,0)']
              }
              style={(styles.navBarTabs, isFocused && styles.navBarActiveTab)}>
              <View width={30} alignItems="center">
                <Icon
                  name={`${iconName}`}
                  size={28}
                  color={isFocused ? 'white' : 'rgba(40, 100, 255, 0.9)'}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};
