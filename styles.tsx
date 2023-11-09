import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    width: '95%',
    alignSelf: 'center',
    borderColor: '#005DB4',
    opacity: 0.9,
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  navBarActiveTab: {
    backgroundColor: '#1A6EBC',
    borderRadius: 10,
    padding: 10,
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
  profileAvatar: {
    width: 100,
    height: 100,
  },
  profileCardContainter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  profileTabBarIndicatorStyle: {
    backgroundColor: '#1A6EBC',
    height: '100%',
    borderRadius: 10,
  },
  profileTabBarStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#1A6EBC',
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
