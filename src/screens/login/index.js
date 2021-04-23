/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, View, Image, TextInput, Button } from 'react-native';

import styles from '../../styles/screens/login/index';

import logo from '../../assets/images/logo.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, styles.flexColumn]}>
        <View style={{ flex: 2 }}>
          <View style={[styles.container, styles.logoWrapper]}>
            <Image style={styles.logo} source={logo} />
          </View>
        </View>
        <View style={[{ flex: 5 }, styles.content]}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor="gray"
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="gray"
            secureTextEntry
          />
          <View>
            <Button title="Login" />
          </View>
          <View style={styles.horizontalDivider} />
          <View>
            <Button title="Register" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
