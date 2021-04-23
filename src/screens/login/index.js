/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, View, Image, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from '../../styles/screens/login/index';

import logo from '../../assets/images/logo.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleLoginButtonPress() {
    const { email, password } = this.state;
    auth().signInWithEmailAndPassword(email, password);
  }

  handleEmailInput(val) {
    this.setState({
      email: val,
    });
  }
  handlePasswordInput(val) {
    this.setState({
      password: val,
    });
  }

  render() {
    const { email, password } = this.state;
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
            value={email}
            onChangeText={this.handleEmailInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
          />
          <View>
            <Button title="Login" onPress={this.handleLoginButtonPress} />
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
