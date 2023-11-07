import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {HStack, Text, View} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaderBoard from '../screens/LeaderBoard';
import Profile from '../screens/Profile';
import styles from '../styles';
import Tasks from '../screens/Tasks';

const Tab = createBottomTabNavigator();

const ICON_NAMES: {[key: string]: string} = {
  Home: 'home',
  Tasks: 'clipboard',
  LeaderBoard: 'trophy',
  Profile: 'user',
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={Tabs}
      screenOptions={{headerShown: false}}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Tabs = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.navBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
            <HStack>
              <Icon
                name={`${iconName}`}
                size={28}
                color={isFocused ? 'white' : '#1A6EBC'}
              />
              {isFocused && (
                <Text style={styles.navBarActiveTabText}>{label}</Text>
              )}
            </HStack>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
