import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { TextInput, Button, Portal, Dialog, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import AuthContext from '../../auth/index';

import { getCustomerById, updateCustomerInfo } from '../../database/methods';
import { serviceAlert } from '../../utils/sendSms/index';
import commonStyles from '../../styles/commonStyles';

class ContactShow extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isCustomerDataInvalidated: false,
      customerData: {
        fullName: '',
        customerId: 0,
        mobile: '',
        address: '',
        model: '',
        brandName: '',
        waterSource: '',
        adapter: '',
        alkalineFilter: '',
        inlineCarbon: '',
        inlineSegment: '',
        installationDate: new Date().getTime(),
        membrane: '',
        mineralCatridge: '',
        motor: '',
        sv: '',
        serviceDuration: '',
        spun: '',
        uf: '',
        uv: '',
      },
      datePickerValue: new Date(),
      datePickerFieldName: '',
      isDatePickerVisible: false,
      requiredCustomerDataFields: [
        'membrane',
        'motor',
        'spun',
        'fullName',
        'mobile',
        'address',
      ],
      waterSourceMenuOptions: [
        'bore water',
        'well water',
        'corporation water',
        'other',
      ],
      serviceDurationOptionsInMonths: [3, 6, 12],
      isServiceDurationMenuVisible: false,
      isWaterSourceMenuVisible: false,
      isRequiredFieldDialogBoxVisible: false,
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleDatePickerChange(val) {
    console.log('date picker chage');
    console.log(val);
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
    var thisDate = new Date(String(timestamp)).getTime();
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
    this.setState({
      isDatePickerVisible: true,
      datePickerFieldName: fieldName,
      datePickerValue: new Date(thisDate),
    });
  }

  handleUpdateButtonClick() {
    const {
      route: {
        params: { id },
      },
    } = this.props;

    const { customerData, requiredCustomerDataFields } = this.state;

    for (let index = 0; index < requiredCustomerDataFields.length; index++) {
      const element = requiredCustomerDataFields[index];
      if (customerData[element] === '') {
        this.setState({
          isRequiredFieldDialogBoxVisible: true,
        });
        return;
      }
    }

    updateCustomerInfo(id, customerData).then(() => {
      this.setState({
        isCustomerDataInvalidated: false,
      });
      this.props.navigation.replace('Customer Index');
    });
  }

  handleTextInputChange(changedText, field) {
    var { customerData } = this.state;
    customerData[`${field}`] = changedText;
    this.setState({
      customerData: customerData,
      isCustomerDataInvalidated: true,
    });
    this.getData = this.getData.bind(this);
  }

  handleWaterSourceMenuOpen() {
    this.setState({
      isWaterSourceMenuVisible: true,
    });
  }

  handleWaterSourceMenuClose() {
    this.setState({
      isWaterSourceMenuVisible: false,
    });
  }

  handleServiceDurationMenuOpen() {
    this.setState({
      isServiceDurationMenuVisible: true,
    });
  }

  handleServiceDurationMenuClose() {
    this.setState({
      isServiceDurationMenuVisible: false,
    });
  }

  handleWaterSourceOptionPress(option) {
    const { customerData } = this.state;
    customerData.waterSource = option;
    this.setState({
      customerData: customerData,
      isWaterSourceMenuVisible: false,
    });
  }

  handleServiceDurationOptionPress(option) {
    const { customerData } = this.state;
    customerData.serviceDuration = option;
    this.setState({
      customerData: customerData,
      isServiceDurationMenuVisible: false,
    });
  }

  handleRequiredFieldDialogBoxClose() {
    this.setState({
      isRequiredFieldDialogBoxVisible: false,
    });
  }

  getData() {
    const {
      route: {
        params: { id },
      },
    } = this.props;
    this.setState({
      isRefreshing: true,
    });
    getCustomerById(id).then(data => {
      this.setState({
        customerData: data,
        isRefreshing: false,
        isCustomerDataInvalidated: false,
      });
    });
  }

  convertDateSecondsToDateString(secs) {
    return new Date(secs).toISOString().split('T')[0];
  }

  render() {
    const {
      customerData,
      datePickerValue,
      isDatePickerVisible,
      isWaterSourceMenuVisible,
      waterSourceMenuOptions,
      isServiceDurationMenuVisible,
      serviceDurationOptionsInMonths,
      isRequiredFieldDialogBoxVisible,
    } = this.state;
    return (
      <SafeAreaView style={styles.flexContainer}>
        <Portal>
          <Dialog visible={isRequiredFieldDialogBoxVisible} dismissable={false}>
            <Dialog.Title>Validation Error</Dialog.Title>
            <Dialog.Content>
              <Text>
                Fields Outlined in Red are required fields. Please check.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => this.handleRequiredFieldDialogBoxClose()}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
              value={String(customerData.customerId)}
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
          <View>
            <Menu
              visible={isWaterSourceMenuVisible}
              onDismiss={() => this.handleWaterSourceMenuClose()}
              anchor={
                <Pressable onPress={() => this.handleWaterSourceMenuOpen()}>
                  <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    label="WaterSource"
                    editable={false}
                    onChangeText={text =>
                      this.handleTextInputChange(text, 'waterSource')
                    }
                    value={customerData.waterSource}
                  />
                </Pressable>
              }>
              {waterSourceMenuOptions.map((waterOption, i) => {
                return (
                  <Menu.Item
                    key={i}
                    onPress={() =>
                      this.handleWaterSourceOptionPress(waterOption)
                    }
                    title={waterOption}
                  />
                );
              })}
            </Menu>

            <Menu
              visible={isServiceDurationMenuVisible}
              onDismiss={() => this.handleServiceDurationMenuClose()}
              anchor={
                <Pressable onPress={() => this.handleServiceDurationMenuOpen()}>
                  <TextInput
                    mode="outlined"
                    editable={false}
                    label="Service Duration"
                    style={styles.textInput}
                    onChangeText={text =>
                      this.handleTextInputChange(text, 'serviceDuration')
                    }
                    value={
                      customerData.serviceDuration === ''
                        ? ''
                        : `${customerData.serviceDuration} months`
                    }
                  />
                </Pressable>
              }>
              {serviceDurationOptionsInMonths.map((option, i) => {
                return (
                  <Menu.Item
                    key={i}
                    onPress={() =>
                      this.handleServiceDurationOptionPress(option)
                    }
                    title={`${option} months`}
                  />
                );
              })}
            </Menu>
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
                value={this.convertDateSecondsToDateString(
                  customerData.installationDate,
                )}
              />
            </Pressable>
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Membrane"
              error={customerData.membrane === '' ? true : false}
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'membrane')
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
              error={customerData.motor === '' ? true : false}
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
              label="Adapter"
              style={styles.textInput}
              value={customerData.adapter}
              onChangeText={text => this.handleTextInputChange(text, 'adapter')}
            />
            <TextInput
              mode="outlined"
              label="Spun"
              error={customerData.spun === '' ? true : false}
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
        </ScrollView>
        <View style={styles.saveButtonWrapper}>
          <Button
            icon="content-save"
            mode="contained"
            style={styles.flexContainer}
            onPress={() => this.handleUpdateButtonClick()}>
            Update
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonStyles,
  textInput: {
    padding: 10,
    flex: 1,
  },
  saveButtonWrapper: {
    height: 40,
  },
});

export default ContactShow;
