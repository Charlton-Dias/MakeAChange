import React, {useEffect, useState} from 'react';
import {Divider} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import ProfileCard from '../components/ProfileCard';
import ProfileItemList from '../components/ProfileItemList';
import styles from '../styles';
import {useUserAuth} from '../hooks';

const Tab = createMaterialTopTabNavigator();

export default function Dashboard(): JSX.Element {
  const [user, setUser] = useState<object | null>();
  const currentUser = useUserAuth();

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
        <Tab.Screen
          name="Created"
          children={() => <ProfileItemList section="Created" />}
        />
        <Tab.Screen
          name="Selected"
          children={() => <ProfileItemList section="Selected" />}
        />
        <Tab.Screen
          name="Completed"
          children={() => <ProfileItemList section="Completed" />}
        />
      </Tab.Navigator>
    </>
  );
}
