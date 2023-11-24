import React, {useEffect} from 'react';
import {useUserAuth} from '../hooks';
import {useAppDispatch} from '../redux/hooks';
import firestore from '@react-native-firebase/firestore';
import {setTasks} from '../redux/tasksSlice';
import {
  setCompletedTasks,
  setCreatedTasks,
  setSelectedTasks,
} from '../redux/profileSlice';

const DataRetriever = () => {
  const user = useUserAuth();
  const dispatch = useAppDispatch();

  // get tasks
  useEffect(() => {
    const subscriber = firestore()
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const _storages: any = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          _storages.push({
            ...data,
            geopoint: {
              latitude: data.geopoint.latitude,
              longitude: data.geopoint.longitude,
            },
            date: data.date.toDate().toISOString(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setTasks(_storages));
      });

    return () => subscriber();
  }, [dispatch]);

  // get created Task data
  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('tasks')
        .where('creator', '==', user?.uid)
        .where('status', 'not-in', ['deleted'])
        .onSnapshot(querySnapshot => {
          const _storages: any = [];
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            _storages.push({
              ...data,
              geopoint: {
                latitude: data.geopoint.latitude,
                longitude: data.geopoint.longitude,
              },
              date: data.date.toDate().toISOString(),
              id: documentSnapshot.id,
            });
          });
          dispatch(setCreatedTasks(_storages));
        });

      return () => subscriber();
    }
  }, [dispatch, user]);

  // get completed Task data
  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('tasks')
        .where('selectedBy', '==', user?.uid)
        .where('status', '==', 'completed')
        .onSnapshot(querySnapshot => {
          const _storages: any = [];
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            _storages.push({
              ...data,
              geopoint: {
                latitude: data.geopoint.latitude,
                longitude: data.geopoint.longitude,
              },
              date: data.date.toDate().toISOString(),
              id: documentSnapshot.id,
            });
          });
          dispatch(setCompletedTasks(_storages));
        });

      return () => subscriber();
    }
  }, [dispatch, user]);

  // get selected Task data

  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('tasks')
        .where('selectedBy', '==', user?.uid)
        .where('status', '==', 'new')
        .onSnapshot(querySnapshot => {
          const _storages: any = [];
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            _storages.push({
              ...data,
              geopoint: {
                latitude: data.geopoint.latitude,
                longitude: data.geopoint.longitude,
              },
              date: data.date.toDate().toISOString(),
              id: documentSnapshot.id,
            });
          });
          dispatch(setSelectedTasks(_storages));
        });

      return () => subscriber();
    }
  }, [dispatch, user]);

  return <></>;
};

export default DataRetriever;
