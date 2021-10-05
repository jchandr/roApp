import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import AuthContext from '../../auth/index';

import { createDistributorAccount } from '../../database/methods';
import commonStyles from '../../styles/commonStyles';

class DistributorCreate extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      distributorData: {
        name: 'test',
        mobile: '1234567890',
        address: 'temp address',
        email: 'test@test.com',
      },
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  componentDidMount() {}

  handleSaveButtonClick() {
    const { distributorData } = this.state;

    createDistributorAccount(
      distributorData.name,
      distributorData.email,
      distributorData.mobile,
      distributorData.address,
    )
      .then(x => {
        Alert.alert(
          'Account Created',
          `Please take note of the email ${distributorData.email}. You will be now logged in as the user ${distributorData.email}. You can logout if you wish to.`,
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ],
        );
      })
      .catch(() => {
        Alert.alert('Problem Creating Account', 'Please check the email', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      });
  }

  handleTextInputChange(changedText, field) {
    var { distributorData } = this.state;
    distributorData[`${field}`] = changedText;
    this.setState({
      distributorData: distributorData,
    });
  }

  render() {
    const { distributorData } = this.state;
    return (
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView style={[styles.container, styles.flexColumn]}>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Name"
              onChangeText={text => this.handleTextInputChange(text, 'name')}
              style={styles.textInput}
              value={distributorData.name}
            />
            <TextInput
              mode="outlined"
              label="Mobile"
              onChangeText={text => this.handleTextInputChange(text, 'mobile')}
              keyboardType="number-pad"
              style={styles.textInput}
              value={distributorData.mobile}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Address"
              multiline
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'address')}
              value={distributorData.address}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'email')}
              value={distributorData.email}
            />
          </View>
          <View style={styles.saveButtonWrapper}>
            <Button
              icon="content-save"
              mode="contained"
              style={styles.flexContainer}
              onPress={() => this.handleSaveButtonClick()}>
              Create Distrubutor
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonStyles,
  textInput: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  saveButtonWrapper: {
    height: 40,
  },
});

export default DistributorCreate;
