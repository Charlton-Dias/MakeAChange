import React, {useEffect, useState} from 'react';
import {Fab} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getCurrentLocation} from '../functions/location';
import MapViews from '../components/MapView';

const Home = () => {
  const [region, setRegion] = useState([15.4617259147707, 73.83342337687071]);

  const updateLocation = async () => {
    const location = await getCurrentLocation();
    const {latitude, longitude} = location.coords;
    setRegion([latitude, longitude]);
  };
  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <>
      <Fab
        size="md"
        placement="bottom right"
        onPress={() => updateLocation()}
        bottom={80}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </Fab>
      <MapViews region={region} />
    </>
  );
};

export default Home;
