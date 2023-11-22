import firestore from '@react-native-firebase/firestore';
import {TaskDataProps} from '../screens/Tasks';

const deleteTask = async (id: string) => {
  await firestore().collection('tasks').doc(id).update({status: 'deleted'});
  console.log('Task Deleted');
};

//Tasks data
const fetchTasks = async () => {
  const tasksCollection = await firestore().collection('tasks').get();
  const _tasks = tasksCollection.docs.map(
    doc => ({id: doc.id, ...doc.data()} as TaskDataProps),
  );

  const activeTasks: TaskDataProps[] = [];
  const expiredTasks: TaskDataProps[] = [];
  const completedTasks: TaskDataProps[] = [];

  _tasks.forEach(task => {
    if (task.status !== 'deleted') {
      if (task.status === 'completed') {
        completedTasks.push(task);
      } else if (task.date.toDate() < new Date()) {
        expiredTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    }
  });
  return {
    active: activeTasks,
    completed: completedTasks,
    expired: expiredTasks.reverse(),
  };
};

export {deleteTask, fetchTasks};
