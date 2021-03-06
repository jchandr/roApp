/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import Loading from '../../components/loading/index';
import AdsShowcase from '../../components/adsShowcase';

import logo from '../../assets/images/logo.png';
import commonStyles from '../../styles/commonStyles';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };

    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
    this.handleRegisterButtonPress = this.handleRegisterButtonPress.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleLoginButtonPress() {
    const { email, password } = this.state;
    if (email.trim() === '' || password.length === 0) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert('Invalid Login', 'Invalid Login');
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  handleRegisterButtonPress() {
    this.props.navigation.navigate('Register');
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
    const { email, password, isLoading } = this.state;
    return (
      <SafeAreaView style={[styles.container, styles.flexColumn]}>
        <Loading isLoading={isLoading} />
        <View style={{flex: 2}}>
          <AdsShowcase />
        </View>
        <View style={{ height: 100}}>
          <View style={[styles.container, styles.logoWrapper]}>
            <Image resizeMode="contain" style={styles.logo} source={logo} />
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
            onChangeText={this.handlePasswordInput}
          />
          <Button title="Login" onPress={this.handleLoginButtonPress} />
          <View style={styles.horizontalDivider} />
          <Button title="Register" onPress={this.handleRegisterButtonPress} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonStyles,
  logoWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    alignSelf: 'center',
  },
  content: {
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    color: 'black',
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
