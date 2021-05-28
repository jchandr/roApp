import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { TextInput } from 'react-native-paper';

import AuthContext from '../../auth/index';
import styles from '../../styles/screens/home/contactShow';
import { getCustomerById } from '../../database/methods';

class ContactShow extends Component {
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
        installationDate: '',
        membrane: '',
        mineralCatridge: '',
        motor: '',
        sv: '',
        serviceDuration: '',
        spun: '',
        uf: '',
        uv: '',
        entryDate: '',
        serviceType: '',
      },
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  handleTextInputChange(changedText, field) {
    var { customerData } = this.state;
    customerData[`${field}`] = changedText;
    this.setState({
      customerData: customerData,
      isRefreshing: false,
    });

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
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
      });
    });
  }

  render() {
    const { customerData, isRefreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => this.getData()}
          />
        }
        style={[styles.container, styles.flexColumn]}>
        <View style={[styles.container]}>
          <TextInput
            mode="outlined"
            label="Name"
            style={styles.textInput}
            value={customerData.fullName}
            disabled
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
            onChangeText={text => this.handleTextInputChange(text, 'brandName')}
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
          <TextInput
            mode="outlined"
            label="Installation Date"
            style={styles.textInput}
            value={String(customerData.installationDate)}
            onChangeText={text =>
              this.handleTextInputChange(text, 'installationDate')
            }
          />
        </View>
        <View style={[styles.container]}>
          <TextInput
            mode="outlined"
            label="Membrane"
            style={styles.textInput}
            onChangeText={text => this.handleTextInputChange(text, 'Membrane')}
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
          <TextInput
            mode="outlined"
            label="Entry Date"
            style={styles.textInput}
            onChangeText={text => this.handleTextInputChange(text, 'entryDate')}
            value={String(customerData.entryDate)}
          />
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
    );
  }
}

export default ContactShow;
