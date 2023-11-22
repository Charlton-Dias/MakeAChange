import {Alert, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const getCurrentLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Location permission denied');
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => {
          if (error.code === 1) {
            Alert.alert(
              'Location Permission Denied',
              'This app requires access to your location. Please grant permission.',
            );
          } else if (error.code === 2) {
            Alert.alert(
              'Location Unavailable',
              'Your location is currently unavailable. Please check your device settings.',
            );
          } else if (error.code === 3) {
            Alert.alert(
              'Location Request Timed Out',
              'Unable to determine your location. Please try again.',
            );
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message: 'This app needs access to your location',
                buttonPositive: 'OK',
              },
            );
          }
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 120000,
          maximumAge: 1000,
          distanceFilter: 10,
        },
      );
    });
  } catch (err) {
    console.warn(err);
    Alert.alert(
      'Location Permissions Denied',
      'This app requires precise location to work.',
    );
    throw err;
  }
};

export {getCurrentLocation};
