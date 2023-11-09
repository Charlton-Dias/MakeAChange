import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Leaflet, {Layers, Markers, TileOptions} from 'react-native-leaflet-ts';
import {Fab, Heading} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const [region, setRegion] = useState([15.4617259147707, 73.83342337687071]);

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
      console.log('permissions: ', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion([latitude, longitude]);
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const options: TileOptions = {
    noWrap: false,
    detectRetina: true,
    updateWhenIdle: true,
  };

  const mapLayers: Layers[] = [
    {
      name: 'Satellite View',
      src: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      tileOptions: options,
    },
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
      <Heading textAlign="center">Taskify</Heading>
      <Fab
        size="md"
        placement="bottom right"
        onPress={() => getCurrentLocation()}
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
