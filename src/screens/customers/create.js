import React, { Component } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthContext from '../../auth/index';

import { createCustomerRecord } from '../../database/methods';
import commonStyles from '../../styles/commonStyles';

class ContactCreate extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      customerData: {
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
      datePickerValue: new Date(),
      datePickerFieldName: '',
      isDatePickerVisible: false,
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }

  componentDidMount() {}

  handleDatePickerChange(val) {
    const {
      nativeEvent: { timestamp },
      type,
    } = val;
    if (type === 'dismissed') {
      this.setState({
        isDatePickerVisible: false,
        isCustomerDataInvalidated: false,
      });
      return;
    }
    var { customerData, datePickerFieldName } = this.state;
    var thisDate = timestamp.toISOString().slice(0, 10);
    customerData[`${datePickerFieldName}`] = thisDate;
    this.setState({
      isDatePickerVisible: false,
      customerData: customerData,
      isCustomerDataInvalidated: true,
    });
  }

  openDatePicker(fieldName) {
    const { customerData } = this.state;
    var thisDate = customerData[`${fieldName}`];
    thisDate = new Date(Date.parse(thisDate));
    this.setState({
      isDatePickerVisible: true,
      datePickerFieldName: fieldName,
      datePickerValue: thisDate,
    });
  }

  handleSaveButtonClick() {
    const { customerData } = this.state;
    const userId = this.context.uid;
    createCustomerRecord(userId, customerData).then(() => {
      this.setState({
        isCustomerDataInvalidated: false,
      });
    });
  }

  handleTextInputChange(changedText, field) {
    var { customerData } = this.state;
    customerData[`${field}`] = changedText;
    this.setState({
      customerData: customerData,
    });
  }

  render() {
    const { customerData, datePickerValue, isDatePickerVisible } = this.state;
    return (
      <SafeAreaView style={styles.flexContainer}>
        {isDatePickerVisible && (
          <DateTimePicker
            value={datePickerValue}
            mode="date"
            display="default"
            onChange={this.handleDatePickerChange}
          />
        )}
        <ScrollView style={[styles.container, styles.flexColumn]}>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Name"
              onChangeText={text =>
                this.handleTextInputChange(text, 'fullName')
              }
              style={styles.textInput}
              value={customerData.fullName}
            />
            <TextInput
              mode="outlined"
              label="ID"
              style={styles.textInput}
              value={customerData.customerId}
              disabled
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Mobile"
              keyboardType="number-pad"
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'mobile')}
              value={customerData.mobile}
            />
            <TextInput
              mode="outlined"
              label="Address"
              style={styles.textInput}
              value={customerData.address}
              onChangeText={text => this.handleTextInputChange(text, 'address')}
              multiline
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Model"
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'model')}
              value={customerData.model}
            />
            <TextInput
              mode="outlined"
              label="Brand Name"
              style={styles.textInput}
              value={customerData.brandName}
              onChangeText={text =>
                this.handleTextInputChange(text, 'brandName')
              }
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="WaterSource"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'waterSource')
              }
              value={customerData.waterSource}
            />
            <TextInput
              mode="outlined"
              label="Adapter"
              style={styles.textInput}
              value={customerData.adapter}
              onChangeText={text => this.handleTextInputChange(text, 'adapter')}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Alkaline Filter"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'alkalineFilter')
              }
              value={customerData.alkalineFilter}
            />
            <TextInput
              mode="outlined"
              label="Inline Carbon"
              style={styles.textInput}
              value={customerData.inlineCarbon}
              onChangeText={text =>
                this.handleTextInputChange(text, 'inlineCarbon')
              }
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Inline Segment"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'inlineSegment')
              }
              value={customerData.inlineSegment}
            />
            <Pressable
              style={styles.textInput}
              onPress={() => this.openDatePicker('installationDate')}>
              <TextInput
                editable={false}
                mode="outlined"
                label="Installation Date"
                value={String(customerData.installationDate)}
              />
            </Pressable>
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Membrane"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'Membrane')
              }
              value={customerData.membrane}
            />
            <TextInput
              mode="outlined"
              label="Mineral Catridge"
              style={styles.textInput}
              value={customerData.mineralCatridge}
              onChangeText={text =>
                this.handleTextInputChange(text, 'mineralCatridge')
              }
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Motor"
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'motor')}
              value={customerData.motor}
            />
            <TextInput
              mode="outlined"
              label="SV"
              style={styles.textInput}
              value={customerData.sv}
              onChangeText={text => this.handleTextInputChange(text, 'sv')}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Service Duration"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'serviceDuration')
              }
              value={customerData.serviceDuration}
            />
            <TextInput
              mode="outlined"
              label="Spun"
              style={styles.textInput}
              value={customerData.spun}
              onChangeText={text => this.handleTextInputChange(text, 'spun')}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="UF"
              style={styles.textInput}
              onChangeText={text => this.handleTextInputChange(text, 'uf')}
              value={customerData.uf}
            />
            <TextInput
              mode="outlined"
              label="UV"
              style={styles.textInput}
              value={customerData.uv}
              onChangeText={text => this.handleTextInputChange(text, 'uv')}
            />
          </View>
          <View style={[styles.container]}>
            <Pressable
              style={styles.textInput}
              onPress={() => this.openDatePicker('entryDate')}>
              <TextInput
                editable={false}
                mode="outlined"
                label="Entry Date"
                value={String(customerData.entryDate)}
              />
            </Pressable>
            <TextInput
              mode="outlined"
              label="Service Type"
              style={styles.textInput}
              value={customerData.serviceType}
              onChangeText={text =>
                this.handleTextInputChange(text, 'serviceType')
              }
            />
          </View>
        </ScrollView>

        <View style={styles.saveButtonWrapper}>
          <Button
            icon="content-save"
            mode="contained"
            style={styles.flexContainer}
            onPress={() => this.handleSaveButtonClick()}>
            Save
          </Button>
        </View>
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

export default ContactCreate;
