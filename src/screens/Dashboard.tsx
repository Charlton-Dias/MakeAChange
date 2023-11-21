import React, {useEffect, useState} from 'react';
import {Divider} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ProfileCard from '../components/ProfileCard';
import {
  CompletedList,
  CreatedList,
  SelectedList,
} from '../components/ProfileData';
import styles from '../styles';

const Tab = createMaterialTopTabNavigator();

export default function Dashboard(): JSX.Element {
  const [user, setUser] = useState<object | null>();
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await firestore()
        .collection('users')
        .where('uid', '==', currentUser?.uid)
        .get();
      setUser(userData.docs[0].data());
    };

    fetchUser();
  }, [currentUser?.uid]);

  return (
    <>
      <ProfileCard user={user} />
      <Divider alignSelf="center" width={'95%'} marginBottom={5} />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#1A6EBC',
          tabBarIndicatorStyle: styles.profileTabBarIndicatorStyle,
          tabBarLabelStyle: styles.profileTabBarLabelStyle,
          tabBarStyle: styles.profileTabBarStyle,
        }}>
        <Tab.Screen name="Created" component={CreatedList} />
        <Tab.Screen name="Selected" component={SelectedList} />
        <Tab.Screen name="Completed" component={CompletedList} />
      </Tab.Navigator>
    </>
  );
}
