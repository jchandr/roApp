import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthContext from '../../auth/index';

class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.context);
  }

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
