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
import { createDistributorAccount } from '../../database/methods';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleRegisterButonPress = this.handleRegisterButonPress.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(
      this,
    );
  }

  handleLoginButtonPress() {
    this.props.navigation.navigate('Login');
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
  handleConfirmPasswordInput(val) {
    this.setState({
      confirmPassword: val,
    });
  }

  handleRegisterButonPress() {
    const { password, confirmPassword, email } = this.state;

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'The confirm password does not match the password',
      );
      return;
    } else {
      createDistributorAccount('', email, '', '', password).catch(() => {
        Alert.alert(
          'Problem creating account',
          'There was a problem creating an account. Please check your email',
        );
      });
    }
  }

  render() {
    const { email, password, isLoading, confirmPassword } = this.state;
    return (
      <SafeAreaView style={[styles.container, styles.flexColumn]}>
        <Loading isLoading={isLoading} />
        <View>
          <AdsShowcase />
        </View>
        <View style={{ flex: 4 }}>
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
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            placeholderTextColor="gray"
            secureTextEntry
            value={confirmPassword}
            onChangeText={this.handleConfirmPasswordInput}
          />
          <Button title="Register" onPress={this.handleRegisterButonPress} />
          <View style={styles.horizontalDivider} />
          <Button title="Login" onPress={this.handleLoginButtonPress} />
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
    width: 300,
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

export default RegisterScreen;
