import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this);
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>LOGGED IN</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
