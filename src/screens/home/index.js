import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { DataTable } from 'react-native-paper';

import AuthContext from '../../auth/index';
import { getCustomers } from '../../database/methods';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      user: this.context,
      customerData: [],
      isRefreshing: false,
    };

    this.setDatatableData = this.setDatatableData.bind(this);
    this.handleDataTablePaginationControl = this.handleDataTablePaginationControl.bind(
      this,
    );
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
  }

  componentDidMount() {
    this.setDatatableData();
  }

  setDatatableData() {
    this.setState({
      isRefreshing: true,
    });
    var tempDataTableValues = [];

    getCustomers(25, 1).then(val => {
      for (var [id, entry] of Object.entries(val)) {
        entry.id = id;
        tempDataTableValues.push(entry);
      }
      this.setState({
        customerData: tempDataTableValues,
        isRefreshing: false,
      });
    });
  }

  handleDataTablePaginationControl() {}

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }

  render() {
    const { customerData, isRefreshing } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <DataTable style={styles.container}>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Model</DataTable.Title>
              <DataTable.Title>Mobile</DataTable.Title>
              <DataTable.Title>Entry Date</DataTable.Title>
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
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{data.fullName}</DataTable.Cell>
                    <DataTable.Cell>{data.model}</DataTable.Cell>
                    <DataTable.Cell>{data.mobile}</DataTable.Cell>
                    <DataTable.Cell>{data.entryDate}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </View>
        {/* <View>
          <DataTable.Pagination
            page={1}
            onPageChange={page => {
              console.log(page);
              this.handleDataTablePaginationControl(page);
            }}
            label={'Paging Label'}
          />
        </View> */}
      </SafeAreaView>
    );
  }
}

export default Home;
