import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import AdsShowcase from '../../components/adsShowcase/index';
import commonStyles from '../../styles/commonStyles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          label: 'Customers',
          routeName: 'Customer Index',
        },
        {
          label: 'Todays Services',
          routeName: 'Todays Services',
        },
        {
          label: 'Closed Services',
          routeName: 'Closed Services',
        },
      ],
    };
    this.handleCardItemPress = this.handleCardItemPress.bind(this);
  }

  componentDidMount() {}

  handleCardItemPress(card) {
    this.props.navigation.navigate(card.routeName);
  }

  render() {
    const { cards } = this.state;
    return (
      <SafeAreaView style={styles.flexContainer}>
        <View>
          <AdsShowcase />
        </View>
        <View style={styles.cardsWrapper}>
          {cards.map((card, i) => {
            return (
              <Card
                key={i}
                elevation={10}
                style={styles.cardItem}
                onPress={() => this.handleCardItemPress(card)}>
                <Card.Content
                  style={[styles.cardItemContent, styles.justifyAlignCenter]}>
                  <Text style={styles.cardItemText}>{card.label}</Text>
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonStyles,
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

export default Home;
