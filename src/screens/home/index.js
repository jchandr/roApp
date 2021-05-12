import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthContext from '../../auth/index';
import { isUserAdmin } from '../../database/methods';

class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const user = this.context;
    return (
      <SafeAreaView>
        <View>
          <Text>LOGGED IN {user.email}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
