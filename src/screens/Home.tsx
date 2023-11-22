import React, {useEffect, useState} from 'react';
import Leaflet, {Layers, Markers, TileOptions} from 'react-native-leaflet-ts';
import {Fab} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getCurrentLocation} from '../functions/location';

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

  const options: TileOptions = {
    noWrap: false,
    detectRetina: true,
    updateWhenIdle: true,
  };

  const mapLayers: Layers[] = [
    {
      name: 'Street View',
      src: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
      tileOptions: options,
    },
  ];

  const markerList: Markers[] = [
    {
      latLng: region,
      iconSize: {
        width: 20,
        height: 20,
      },
      title: 'Your location',
      disabled: true,
    },
  ];

  return (
    <>
      <Fab
        size="md"
        placement="bottom right"
        onPress={() => updateLocation()}
        bottom={80}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </Fab>
      <Leaflet
        mapLayers={mapLayers}
        minZoom={2}
        zoom={13}
        maxZoom={17}
        flyTo={{
          latLng: region,
          zoom: 15,
        }}
        markers={markerList}
        startInLoadingState
      />
    </>
  );
};

export default Home;
