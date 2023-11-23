import React, {useEffect, useRef, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Alert as GsAlert,
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
  Fab,
} from '@gluestack-ui/themed';
import {Alert, PermissionsAndroid, ScrollView} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker'; 
import ImagePicker from 'react-native-image-picker'; 

import styles from '../styles';
import FormInput, {FormTextArea} from '../components/FormInput';
import {TabsParamList} from '../types';
import {getCurrentLocation} from '../functions/location';

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
  <GsAlert>
    <Icon name="info-circle" size={24} color={'black'} />
    <Text ml={10} color="black" textAlign="center">
      Please Login to continue
    </Text>
  </GsAlert>
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
        Alert.alert(
          'Camera permission denied',
          'Please allow camera access to capture images.',
        );
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const status = 'new';
    const {latitude, longitude} = (await getCurrentLocation()).coords;
    const geopoint = new firestore.GeoPoint(latitude, longitude);
    const formData = {creator, date, description, geopoint, status, taskName};
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
    handleDiscard();
  };

  const handleDiscard = () => {
    setTaskName('');
    setDescription('');
    setDate(new Date());
    setImages([]);
    navigation.navigate('CreateTask');
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
              isDisabled={loading}
              onPress={handleDiscard}>
              <ButtonText>Discard</ButtonText>
            </Button>
            <Button w="48%" onPress={handleSubmit} isDisabled={loading}>
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
}

const FormInputFields: React.FC<FormInputFieldsProps> = ({
  taskName,
  setTaskName,
  description,
  setDescription,
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

      await new Promise(resolve => setTimeout(resolve, 0));

      try {
        ImageCropPicker.openCropper({
          path: `file://${newPhoto.path}`,
          width: 300,
          height: 400,
          cropping: true,
        }).then(croppedImage => {
          if (croppedImage && croppedImage.path) {
            setImages([...images, croppedImage.path]);
          }
          setIsCameraOpen(false);
        });
      } catch (error) {
        console.log('Error during cropping:', error);
        setIsCameraOpen(false);
      }
    }
  };
  return (
    <>
      {device && (
        <>
          <Fab
            size="md"
            placement="top right"
            backgroundColor="transparent"
            onPress={() => {
              setActive(false);
              setIsCameraOpen(false);
            }}>
            <MaterialIcons name="close" size={24} color="white" />
          </Fab>
          <Camera
            style={styles.camera}
            device={device}
            isActive={active}
            enableZoomGesture
            photo
            orientation="portrait"
            ref={camera}
          />
        </>
      )}
      <Pressable
        onPress={() => {
          handleTakePhoto();
          setActive(false);
        }}>
        <View style={styles.capture}>
          <MaterialIcons name="camera" size={45} color={'white'} />
        </View>
      </Pressable>
    </>
  );
};
