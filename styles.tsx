import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profileAvatar: {
    width: 100,
    height: 100,
  },
  profileCardContainter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  navBar: {
    width: '95%',
    alignSelf: 'center',
    borderColor: '#005DB4',
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    padding: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  navBarActiveTab: {
    backgroundColor: '#1A6EBC',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
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
  taskContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default styles;
