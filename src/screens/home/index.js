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
          label: 'Customers1',
          routeName: 'Customer Index',
        },
        {
          label: 'Customers2',
          routeName: 'Customer Index',
        },
        {
          label: 'Customers3',
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
        <View style={[styles.container]}>
          {cards.map((card, i) => {
            return (
              <Card
                key={i}
                elevation={5}
                style={styles.cardItem}
                onPress={() => this.handleCardItemPress(card)}>
                <Card.Content>
                  <Text>{card.label}</Text>
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
