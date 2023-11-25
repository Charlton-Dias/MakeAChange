import React from 'react';
import Leaflet, {Layers, Markers, TileOptions} from 'react-native-leaflet-ts';
import {TaskDataProps} from '../types';

type MapViewProps = {
  region?: number[];
  tasks?: TaskDataProps[];
};

const MapView: React.FC<MapViewProps> = ({region, tasks}) => {
  const options: TileOptions = {
    noWrap: true,
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

  const markerList: Markers[] =
    tasks?.map(task => ({
      latLng: [task?.geopoint?.latitude, task?.geopoint?.longitude],
      iconSize: {
        width: 10,
        height: 20,
      },
      title: task.taskName,
      icon: 'https://firebasestorage.googleapis.com/v0/b/makeachange-7e3ec.appspot.com/o/assets%2Fmarker-3365838_1280.png?alt=media&token=da8252aa-8eaa-4b38-899f-0549be3334ef',
      disabled: true,
    })) || [];

  return (
    <Leaflet
      mapLayers={mapLayers}
      minZoom={2}
      zoom={13}
      maxZoom={17}
      flyTo={
        region && {
          latLng: region,
          zoom: 15,
        }
      }
      markers={markerList}
      startInLoadingState={false}
    />
  );
};

export default MapView;
