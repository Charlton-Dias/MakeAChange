import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Fab, View} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getCurrentLocation} from '../functions/location';
import MapViews from '../components/MapView';
import styles from '../styles';
import {useAppSelector} from '../redux/hooks';
const Home = () => {
  const [region, setRegion] = useState([undefined, undefined]);
  const [loading, setLoading] = useState(false);
  const updateLocation = async () => {
    setLoading(true);
    const location = await getCurrentLocation();
    setRegion([location.coords.latitude, location.coords.longitude]);
    setLoading(false);
  };
  const {data} = useAppSelector(state => state.tasks);
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
