import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import AuthContext from '../../auth/index';

import { updateCustomerInfo } from '../../database/methods';
import commonStyles from '../../styles/commonStyles';

class DistributorCreate extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      distributorData: {
        fullName: '',
        customerId: '',
        mobile: '',
        address: '',
        model: '',
        brandName: '',
        waterSource: '',
        adapter: '',
        alkalineFilter: '',
        inlineCarbon: '',
        inlineSegment: '',
        installationDate: new Date().toISOString().split('T')[0],
        membrane: '',
        mineralCatridge: '',
        motor: '',
        sv: '',
        serviceDuration: '',
        spun: '',
        uf: '',
        uv: '',
        entryDate: new Date().toISOString().split('T')[0],
        serviceType: '',
      },
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  componentDidMount() {}

  handleSaveButtonClick() {
    const {
      route: {
        params: { id },
      },
    } = this.props;

    const { distributorData } = this.state;

    updateCustomerInfo(id, distributorData).then(() => {
      this.setState({
        isdistributorDataInvalidated: false,
      });
      this.getData();
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
              onChangeText={text =>
                this.handleTextInputChange(text, 'fullName')
              }
              style={styles.textInput}
              value={distributorData.fullName}
            />
            <TextInput
              mode="outlined"
              label="Mobile"
              keyboardType="number-pad"
              style={styles.textInput}
              value={distributorData.customerId}
            />
          </View>

          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Address"
              multiline
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'uf')}
              value={distributorData.uf}
            />
            <TextInput
              mode="outlined"
              label="UV"
              style={styles.textInput}
              value={distributorData.uv}
              onChangeText={text => this.handleTextInputChange(text, 'uv')}
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
