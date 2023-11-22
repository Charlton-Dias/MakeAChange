import firestore from '@react-native-firebase/firestore';

const deleteTask = async (id: string) => {
  await firestore().collection('tasks').doc(id).update({status: 'deleted'});
  console.log('Task Deleted');
};

export {deleteTask};
