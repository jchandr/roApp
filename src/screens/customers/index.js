import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../auth/index';
import { getCustomers } from '../../database/methods';

import commonstyles from '../../styles/commonStyles';

class CustomerIndex extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      user: this.context,
      customerData: [],
      isRefreshing: false,
      currentPageNumber: 0,
      currentPageSize: 10,
    };

    this.setDatatableData = this.setDatatableData.bind(this);
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
    this.handleDataTableItemClick = this.handleDataTableItemClick.bind(this);
    this.handleCreateCustomerFabPress = this.handleCreateCustomerFabPress.bind(
      this,
    );
  }

  componentDidMount() {
    this.setDatatableData();
  }

  handleDataTableItemClick(id) {
    this.props.navigation.navigate('Contact Show', { id: id });
  }

  setDatatableData() {
    this.setState({
      isRefreshing: true,
    });
    var tempDataTableValues = [];

    const { currentPageNumber, currentPageSize } = this.state;

    getCustomers(currentPageSize, currentPageNumber + 1)
      .then(val => {
        for (var [id, entry] of Object.entries(val)) {
          entry.id = id;
          tempDataTableValues.push(entry);
        }
        this.setState({
          customerData: tempDataTableValues,
          isRefreshing: false,
        });
      })
      .catch(() => {
        this.setState({
          customerData: [],
          isRefreshing: false,
        });
      });
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }

  handleCreateCustomerFabPress() {
    this.props.navigation.navigate('Customer Create');
  }

  handlePageChange(page) {
    this.setState(
      {
        currentPageNumber: page,
      },
      () => {
        this.setDatatableData();
      },
    );
  }

  convertDateSecondsToDateString(secs) {
    return new Date(secs).toISOString().split('T')[0];
  }

  render() {
    const { customerData, isRefreshing, currentPageNumber } = this.state;

    return (
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <DataTable style={styles.flexContainer}>
            <DataTable.Header>
              <DataTable.Title style={styles.nameField}>Name</DataTable.Title>
              <DataTable.Title>Mobile</DataTable.Title>
              <DataTable.Title>Instal Date</DataTable.Title>
            </DataTable.Header>
            <ScrollView
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  console.log('hi');
                }
              }}
              scrollEventThrottle={400}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => this.setDatatableData()}
                />
              }>
              {customerData.map((data, i) => {
                return (
                  <DataTable.Row
                    key={i}
                    onPress={() => this.handleDataTableItemClick(data.id)}>
                    <DataTable.Cell style={styles.nameField}>
                      {data.fullName}
                    </DataTable.Cell>
                    <DataTable.Cell>{data.mobile}</DataTable.Cell>
                    <DataTable.Cell>
                      {this.convertDateSecondsToDateString(
                        data.installationDate,
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </View>
        <TouchableOpacity
          style={styles.createCustomerFab}
          onPress={() => this.handleCreateCustomerFabPress()}>
          <Icon name="plus" size={20} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonstyles,
  nameField: {
    flex: 2,
  },
  createCustomerFab: {
    width: 50,
    height: 50,
    backgroundColor: '#ffcdbe',
    borderRadius: 50,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 10,
  },
});

export default CustomerIndex;
