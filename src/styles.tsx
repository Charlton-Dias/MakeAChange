import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  addImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  addImageContainer: {
    borderRadius: 10,
    borderWidth: 1,
    height: 130,
    marginBottom: 10,
  },
  camera: {
    width: width,
    height: height - 150,
  },
  capture: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 2,
    borderColor: 'white',
    margin: 2,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    padding: 0,
  },
  flatListContainer: {
    padding: 10,
    paddingBottom: 80,
    justifyContent: 'space-between',
  },
  loader: {
    position: 'absolute',
    zIndex: 2,
  },
  loaderBG: {
    backgroundColor: 'rgba(225, 225, 225, 0.5)',
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    width: '95%',
    maxWidth: 400,
    alignSelf: 'center',
    borderColor: '#005DB4',
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  navBarActiveTab: {
    backgroundColor: 'rgba(26, 110, 188, 0.9)',
    borderRadius: 10,
    opacity: 1,
    margin: -12,
    padding: 12,
    color: 'white',
  },
  navBarActiveTabText: {
    marginLeft: 10,
    color: 'white',
  },
  navBarTabs: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  navHeader: {
    height: 40,
  },
  p10: {
    padding: 10,
  },
  profileAvatar: {
    width: 100,
    height: 100,
  },
  profileTabBarIndicatorStyle: {
    backgroundColor: 'rgba(26, 110, 188, 0.9)',
    height: '100%',
    borderRadius: 10,
  },
  profileTabBarStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgba(26, 110, 188, 0.9)',
  },
  profileTabBarLabelStyle: {
    fontSize: 14,
    textTransform: 'none',
  },
  sceneContainerStyle: {
    backgroundColor: 'white',
  },
  taskContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default styles;
