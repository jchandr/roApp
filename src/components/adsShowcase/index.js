import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

class AdsShowcase extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Ads</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default AdsShowcase;
