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
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AuthContext from '../../auth/index';
import { getCustomerById } from '../../database/methods';

import commonstyles from '../../styles/commonStyles';

class ShowService extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      currentServiceId: props.route.params.id,
      currentServiceData: props.route.params.data,
      isCloseServiceModalVisible: false,
      customerData: {},
    };

    this.handleCloseServiceModalHide = this.handleCloseServiceModalHide.bind(
      this,
    );
    this.handleCloseServiceButtonPress = this.handleCloseServiceButtonPress.bind(
      this,
    );
  }

  componentDidMount() {
    const { currentServiceData } = this.state;
    console.log(currentServiceData);
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

  render() {
    const {
      currentServiceData,
      customerData,
      isCloseServiceModalVisible,
    } = this.state;
    return (
      <SafeAreaView style={styles.flexContainer}>
        {!currentServiceData.isClosed && (
          <Portal>
            <Modal
              visible={isCloseServiceModalVisible}
              onDismiss={this.handleCloseServiceModalHide}
              contentContainerStyle={styles.modalContainerStyle}>
              <Text>Please Enter The Completion OTP Sent to Customer</Text>
              <View>
                <OTPInputView
                  autoFocusOnLoad
                  style={{ width: '80%', height: 100 }}
                  codeInputFieldStyle={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                  }}
                  pinCount={4}
                />
              </View>
              <TouchableOpacity style={styles.confirmOtpAndClose}>
                <Text style={styles.blockButtonText}>
                  Confirm OTP & Close Service
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resendOtp}>
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
              label="Service Due Date"
              style={styles.textInput}
              onChangeText={text =>
                this.handleTextInputChange(text, 'alkalineFilter')
              }
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
