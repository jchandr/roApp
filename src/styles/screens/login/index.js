import { StyleSheet } from 'react-native';
import rootStyles from '../../index';

const styles = StyleSheet.create({
  ...rootStyles,
  logoWrapper: {
    justifyContent: 'center',
  },
  logo: {
    height: 160,
    width: 160,
    alignSelf: 'center',
  },
  content: {
    padding: 20,
  },
  emailTextInput: {
    borderWidth: 1,
    color: 'black',
  },
});

export default styles;
