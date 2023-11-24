import firestore from '@react-native-firebase/firestore';

export type TabsParamList = {
  Home: undefined;
  Tasks: undefined;
  CreateTask: undefined;
  Profile: undefined;
};

export type StackParamList = {
  User: undefined;
  Login: undefined;
  Signup: undefined;
};

export type TaskDataProps = {
  id: string;
  creator: string;
  taskName: string;
  date: any;
  description?: string;
  status?: string;
  selectedBy?: string;
  images?: string[];
  geopoint?: typeof firestore.GeoPoint;
};
