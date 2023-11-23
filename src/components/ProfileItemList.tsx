import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ScrollView, View} from '@gluestack-ui/themed';
import Card from './Card';
import styles from '../styles';
import auth from '@react-native-firebase/auth';
import NoTaskNotice from './NoTaskNotice';
import {TaskDataProps} from '../screens/Tasks';
import {fetchProfileTasks} from '../functions/tasks';

type RenderList = {item: TaskDataProps; index: number};

type ProfileItemListProps = {
  filter: (task: TaskDataProps) => boolean;
  section: string;
  type: 'creator' | 'selectedBy';
};

const ProfileItemList = ({filter, section, type}: ProfileItemListProps) => {
  const [tasks, setTasks] = useState<TaskDataProps[]>([]);
  const currentUser = auth().currentUser;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getdata();
    setRefreshing(false);
  }, []);

  const getdata = () => {
    if (typeof type === 'string') {
      fetchProfileTasks(type, '==', currentUser?.uid || null).then(_tasks => {
        setTasks(_tasks.filter(filter));
      });
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {tasks?.length > 0 ? (
        <FlatList<TaskDataProps>
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          data={tasks}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item, index}: RenderList) => (
            <View flex={1}>
              <Card
                key={index}
                creator={item.creator}
                date={item.date}
                description={item?.description}
                id={item.id}
                images={item?.images}
                status={item?.status}
                taskName={item.taskName}
                selectedBy={item?.selectedBy}
                fetchData={getdata}
              />
            </View>
          )}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View p={10}>
            <NoTaskNotice title={section} profile />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ProfileItemList;
