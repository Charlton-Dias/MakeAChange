import React, {useRef, useState} from 'react';
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
  VStack,
} from '@gluestack-ui/themed';

import {Alert, PermissionsAndroid, ScrollView} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import ImageCropPicker from 'react-native-image-crop-picker';

import styles from '../styles';
import FormInput, {FormTextArea} from '../components/FormInput';
import {getCurrentLocation} from '../functions/location';
import {useUserAuth} from '../hooks';

function Create() {
  const user = useUserAuth();

  if (!user) {
    return <LoginAlert />;
  }
  return <CreateTask user={user} />;
}
export default Create;

const LoginAlert = () => (
  <View justifyContent="center" height={'100%'} p={10}>
    <GsAlert justifyContent="center">
      <Icon name="info-circle" size={24} color={'black'} />
      <Text ml={10} color="black" textAlign="center">
        Please Login to continue
      </Text>
    </GsAlert>
  </View>
);

type CreateTaskProps = {
  user: any;
};

const CreateTask: React.FC<CreateTaskProps> = ({user}) => {
  const creator = user.uid;
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null,
  );
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
    if (!taskName || !description || !date || images.length === 0) {
      setErrorNotification('All fields are required.');
      return;
    }
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
  };

  return (
    <ScrollView style={styles.p10}>
      {errorNotification && (
        <GsAlert
          status="error"
          mb={4}
          justifyContent="space-between"
          flexDirection="row">
          <Text color="black">{errorNotification}</Text>
          <Pressable onPress={() => setErrorNotification(null)}>
            <MaterialIcons name="close" size={24} color="red" />
          </Pressable>
        </GsAlert>
      )}
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

          <Text bold>Images:</Text>
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
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <ScrollView
      horizontal
      style={styles.addImageContainer}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef?.current?.scrollToEnd({animated: true})
      }>
      <HStack alignItems="center" padding={10}>
        {images.map((image, index) => (
          <View key={index}>
            <Image
              alt={`image_${index}`}
              source={{uri: image}}
              style={styles.addImage}
            />
            <Pressable
              onPress={() => handleRemoveImage(index)}
              position="absolute"
              p={10}
              right={0}>
              <MaterialIcons name="close" size={24} color="red" />
            </Pressable>
          </View>
        ))}
        <VStack>
          <Button
            m={10}
            onPress={() => {
              setActive(true);
              handleOpenCamera();
            }}>
            <MaterialIcons name="add-a-photo" size={24} color={'white'} />
          </Button>
          <Button m={10} onPress={handlePickImageFromGallery}>
            <MaterialIcons name="upload-file" size={24} color={'white'} />
          </Button>
        </VStack>
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
