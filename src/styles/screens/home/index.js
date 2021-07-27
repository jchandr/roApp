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
    backgroundColor: '#ffcdbe',
  },
  cardItemContent: {
    display: 'flex',
    flex: 1,
  },
  cardItemText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
