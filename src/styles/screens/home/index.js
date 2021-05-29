import { StyleSheet } from 'react-native';
import rootStyles from '../../index';

const styles = StyleSheet.create({
  ...rootStyles,
  cardsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  cardItem: {
    height: 100,
    width: 100,
    margin: 5,
    display: 'flex',
    flexGrow: 1,
  },
  cardItemContent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
