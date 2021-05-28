import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthContext from '../../auth/index';

import { getCustomerById } from '../../database/methods';

class ContactShow extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      customerData: {},
    };
  }

  componentDidMount() {
    const {
      route: {
        params: { id },
      },
    } = this.props;
    getCustomerById(id).then(data => {
      this.setState({
        customerData: data,
      });
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>ContactShow</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default ContactShow;
