import { StyleSheet } from 'react-native';
import rootStyles from '../../index';

const styles = StyleSheet.create({
  ...rootStyles,
  logoWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 300,
    alignSelf: 'center',
  },
  content: {
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    color: 'black',
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default styles;
