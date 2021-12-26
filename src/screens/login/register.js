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
  ScrollView,
} from 'react-native';

import Loading from '../../components/loading/index';
import AdsShowcase from '../../components/adsShowcase';

import logo from '../../assets/images/logo.png';
import commonStyles from '../../styles/commonStyles';
import { createDistributorAccount } from '../../database/methods';
import gstCheckSumValidation from '../../utils/gstCheckSumValidation';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      number: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      gstNumber: '',
    };

    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleRegisterButonPress = this.handleRegisterButonPress.bind(this);
    this.handleConfirmPasswordInput =
      this.handleConfirmPasswordInput.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handlePhoneNumberInput = this.handlePhoneNumberInput.bind(this);
    this.handleGstNumberInput = this.handleGstNumberInput.bind(this);
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

  handlePhoneNumberInput(val) {
    this.setState({
      number: val,
    });
  }

  handleNameInput(val) {
    this.setState({
      name: val,
    });
  }

  handleGstNumberInput(val) {
    this.setState({
      gstNumber: val,
    });
  }

  handleRegisterButonPress() {
    const { password, confirmPassword, email, gstNumber } = this.state;

    var trimmedGst = gstNumber.trim();
    const isGstValid = gstCheckSumValidation(trimmedGst);

    if (trimmedGst !== '' && !isGstValid) {
      Alert.alert('Invalid GST', 'The GST entered is invalid');
      return;
    }

    if (isGstValid) {
      if (password !== confirmPassword) {
        Alert.alert(
          'Password Mismatch',
          'The confirm password does not match the password',
        );
        return;
      } else {
        if (email.trim() === '') {
          return;
        }
        this.setState({
          isLoading: true,
        });
        createDistributorAccount('', email, '', '', password)
          .catch(() => {
            Alert.alert(
              'Problem creating account',
              'There was a problem creating an account. Please check your email',
            );
          })
          .finally(() => {
            this.setState({
              isLoading: false,
            });
          });
      }
    }
  }

  render() {
    const {
      email,
      password,
      isLoading,
      confirmPassword,
      name,
      number,
      gstNumber,
    } = this.state;
    return (
      <SafeAreaView style={[styles.container, styles.flexColumn]}>
        <Loading isLoading={isLoading} />
        <View style={{}}>
          <AdsShowcase />
        </View>
        <View style={{ height: 100 }}>
          <View style={[styles.container, styles.logoWrapper]}>
            <Image resizeMode="contain" style={styles.logo} source={logo} />
          </View>
        </View>
        <ScrollView style={[{ paddingHorizontal: 20, marginBottom: 10 }]}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={this.handleEmailInput}
            />
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={this.handleNameInput}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="mobile number"
            placeholderTextColor="gray"
            keyboardType="number-pad"
            value={number}
            onChangeText={this.handlePhoneNumberInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder="GST Number"
            placeholderTextColor="gray"
            value={gstNumber}
            onChangeText={this.handleGstNumberInput}
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
        </ScrollView>
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
    marginHorizontal: 2,
    marginBottom: 10,
  },
});

export default RegisterScreen;
