import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthContext from '../../auth/index';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>You see this because you are admin</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
