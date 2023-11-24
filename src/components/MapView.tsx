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
        width: 30,
        height: 30,
      },
      title: task.taskName,
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
