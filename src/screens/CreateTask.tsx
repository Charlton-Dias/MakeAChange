import React, {useEffect, useRef, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Alert,
  Button,
  ButtonGroup,
  ButtonSpinner,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  View,
} from '@gluestack-ui/themed';
import {PermissionsAndroid, ScrollView} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker'; // Add this import

import styles from '../styles';
import FormInput, {FormTextArea} from '../components/FormInput';
import {TabsParamList} from '../types';

function Create() {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <LoginAlert />;
  }
  return <CreateTask user={currentUser} />;
}
export default Create;

const LoginAlert = () => (
  <Alert>
    <Icon name="info-circle" size={24} color={'black'} />
    <Text ml={10} color="black" textAlign="center">
      Please Login to continue
    </Text>
  </Alert>
);

type CreateTaskScreenNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  'CreateTask'
>;

type CreateTaskProps = {
  user: any;
};

const CreateTask: React.FC<CreateTaskProps> = ({user}) => {
  const navigation = useNavigation<CreateTaskScreenNavigationProp>();
  const creator = user.uid;
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsCameraOpen(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const formData = {creator, taskName, description, points, date};
    const docRef = await firestore().collection('tasks').add(formData);

    const imageUrls = await Promise.all(
      images.map(async (image, index) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = storage().ref(`tasks/${docRef.id}/${index}`);
        await imageRef.put(blob);
        return await imageRef.getDownloadURL();
      }),
    );

    await docRef.update({images: imageUrls});
    setLoading(false);
    navigation.navigate('Home');
  };

  const handleDiscard = () => {
    setTaskName('');
    setDescription('');
    setPoints('');
    setDate(new Date());
    setImages([]);
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.p10}>
      {isCameraOpen ? (
        <>
          <ImageCapture
            active={active}
            images={images}
            setActive={setActive}
            setImages={setImages}
            setIsCameraOpen={setIsCameraOpen}
          />
        </>
      ) : (
        <>
          <FormInputFields
            taskName={taskName}
            setTaskName={setTaskName}
            description={description}
            setDescription={setDescription}
            points={points}
            setPoints={setPoints}
          />

          <Deadline date={date} setDate={setDate} />

          <ImageList
            handleOpenCamera={handleOpenCamera}
            handleRemoveImage={index => {
              const newImages = [...images];
              newImages.splice(index, 1);
              setImages(newImages);
            }}
            handlePickImageFromGallery={async () => {
              try {
                const image = await ImageCropPicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                });

                setImages([...images, image.path]);
              } catch (error) {
                console.log(error);
              }
            }}
            images={images}
            setActive={setActive}
          />

          <ButtonGroup w={'100%'}>
            <Button
              w="48%"
              variant="outline"
              action="negative"
              onPress={handleDiscard}>
              <ButtonText>Discard</ButtonText>
            </Button>
            <Button w="48%" onPress={handleSubmit}>
              {loading ? (
                <>
                  <ButtonText>Creating</ButtonText>
                  <ButtonSpinner />
                </>
              ) : (
                <ButtonText>Create</ButtonText>
              )}
            </Button>
          </ButtonGroup>
        </>
      )}
    </ScrollView>
  );
};

interface DeadlineProps {
  date: Date;
  setDate: (date: Date) => void;
}

const Deadline: React.FC<DeadlineProps> = ({date, setDate}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <>
      <FormControlLabel mb="$1">
        <FormControlLabelText>Deadline:</FormControlLabelText>
      </FormControlLabel>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Input isDisabled borderColor={'$black'} mb={10}>
          <InputField>{date.toDateString()}</InputField>
        </Input>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(false);
          }}
        />
      )}
    </>
  );
};

interface FormInputFieldsProps {
  taskName: string;
  setTaskName: (taskName: string) => void;
  description: string;
  setDescription: (description: string) => void;
  points: string;
  setPoints: (points: string) => void;
}

const FormInputFields: React.FC<FormInputFieldsProps> = ({
  taskName,
  setTaskName,
  description,
  setDescription,
  points,
  setPoints,
}) => (
  <>
    <FormInput
      label="Task Name"
      placeholder="Task Name"
      value={taskName}
      onChangeText={setTaskName}
    />

    <FormTextArea
      label="Description"
      placeholder="Description"
      value={description}
      onChangeText={setDescription}
    />

    <FormInput
      label="Points"
      placeholder="Points"
      value={points}
      onChangeText={setPoints}
    />
  </>
);

interface ImageListProps {
  handleOpenCamera: () => void;
  handlePickImageFromGallery: () => void;
  handleRemoveImage: (index: number) => void;
  images: string[];
  setActive: (active: boolean) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  handleOpenCamera,
  handlePickImageFromGallery,
  handleRemoveImage,
  images,
  setActive,
}) => {
  return (
    <ScrollView horizontal style={styles.addImageContainer}>
      <HStack alignItems="center" padding={10}>
        {images.map((image, index) => (
          <View key={index}>
            <Image
              alt={`image_${index}`}
              source={{uri: image}}
              style={styles.addImage}
            />
            <Pressable onPress={() => handleRemoveImage(index)}>
              <Text style={{color: 'red'}}>Remove</Text>
            </Pressable>
          </View>
        ))}
        <Pressable onPress={handlePickImageFromGallery}>
          <Text style={{color: 'blue'}}>Add from Gallery </Text>
        </Pressable>
        <Button
          onPress={() => {
            setActive(true);
            handleOpenCamera();
          }}>
          <ButtonText>+</ButtonText>
        </Button>
      </HStack>
    </ScrollView>
  );
};

interface ImageCaptureProps {
  active: boolean;
  images: string[];
  setActive: (active: boolean) => void;
  setImages: (images: string[]) => void;
  setIsCameraOpen: (isCameraOpen: boolean) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({
  active,
  images,
  setActive,
  setImages,
  setIsCameraOpen,
}) => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const handleTakePhoto = async () => {
    if (camera.current) {
      const options = {quality: 1, base64: true, enableShutterSound: false};
      const newPhoto = await camera.current.takePhoto(options);
      await CameraRoll.save(`file://${newPhoto.path}`, {
        type: 'photo',
      });
      const savedPhoto = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      });
                      const image = await ImageCropPicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true,
                      });
      
      setImages([...images, savedPhoto.edges[0].node.image.uri]);
      setIsCameraOpen(false);
    }
  };

  return (
    <>
      {device && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={active}
          enableZoomGesture
          photo
          orientation="portrait"
          ref={camera}
        />
      )}
      <Pressable
        onPress={() => {
          handleTakePhoto();
          setActive(false);
        }}>
        <View style={styles.capture}>
          <View style={styles.capture2} />
        </View>
      </Pressable>
    </>
  );
};
