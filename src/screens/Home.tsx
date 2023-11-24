import React, {useEffect, useState} from 'react';
import {ActivityIndicator, PermissionsAndroid} from 'react-native';
import {Fab, View} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getCurrentLocation} from '../functions/location';
import MapViews from '../components/MapView';
import styles from '../styles';
import {useAppSelector} from '../redux/hooks';
import RNExitApp from 'react-native-exit-app';

const Home = () => {
  const [region, setRegion] = useState([undefined, undefined]);
  const [loading, setLoading] = useState(false);
  const {data} = useAppSelector(state => state.tasks);

  const updateLocation = async () => {
    try {
      setLoading(true);

      // Request location permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // If permission is granted, get current location
        const location = await getCurrentLocation();
        setRegion([location.coords.latitude, location.coords.longitude]);
      } else {
        // If permission is denied, exit the app
        console.warn('Location permission denied. Exiting the app.');
        RNExitApp.exitApp();
      }

      setLoading(false);
    } catch (error) {
      console.error('Error updating location:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <>
      {loading && (
        <View style={styles.loaderBG}>
          <ActivityIndicator
            color={'rgba(0,93,180,0.7)'}
            style={styles.loader}
            size={80}
          />
        </View>
      )}

      <Fab
        size="md"
        placement="bottom right"
        onPress={() => updateLocation()}
        bottom={80}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </Fab>

      <MapViews region={region} tasks={data} />
    </>
  );
};

export default Home;
