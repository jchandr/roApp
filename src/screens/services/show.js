import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { TextInput, Button, Portal, Modal } from 'react-native-paper';

import OtpInput from '../../components/otpInput';

import AuthContext from '../../auth/index';
import {
  getCustomerById,
  closeServiceBySatisfiedOtp,
  getServiceById,
} from '../../database/methods';

import commonstyles from '../../styles/commonStyles';
import { sendOtp } from '../../utils/sendSms';

class ShowService extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      currentServiceId: props.route.params.id,
      currentServiceData: props.route.params.data,
      isCloseServiceModalVisible: false,
      customerData: {},
      completionOtp: '',
    };

    this.handleCloseServiceModalHide =
      this.handleCloseServiceModalHide.bind(this);
    this.handleCloseServiceButtonPress =
      this.handleCloseServiceButtonPress.bind(this);
    this.handleConfirmOtpAndCloseService =
      this.handleConfirmOtpAndCloseService.bind(this);
    this.handleResendOtpButtonPress =
      this.handleResendOtpButtonPress.bind(this);
  }

  componentDidMount() {
    const { currentServiceData } = this.state;
    getCustomerById(currentServiceData.customerDocId).then(d => {
      this.setState({
        customerData: d,
      });
    });
  }

  handleCloseServiceModalHide() {
    this.setState({
      isCloseServiceModalVisible: false,
    });
  }

  handleCloseServiceButtonPress() {
    this.setState({
      isCloseServiceModalVisible: true,
    });
  }

  handleConfirmOtpAndCloseService() {
    const { completionOtp, currentServiceData, currentServiceId } = this.state;
    if (Number(completionOtp) === Number(currentServiceData.satisfiedOtp)) {
      this.setState({
        isCloseServiceModalVisible: false,
      });
      closeServiceBySatisfiedOtp(currentServiceId).then(() => {
        getServiceById(currentServiceId).then(d => {
          this.setState({
            currentServiceData: d,
          });
        });
      });
    } else {
      console.log('invalid otp');
    }
  }

  handleResendOtpButtonPress() {
    const { currentServiceData, customerData } = this.state;
    // the third argument dist number is default for now. will be changed later
    sendOtp(
      currentServiceData.satisfiedOtp,
      customerData.mobile,
      '9940333442',
      customerData.name,
    )
      .then(x => console.log(x))
      .catch(x => console.log(x));
  }

  render() {
    const { currentServiceData, customerData, isCloseServiceModalVisible } =
      this.state;

    return (
      <SafeAreaView style={styles.flexContainer}>
        {!currentServiceData.isClosed && (
          <Portal>
            <Modal
              visible={isCloseServiceModalVisible}
              onDismiss={this.handleCloseServiceModalHide}
              contentContainerStyle={styles.modalContainerStyle}>
              <Text>Please Enter The Completion OTP Sent to Customer</Text>
              <OtpInput
                onChange={otp => {
                  this.setState({
                    completionOtp: otp,
                  });
                }}
                otpDigits={4}
              />
              <TouchableOpacity
                style={styles.confirmOtpAndClose}
                onPress={this.handleConfirmOtpAndCloseService}>
                <Text style={styles.blockButtonText}>
                  Confirm OTP & Close Service
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resendOtp}
                onPress={this.handleResendOtpButtonPress}>
                <Text style={styles.blockButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </Modal>
          </Portal>
        )}
        <ScrollView style={[styles.container, styles.flexColumn]}>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Current Service Cycle"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'alkalineFilter')
              }
              disabled
              value={`${currentServiceData.currentServiceMonthCount} / ${currentServiceData.serviceDuration}`}
            />
            <TextInput
              mode="outlined"
              label="Customer Name"
              style={styles.textInput}
              disabled
              value={customerData.fullName}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Mobile Number"
              style={styles.textInput}
              disabled
              value={customerData.mobile}
            />
            <TextInput
              mode="outlined"
              label="Installation Date"
              style={styles.textInput}
              disabled
              value={new Date(customerData.installationDate).toDateString()}
            />
          </View>
          <View style={[styles.container]}>
            <TextInput
              mode="outlined"
              label="Service Due Date"
              style={styles.textInput}
              disabled
              value={new Date(currentServiceData.serviceDueDate).toDateString()}
            />
            <TextInput
              mode="outlined"
              label="Service Status"
              style={[
                styles.textInput,
                currentServiceData.isClosed
                  ? styles.serviceClosedBackground
                  : styles.serviceOpenBackground,
              ]}
              disabled
              value={currentServiceData.isClosed ? 'Closed' : 'Open'}
            />
          </View>
        </ScrollView>

        {!currentServiceData.isClosed && (
          <TouchableOpacity
            mode="contained"
            style={styles.closeServiceButton}
            onPress={this.handleCloseServiceButtonPress}>
            <Text style={styles.blockButtonText}>Close Service</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonstyles,
  textInput: {
    padding: 10,
    flex: 1,
  },
  closeServiceButton: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a8ffbf',
  },
  serviceOpenBackground: {
    backgroundColor: '#ff6b75',
  },
  serviceClosedBackground: {
    backgroundColor: '#a8ffbf',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmOtpAndClose: {
    width: '100%',
    height: 60,
    backgroundColor: '#547f5f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  resendOtp: {
    height: 30,
    backgroundColor: '#feded5',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ShowService;
