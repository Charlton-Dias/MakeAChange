import React from 'react';
import {FlatList} from 'react-native';
import {View} from '@gluestack-ui/themed';
import Card from './Card';
import styles from '../styles';
import NoTaskNotice from './NoTaskNotice';
import {TaskDataProps} from '../types';
import {useAppSelector} from '../redux/hooks';

type RenderList = {item: TaskDataProps; index: number};

type ProfileItemListProps = {
  section: string;
};

const ProfileItemList = ({section}: ProfileItemListProps) => {
  const {completed, created, selected} = useAppSelector(state => state.profile);
  const tasks =
    section === 'Selected'
      ? selected
      : section === 'Completed'
      ? completed
      : created;

  return (
    <>
      {tasks?.length > 0 ? (
        <FlatList<TaskDataProps>
          numColumns={2}
          data={tasks}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item, index}: RenderList) => (
            <View flex={1}>
              <Card key={index} task={item} />
            </View>
          )}
        />
      ) : (
        <View p={10}>
          <NoTaskNotice title={section} profile />
        </View>
      )}
    </>
  );
};

export default ProfileItemList;
