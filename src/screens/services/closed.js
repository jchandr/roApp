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
import { getServices } from '../../database/methods';

import commonstyles from '../../styles/commonStyles';

class ClosedServices extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      user: this.context,
      servicesData: [],
      isRefreshing: false,
      currentPageNumber: 0,
      currentPageSize: 10,
    };

    this.setDatatableData = this.setDatatableData.bind(this);
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
    this.handleDataTableItemClick = this.handleDataTableItemClick.bind(this);
    this.handleCreateCustomerFabPress =
      this.handleCreateCustomerFabPress.bind(this);
  }

  componentDidMount() {
    this.setDatatableData();
  }

  handleDataTableItemClick(id, data) {
    this.props.navigation.navigate('Show Service', { id: id, data: data });
  }

  setDatatableData() {
    this.setState({
      isRefreshing: true,
    });
    var tempDataTableValues = [];

    const { currentPageNumber, currentPageSize } = this.state;

    getServices(currentPageSize, currentPageNumber + 1)
      .then(val => {
        for (var [id, entry] of Object.entries(val)) {
          entry.id = id;
          if (entry.isClosed) {
            tempDataTableValues.push(entry);
          }
        }
        this.setState({
          servicesData: tempDataTableValues,
          isRefreshing: false,
        });
      })
      .catch(() => {
        this.setState({
          servicesData: [],
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

  handleCreateCustomerFabPress() {}

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
    const { servicesData, isRefreshing } = this.state;

    return (
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <DataTable style={styles.flexContainer}>
            <DataTable.Header>
              <DataTable.Title style={styles.nameField}>
                Current Service Month
              </DataTable.Title>
              <DataTable.Title>Service Status</DataTable.Title>
              <DataTable.Title>Due Date</DataTable.Title>
            </DataTable.Header>
            <ScrollView
              scrollEventThrottle={400}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => this.setDatatableData()}
                />
              }>
              {servicesData.map((data, i) => {
                return (
                  <DataTable.Row
                    key={i}
                    onPress={() =>
                      this.handleDataTableItemClick(data.id, data)
                    }>
                    <DataTable.Cell style={styles.nameField}>
                      {data.currentServiceMonthCount}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={
                        data.isClosed
                          ? styles.serviceClosedBackground
                          : styles.serviceOpenBackground
                      }>
                      {data.isClosed ? 'Closed' : 'Open'}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {this.convertDateSecondsToDateString(data.serviceDueDate)}
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
    flex: 1,
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
  serviceOpenBackground: {
    backgroundColor: '#ff6b75',
  },
  serviceClosedBackground: {
    backgroundColor: '#a8ffbf',
  },
});

export default ClosedServices;
