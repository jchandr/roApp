import { StyleSheet } from 'react-native';
import rootStyles from '../../index';

const styles = StyleSheet.create({
  ...rootStyles,
  logoutButton: {
    backgroundColor: '#04009A',
  },
  logoutButtonLabelText: {
    color: '#ffffff',
  },
  customDrawerItemWrapper: {
    padding: 5,
  },
  userProfileDrawerItemWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  userProfileDrawerItemAvatar: {},
  userProfileDrawerItemEmail: {
    paddingLeft: 10,
    fontSize: 17,
  },
});

export default styles;
