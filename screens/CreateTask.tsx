import React, {useRef, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  Image,
  Input,
  InputField,
  Pressable,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import {ButtonGroup} from '@gluestack-ui/themed';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import FormInput from '../components/FormInput';
import {PermissionsAndroid} from 'react-native';
import styles from '../styles';
import {HStack} from '@gluestack-ui/themed';

function CreateTask({onClose}: any) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [active, setActive] = useState(true);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

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
      setImages([...images, savedPhoto.edges[0].node.image.uri]);
      setIsCameraOpen(false);
    }
  };

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

  const handleSubmit = () => {
    const formData = {taskName, description, points, date, images};
    onClose();
  };

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <ScrollView>
      {isCameraOpen ? (
        <>
          <Camera
            style={styles.camera}
            device={device}
            isActive={active}
            enableZoomGesture
            photo
            orientation="portrait"
            ref={camera}
          />
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
      ) : (
        <>
          <FormInput
            label="Task Name"
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />

          <FormInput
            label="Description"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <FormInput
            label="Points"
            placeholder="Points"
            value={points}
            onChangeText={setPoints}
          />

          <FormControlLabel mb="$1">
            <FormControlLabelText>Deadline:</FormControlLabelText>
          </FormControlLabel>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Input isDisabled mb={10}>
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

          <ScrollView
            horizontal
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }
            style={styles.addImageContainer}
            mb={10}>
            <HStack alignItems="center" padding={10}>
              {images.map((image, index) => (
                <Image
                  alt={`image_${index}`}
                  key={index}
                  source={{uri: image}}
                  style={styles.addImage}
                />
              ))}
              <Button
                onPress={() => {
                  setActive(true);
                  handleOpenCamera();
                }}>
                <ButtonText>+</ButtonText>
              </Button>
            </HStack>
          </ScrollView>

          <ButtonGroup w={'100%'}>
            <Button
              w="48%"
              variant="outline"
              action="negative"
              onPress={onClose}>
              <ButtonText>Discard</ButtonText>
            </Button>
            <Button w="48%" onPress={handleSubmit}>
              <ButtonText>Create</ButtonText>
            </Button>
          </ButtonGroup>
        </>
      )}
    </ScrollView>
  );
}

export default CreateTask;
