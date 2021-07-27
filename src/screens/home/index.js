import React, { Component } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Card } from 'react-native-paper';

import AdsShowcase from '../../components/adsShowcase/index';

import styles from '../../styles/screens/home/index';

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
          routeName: 'Customer Index',
        },
        {
          label: 'Closed Services',
          routeName: 'Customer Index',
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

export default Home;
