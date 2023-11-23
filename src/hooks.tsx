import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const useUserAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(
    auth().currentUser,
  );

  useEffect(() => {
    function onAuthStateChanged(_user: any) {
      setUser(_user);
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return user;
};

export {useUserAuth};
