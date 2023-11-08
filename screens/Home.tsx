import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Leaflet, {Layers, Markers, TileOptions} from 'react-native-leaflet-ts';

const Home = () => {
  const [region, setRegion] = useState([0, 0]);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Locatiom',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    )
      .then(res => {
        console.log('Location Permission: ', res);
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion([latitude, longitude]);
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  }, []);

  const options: TileOptions = {
    noWrap: false,
    detectRetina: true,
    updateWhenIdle: true,
  };

  const mapLayers: Layers[] = [
    {
      name: 'Floor 1',
      src: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileOptions: options,
    },
  ];

  const markerList: Markers[] = [
    {
      latLng: region,
      iconSize: {
        width: 40,
        height: 40,
      },
      title: 'Task 1',
      disabled: true,
    },
  ];

  return (
    <>
      <Leaflet
        mapLayers={mapLayers}
        minZoom={2}
        zoom={13}
        maxZoom={17}
        flyTo={{
          latLng: region,
          zoom: 14,
        }}
        markers={markerList}
        startInLoadingState
      />
    </>
  );
};

export default Home;
