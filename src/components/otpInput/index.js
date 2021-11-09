import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: Array(props.otpDigits).fill(' '),
      numberOfOtpDigits: props.otpDigits,
      inputRefs: Array(props.otpDigits)
        .fill(' ')
        .map(() => {
          return React.createRef();
        }),
    };

    this.handleOtpDigitInput = this.handleOtpDigitInput.bind(this);
  }

  componentDidMount() {}

  handleOtpDigitInput(index, val) {
    const { otp, inputRefs, numberOfOtpDigits } = this.state;
    console.log(val);
    otp[index] = String(val);
    this.setState({
      otp: otp,
    });

    this.props.onChange(otp.join(''));
    if (val !== '') {
      if (index < numberOfOtpDigits - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      if (index !== 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  }

  render() {
    const { numberOfOtpDigits, inputRefs } = this.state;
    return (
      <View style={styles.optInputWrapper}>
        {Array(numberOfOtpDigits)
          .fill(1)
          .map((_, index) => {
            return (
              <TextInput
                key={index}
                maxLength={1}
                ref={inputRefs[index]}
                keyboardType="number-pad"
                style={styles.optInput}
                onChangeText={event => this.handleOtpDigitInput(index, event)}
              />
            );
          })}
      </View>
    );
  }
}

OtpInput.propTypes = {
  otpDigits: PropTypes.number,
};

const styles = StyleSheet.create({
  optInputWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  optInput: {
    marginHorizontal: 4,
    height: 50,
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: '#feded5',
  },
});

export default OtpInput;
