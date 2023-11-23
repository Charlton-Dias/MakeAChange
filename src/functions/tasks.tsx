import firestore from '@react-native-firebase/firestore';

const completedTask = async (id: string) => {
  await firestore().collection('tasks').doc(id).update({status: 'completed'});
};

const deleteTask = async (id: string) => {
  await firestore().collection('tasks').doc(id).update({status: 'deleted'});
};

const acceptTask = async (id: string, userId: string) => {
  await firestore()
    .collection('tasks')
    .doc(id)
    .update({selectedBy: userId, status: 'taken'});
};

export {acceptTask, completedTask, deleteTask};
