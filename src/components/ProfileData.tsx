import React, {useEffect, useState} from 'react';
import {View, Divider, ScrollView} from '@gluestack-ui/themed';
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
          ...doc.data(),
        } as TaskDataProps),
    );
    setCreatedLists(tasks);
  };
  useEffect(() => {
    getAllLists();
  });

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
  });
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
  });

  return <ItemList data={completedList} section={'Completed'} />;
};

type ItemListProps = {
  data: TaskDataProps[];
  section: string;
};
const ItemList = ({data, section}: ItemListProps) => (
  <>
    {data?.length > 0 ? (
      <ScrollView contentContainerStyle={styles.profileCardContainter}>
        {data?.map((item, index) => (
          <Card
            key={index}
            title={item?.taskName}
            description={item?.description}
            date={item?.date}
            images={item?.images}
            status={item?.status}
          />
        ))}
        <Divider h={0} mb={60} />
      </ScrollView>
    ) : (
      <View p={10}>
        <NoTaskNotice title={section} profile />
      </View>
    )}
  </>
);

export {CompletedList, CreatedList, SelectedList};
