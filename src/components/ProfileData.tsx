import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {View} from '@gluestack-ui/themed';
import Card from '../components/Card';
import styles from '../styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NoTaskNotice from '../components/NoTaskNotice';
import {TaskDataProps} from '../screens/Tasks';

const CreatedList = () => {
  const [createdLists, setCreatedLists] = useState<TaskDataProps[]>([]);
  const currentUser = auth().currentUser;
  const getAllLists = async () => {
    const lists = await firestore()
      .collection('tasks')
      .where('creator', '==', currentUser?.uid)
      .get();
    const tasks = lists.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as TaskDataProps),
    );
    setCreatedLists(tasks);
  };
  useEffect(() => {
    getAllLists();
  }, []);

  return <ItemList data={createdLists} section={'Created'} />;
};

const SelectedList = () => {
  const [selectedList, setSelectedList] = useState<TaskDataProps[]>([]);
  const currentUser = auth().currentUser;
  const getAllLists = async () => {
    const lists = await firestore()
      .collection('tasks')
      .where('selectedBy', '==', currentUser?.uid)
      .where('status', '!=', 'completed')
      .get();
    const tasks = lists.docs.map(
      doc =>
        ({
          ...doc.data(),
        } as TaskDataProps),
    );
    setSelectedList(tasks);
  };
  useEffect(() => {
    getAllLists();
  }, []);
  return <ItemList data={selectedList} section={'Selected'} />;
};

const CompletedList = () => {
  const [completedList, setCompletedList] = useState<TaskDataProps[]>([]);
  const currentUser = auth().currentUser;
  const getCompletedList = async () => {
    const lists = await firestore()
      .collection('tasks')
      .where('selectedBy', '==', currentUser?.uid)
      .where('status', '==', 'completed')
      .get();
    const tasks = lists.docs.map(
      doc =>
        ({
          ...doc.data(),
        } as TaskDataProps),
    );
    setCompletedList(tasks);
  };
  useEffect(() => {
    getCompletedList();
  }, []);

  return <ItemList data={completedList} section={'Completed'} />;
};

type ItemListProps = {
  data: TaskDataProps[];
  section: string;
};

type RenderList = {item: TaskDataProps; index: number};

const ItemList = ({data, section}: ItemListProps) => (
  <>
    {data?.length > 0 ? (
      <FlatList<TaskDataProps>
        style={styles.p10}
        numColumns={2}
        data={data}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({item, index}: RenderList) => (
          <Card
            key={index}
            creator={item.creator}
            date={item.date}
            description={item?.description}
            id={item.id}
            images={item?.images}
            status={item?.status}
            taskName={item.taskName}
          />
        )}
      />
    ) : (
      <View p={10}>
        <NoTaskNotice title={section} profile />
      </View>
    )}
  </>
);

export {CompletedList, CreatedList, SelectedList};
